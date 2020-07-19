const WebSocket = require('ws');
const BackendController = require("./Backend/BackendController");
const MessagePipe = require("./MessagePipeline");
const DatabaseStates = require( '../Database/DatabaseStates.json');
const DatabaseProvider = require( '../Database/DataBaseProvider');

/*  Connectioncontroller 
    Create all necessary parts of this Server 
    Starts the different connection handlers 
    and build the pipeline for different messages */
class ConnectionController {
    constructor(configuration){
        this.backendConfiguration = configuration; 
        this.backendConnection = null;  // Connection to an FileSystem or Backend Server 
        this.databaseConnection = null; // The DatabaseProvider
        this.backendController = null; // The FrontendController 

        this.pipeline = new MessagePipe.MessagePipeline(); 

        this.createDatabaseController().then(fulfilled => { 
           this.createBackendController(configuration);
        }).catch( err  => {
            console.log( err );
        });
        this.createFileSystemController();
    }

    /**
     * 
     * @param {fn()} errorFunction 
     */
    createFileSystemController( errorFunction ){
        if ( this.backendConfiguration.configuration.hasOwnProperty('fileSystemProvider') ){
            console.log( "Create the Backend Communication" );
            this.openBackendCommunication().then( function(fulfilled){
                console.log( fulfilled );
            }).catch( (err) => {
                if( errorFunction != null && errorFunction instanceof Function )
                console.log( err );
            });
        }
    }

    /**
     * 
     * @param {fn()} errorFunction 
     */
    createDatabaseController(errorFunction){
        let connectionController = this;
        return new Promise( function( resolv, reject ) {
            // Creates a database Connection
            connectionController.database = new DatabaseProvider.DataBaseProvider(connectionController.backendConfiguration);
            if ( connectionController.database.getState() == DatabaseStates.DISABLED ) return;
            else {
                connectionController.database.open().then( function( fulfilled ){
                    resolv();
                }).catch( (err) => {
                    if( errorFunction != null && errorFunction instanceof Function ){
                        errorFunction();
                    }
                    console.log( err );
                    reject();
                });
            }
        });
    }

    /**
     * Create a backendController
	 * @param configuration - JSON Object of the ServerConfiguration have to contain IP - and Port 
     * @param {fn()} errorFunction This function will be triggered on an error 
     */
    createBackendController( configuration, errorFunction ){
        this.backendController = new BackendController.BackendController(configuration,this.pipeline,this.databaseConnection);
        
        this.backendController.createHTTPServer().then( function( fulfilled ){
            console.log( fulfilled ); 
        }).catch( (err) => {
            if( errorFunction != null && errorFunction instanceof Function ){
                errorFunction();
            } 
            console.log( err );
        });
    }
    /**
     * Build a connection to a FileSystemServer which handles some Filesystem Operations
     * 
     */
    openBackendCommunication(){
        var connectionController = this;
        return new Promise( function( resolv,reject ){
            connectionController.backendConnection = 
                new WebSocket( connectionController.backendConfiguration.ssl+"://"+
                               connectionController.backendConfiguration.ip+":"+
                               connectionController.backendConfiguration.port );

            connectionController.backendConnection.on('message', function(data) {
                this.pipeline.receive(data);
            }.bind(connectionController));
            
            connectionController.backendConnection.on('open', function(){
                this.pipeline.setBackendConnection( this.backendConnection );
                resolv("Backend connection established");
            }.bind(connectionController));

            connectionController.backendConnection.on('error',function(err){
                reject(err);
            });
        });
    }
    
    sendToBackend(payload){
        this.backendConnection.send(payload);
    }
}

module.exports = {
    ConnectionController: ConnectionController
}