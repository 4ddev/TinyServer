class WebSocketCom {
    /* Scope is set to WEBSOCKET - Client - see openWebSocket */
    static processMessage(message){
        console.log( "CLIENT ---> "+message);
        // Receive incoming message - use MessageController.createInstance
        // to get the correspondending  Object
        try{  
            instance = MessageController.createInstance( message,classes ); 
        }catch( e ){
            console.log(e);
        }
        
        if ( instance == null ) {
            console.log( "Method not found" );
            // Send a message to the user that this method was not found 
            this.send( FrontendCommunicationController.error("Method not found") );
        } else {
            // Send a message back to the User 
            this.send(message);
            pipe.process( this, instance );
        }
        instance = null;
    }
}