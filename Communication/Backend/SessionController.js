class SessionController {
    constructor(db){
        if ( db == null ) throw Error("No Database given");
        this.db = db;
    }

    // Stackoverflow https://stackoverflow.com/questions/3393854/get-and-set
    //  -a-single-cookie-with-node-js-http-server
    parseCookies(request) {
        var list = {},
        rc = request.headers.cookie;
    
        rc && rc.split(';').forEach(function( cookie ) {
            var parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
        return list;
    }

    readSessionID( request ){
        console.log( "TEST" );
    }

    createSessionID(){
        // To Write a Cookie
        response.writeHead(200, {
            'Set-Cookie': 'mycookie=test',
            'Content-Type': 'text/plain'
        });
    }
}

module.exports = {
    SessionController: SessionController
}