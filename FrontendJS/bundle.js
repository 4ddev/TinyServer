
class ServerPage {
    constructor(){
        this.server = null;
    }
    getServerList(){
        $.ajax({
            url: "/service",
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            
            data: JSON.stringify({ "CreateMailUser" : {
                name : "TEST",
                password : "TEST" 
            } } ),
            success: function(data){
                console.log( data );
            }
        }); 
    }
}

let serverPageProvider = new ServerPage();

$('#login').submit( function(e){
    console.log("TEST" );
    e.preventDefault();
});

$('#server_overview').click( function(e ){
    $('#device_wrapper').toggle();
    serverPageProvider.getServerList();
})
