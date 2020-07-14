const mysql = require('mysql');
const Connection = require('./DatabaseStates.json');


class DataBaseProvider {
    constructor( config ){
        // Check if a configuration is given for a Database
        if( configuration.hasOwnProperty('database') ){
            this.state = Connection.DISABLED;
            return;
        }
        this.con = mysql.createConnection(config);
        this.state = Connection.INITIALIZED;
    }

    /**
     * See DatabaseStates.json 
     * @return The state of this DatabaseObject 
     */
    getState(){
        return this.state;
    }
    /**
     * Open a connection to a Database 
     * @return promise Of this DatabaseConnection state will be set to PENDING 
     *         after connection DatabaseState should be set to OPENED
     */
    async open(){
        var provider = this;
        provider.state = Connection.PENDING;
        return new Promise(function(resolv,reject) { 
            provider.con.connect( function(err) {
                if ( err ){
                    // TODO CHECK REASON FOR NOT OPENED
                    provider.state = Connection.CLOSED;
                    reject(err);
                }else{
                    provider.state = Connection.OPEN;
                    resolv("Database ready to use");
                }
            });
        });
    }
    /**
     * Closes a Database Connection if its state is set to OPENED 
     */
    close(){
        if ( this.state == Connection.OPENED ) this.con.end();
    }

    query(sql){
        console.log( "Database ---> "+sql);
        var provider = this;
        return new Promise( ( resolv, reject ) => {
            provider.con.query( sql, function (err, result, fields) {
                console.log( "Database <---- "+ JSON.stringify(result) );
                if (err) reject( err );
                resolv( { result: result, fields: fields } );
            });
        });
    }
}


module.exports = {
    DataBaseProvider: DataBaseProvider
}