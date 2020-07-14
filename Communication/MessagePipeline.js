const Map = require("../Classes/BiMap")
const MessageHandler = require ( "message-controller" );
const crypto = require("crypto");

class MessagePipeline {
    constructor(){
        this.backend = null;
        this.map = new Map.BiMap();
        console.log( "MessagePipeline Ready to use");
    }
    
    process(client,instance,user,database){       
        // SEND TO BACKEND 
        if ( this.backend != null ) {
            instance.id = this.generateUniqueKey();
            this.map.put(instance.id, {  database: database,user: user, type: instance, date: Date.now(), socket: client  } );
            let message = MessageHandler.wrapMessage(instance);
            console.log( "BACKEND ----> "+message);
            this.backend.send( message );
        }else{
            
        }
    }

    async receive( data ){
        if ( data.constructor.name === "String" ){
            console.log( "BACKEND <--- "+data+ " " );
            try{
                data = JSON.parse(data);
            }catch( e ){
                console.log( "System Error: could not parse data from Backend -  Pipeline 38" );
            }
        }else {
            console.log( "BACKEND <--- "+ JSON.stringify(data)+ " " );
        }

        let store = this.map.get(data.id);
        this.map.remove(data.id);
        delete store.type.details;

        if( store.type.verifyMessage( data ) == true ) {
            store.type.code = 200;
            MessagePipeline.send( store.socket, store.type );
        }else {
            console.log(  )
            store.type.code = 500;
            store.type.description = data;
            MessagePipeline.send( store.socket, store.type );
        }
    }

    static send( sock, payload ){
        console.log( "Client <--- "+ JSON.stringify(payload) ) ;
        if ( sock.constructor.name === "ServerResponse" ){ 
            sock.write( JSON.stringify(payload) );
            sock.end();
        }
        else if (store.socket.constructor.name === "WebSocket"){
            sock.send( JSON.stringify(payload));
        }else{
            console.log( "DEBUG > Conncetion Type not found");
        }
    }

    generateUniqueKey(){
        let key = null;
        while( ( this.map.get( key )) != null || key == null ){
           key = crypto.randomBytes(20).toString('hex');
        }
        return key;
    }
    
    setBackendConnection(con){
        this.backend = con;
    }
}


module.exports = {
    MessagePipeline: MessagePipeline,
    send: MessagePipeline.send,
}