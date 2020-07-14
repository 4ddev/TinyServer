class DatabaseOperations {

    static async checkUser(database,message){
        // PROOF USER SQL INJECTION
        return new Promise( (resolv,reject ) => {
            if ( typeof message === "undefined") reject("{ error: \"User Field not recognized\" }");
            else {
                try{
                    if ( message.constructor.name === "String" ) message = JSON.parse(message);
                }catch( e ){
                    console.log( e );
                    reject("{ error: \"Message not allowed\" }");
                }

                database.query( "SELECT * FROM User WHERE _username='"+message.UserDetails.name+"' AND _hash='"+message.UserDetails.hash+"'" )
                .then(function(res){
                    res.result.length > 0 ? resolv(res) : reject("{ error: \"User not found\" }");
                }).catch(function(err){
                    reject(err);
                });
            }
        });
    }
    /*

    */
   static getParticipatingOfRepoFromUser(userid, repohash,database){
        var query = "SELECT A._name AS REPO_NAME, A._path AS REPO_PATH, A._id AS REPO_ID, "+
                    "A._hash AS REPO_HASH, REP._userid AS LOOKUP_ID,B._role AS USER_ROLE, REP._role AS LOOKUP_ROLE, "+
                    "REP._userid AS USER_ID, USER._username AS USERNAME From _repositorys A "+
                    "LEFT JOIN _repoView B ON  B._userid = '"+userid+"' "+
                    "LEFT JOIN _repoView REP ON REP._repoid = B._repoid " +
                    "LEFT JOIN User as USER ON REP._userid = USER._id "+
                //	"WHERE REP._userid != B._userid "+
                    "WHERE A._id = B._repoid "+
                    "AND ( B._role = 0 " +
                    "OR B._role = 1 )"+
                    "AND A._hash = '"+repohash+"'";
        return database.query(query);
    }

    static checkEmailExists( email,database ){
        console.log( "TEST MAIL" );
        // CONSTRAINT DATABASE ONLY UNIQUE EMAIL ADDRESSES DONT NEED TO CHECK FOR LENGTH 
        var query = "SELECT * FROM User WHERE _email='"+email+"'";
        return database.query(query);
    }

    static checkMailToUserExists( email,user,database ){
        // CONSTRAINT UNIQUE FIELD USER AND EMAIL
        console.log( "TEST ");
        var query = "SELECT * FROM USER WHERE _email='"+email+"' AND _username='"+user+"'";
        return database.query(query);
    }
    static checkUserExists( user, database ){
        var query = "SELECT * FROM User WHERE _username='"+user+"'";
        return database.query( query );
    }

}

module.exports = {
    DatabaseOperations: DatabaseOperations,
    checkUser: DatabaseOperations.checkUser,
    getParticipatingOfRepoFromUser: DatabaseOperations.getParticipatingOfRepoFromUser,
    checkEmailExists: DatabaseOperations.checkEmailExists,
    checkUserExists: DatabaseOperations.checkUserExists,
    checkMailToUserExists: DatabaseOperations.checkMailToUserExists
}