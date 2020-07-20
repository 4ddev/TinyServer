const Message = require('../../Message').Message;
const { exec } = require("child_process");

class RemoveServer extends Message {
    constructor( content ){
        super();
        this.name = null;
        this.lastSeen = null;
        this.lastUpdate = null;
        this.members = null;
        this.services = null;
        this.description = null;
    }

    execute(response, db){
		return new Promise(( resolv, reject ) => {
			exec('/bin/configurator/removeMailUser.sh ', (err, stdout, stderr) => {
				if ( err != null ){
					reject( stdout );
				}else {
					resolv( stdout ); 
				} 
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
	RemoveServer: RemoveServer,
}