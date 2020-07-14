const Message = require('../../Message').Message;
const { exec } = require("child_process");

class VactionMessage extends Message {
    constructor( content ){
        super();
        this.user = null;
        this.message = null;
    }

    execute(response){
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
	VacationMessage: VactionMessage,
}