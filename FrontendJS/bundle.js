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
            
            data: JSON.stringify({ "GetServer" : {
                name : "TEST",
                password : "TEST" 
            } } ),
            success: function(data){
                console.log( data );
                $('#loading').hide();
                $('#device_wrapper').show();
            }
        }); 
    }
    addServerToList(){
        $.ajax({
            url: "/service",
            type: "POST",
            dataType : "json",
            contentType: "application/json; charset=utf-8",
            
            data: JSON.stringify({ "AddServer" : {
                name : "TEST",
                password : "TEST" 
            } } ),
            success: function(data){
                console.log( data );
                $('#loading').hide();
                $('#device_wrapper').show();
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
    $('.content-wrapper').hide();
    $('#loading').show();
    serverPageProvider.getServerList();
})


