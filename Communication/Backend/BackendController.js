const http = require("http");
const WebSocket = require('ws');
const qs = require('querystring');
// Here this should be your Package with all message objects
const MessageTypes = require( '../Beans/MessageBeans' );
// Load this module
const MessagePipeline = require("../MessagePipeline");
const MessageController = require( 'message-controller' );
const SessionController = require('../Backend/SessionController');

// Register the constructor's in the ClassSet - only 
// these Classes could be instantiated by the MessageController
const classes = (new MessageController.ClassSet());

class BackendController {
    constructor ( config, pipeLine, database ){
		this.config = config;
        this.wss = null;
        this.database = database;
        this.pipe = pipeLine;
        this.readServerFunctions();
        this.sessionController = this.createSessionController();
    }

    createSessionController(database){
        return new SessionController.SessionController();
    }
    /**
     * Read all Backend Functions  
     */
    readServerFunctions(){
        console.log( "Loading Modules... --------");
        for (const item of Object.entries(MessageTypes)) {
            console.log( "Module loaded: "+item[0] );
            classes.put((new item[1]()).constructor);
        }
        console.log( "Modules loaded ----------" );
    }

    
	/**
	 *   Creates the Socket and the whole Server-Structur 
	 *   Alpha
	 */
    createHTTPServer(){
        var frontend = this;

        return new Promise( function(resolv,reject){
            frontend.server = http.createServer(function (req, res) {
                
                if( req.method === "POST" ){
                    res.writeHead(200, {'Content-Type': 'application/json'});
                
                    var data = '';
                    req.on('data', function(chunk) {
                        // Destroy Connection if payload is to high
                        if (data.length > 1e6){ 
                            MessagePipeline.send("Payload limit reached");
                            req.connection.destroy(); 
                        }
                        data += chunk.toString();
                    });
                    req.on('end',function(){ BackendController.processData( res,data ) }); 
                }
            });
            frontend.server.listen(frontend.config.port,frontend.config.ip,function(err){
                if( err ) reject(err);
                else resolv("Server listen on ip: "+frontend.config.ip+" port: "+frontend.config.port+" Backend ready  ----------");
            });
        });
    }

    static processData( response, data ){      
        BackendController.processMessage(response,data);
    }

    openWebSocket(){
        this.wss = new WebSocket.Server({ port: 8080 });
        this.wss.on('connection', ws => {
            ws.on('message', BackendController.processMessage.bind(ws) )
        });
        console.log( "Websocket Fronted ready");
    }
    
    /*  Scope is set to the SocketConnection can be - this : WebSocket 
                                                     this : ServerResponse */
    static processMessage(response, message){
        // Receive incoming message - use MessageController.createInstance - create the Bean
        let instance = null;
        try{
            instance = MessageController.createInstance( message, classes);
        }catch ( e ){
            console.log( "Wrong Method found " , e )
        }
        if ( instance == null ) { 
            MessagePipeline.send(response, BackendController.error("Method not found") );
        } else {
            console.log(  instance.constructor.name, JSON.stringify(instance));
            instance.validate( message ).then( result => {
                if ( result == true ){
                    instance.execute().then( result => {
                        MessagePipeline.send( response, result );
                    }).catch( err  => {
                        MessagePipeline.send( response, BackendController.error(err ));
                    });
                }else{
                    MessagePipeline.send( response, result ); 
                }
            }).catch( err => {
                MessagePipeline.send( response,BackendController.error(err));
            });
        }
    }

    static error( data ){
        return { "error": data };
    }
}


module.exports = {
    BackendController: BackendController
}