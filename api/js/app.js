$(document).ready(function () {

 var endpoint = window.location+"/api/books.php";

    $.ajax({
        url: endpoint,
        data: {},
        type: "GET",
        dataType: "json"
    })
            .done(function (json) {

                var books = json;

                $.each(books, function (object, book) {
                var book = $("<div id='" + book.id +"'' class='displayBoook'>" + 
                        book.name + "<div class='book"+book.id+"' style='border:1px solid black; display:none'>opis\n\
                        </div><button 'name='delete'  style='border:1px solid black; display:none' value=" + 
                        book.id + ">Usuń</button>"  );
                    $('.bookList').append(book);    

     
                });


                var name = $('.bookList div');
                name.click(bookDescription);
            })

            .fail(function () {
                alert("Nie udadło się odebrać danych z serwera ");

            });
            
            
            
            function bookDescription() {
       $(this).children().css('display', 'block');
        var display= $(this).children(':first-child');
        $.ajax({
            url: "../Rest_Library/api/books.php",
            data: 'id=' + $(this).get(0).id,
            type: "GET",
            dataType: "json"
        })
                .done(function (json) {
                   var book = json[0]; 
           display.text("autor :"+book.author+" Opis: "+book.description);
           
 /////////////////////////////////////////////////////////////////////////////////
//DELETE BOOK EVENT
/////////////////////////////////////////////////////////////////////////////////

    var buttons=document.querySelectorAll('button');
                
    for(var i=0 ; i<buttons.length; i++){
    buttons[i].addEventListener('click', function(){
            
            
    var del =  $(this).attr('value');


    $.ajax({
        url: endpoint,
        data: 'id=' + del,
        type: "DELETE",
        dataType: "json"
    })
            .done(function (json) {

                location.reload(true);
            })

            .fail(function () {
                alert("nie udało sie usunąć ");

            });

   });

   };

            
                });

             
    
} // end of book description


//////////////////////////////////////////////////
//ADD BOOK EVENT
//////////////////////////////////////////////////

$('form').on('submit',function(e) {
    e.preventDefault();
    var postForm = {
        name: $('input[name=name]').val(),
        author: $('input[name=author]').val(),
        description: $('textarea').val()
    };

    $.ajax({
        url: endpoint,
        data: postForm,
        type: "POST",
        dataType: "json"
    })
            .done(function (json) {

                window.location.reload(true);
            })

            .fail(function () {
                alert("wystąpił błąd przy dodawaniu ");

            });

});



}); // end of  document ready 