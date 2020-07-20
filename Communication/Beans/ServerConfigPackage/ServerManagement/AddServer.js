const Message = require('../../Message').Message;
const { exec } = require("child_process");
class AddServer extends Message {
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
		console.log( "ADD SERVER " );
		return new Promise(( resolv, reject ) => {
			db.query("INSERT INTO `_server` (`id`, `description`, `lastSeen`,`members`, `created`, `username`, `password`)"+
					 " VALUES (NULL, 'sdvwsdv', CURRENT_TIMESTAMP, '1', CURRENT_TIMESTAMP, 'test','test');").then( fulfilled => {
				resolv();
			}).catch( err => {
				reject();
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
	AddServer: AddServer,
}