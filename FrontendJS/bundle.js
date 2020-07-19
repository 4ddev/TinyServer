$('#login').submit( function(e){
    console.log("TEST" );
    e.preventDefault();
});

$('#server_overview').click( function(e ){
    $('#device_wrapper').toggle();
})