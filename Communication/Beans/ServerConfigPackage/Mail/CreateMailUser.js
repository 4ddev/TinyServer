const Message = require('../../Message').Message;
const { exec } = require("child_process");
class CreateMailUser extends Message {
    constructor( content ){
        super();
        this.name = null;
        this.password = null;
    }

    execute(response){
		return new Promise(( resolv, reject ) => {
			exec('/bin/configurator/createMailUser.sh '+this.name, (err, stdout, stderr) => {
				if ( err != null ){
					reject( stdout );
				}else {
					resolv( stdout ); 
				} 
			});
		}); 
	}
	
	validate( content ){
		var i = "";
		if ( this.name == null  ){ i+="Name not found!";}
		if ( this.password == null ){ i+="Password not found!"; }
		
		return new Promise( (resolv, reject ) => {
			if ( i=="" ) resolv(true);
			else reject(i);
		} );
	}
}
module.exports = {
	CreateMailUser: CreateMailUser,
}