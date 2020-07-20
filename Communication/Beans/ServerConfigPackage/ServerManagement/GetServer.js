const Message = require('../../Message').Message;
const { exec } = require("child_process");
class GetServer extends Message {
    constructor( content ){
        super();
        this.name = null;
        this.lastSeen = null;
        this.lastUpdate = null;
        this.members = null;
        this.services = null;
        this.description = null;
        this.id = null;
    }

    execute( db ){
		return new Promise(( resolv, reject ) => {
			db.query( "SELECT * FROM _server;").then( fulfilled => {
				resolv(fulfilled);
			}).catch( err => {

			});
		}); 
	}
	
	validate( content ){
		return new Promise( (resolv, reject ) => {
			resolv(true);
		} );
	}
}

module.exports = {
	GetServer: GetServer,
}