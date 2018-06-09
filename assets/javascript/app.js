$(document).ready(function(){
    
    //Create array variable of actorNamesArray that the app will create buttons from.
    let actorNamesArray = [];
    // On click of the "add" button the user input text gets pushedd into the topic array
    $("#Add").click(function(event){
        event.preventDefault();
        let getactorNameValue = $("input").val();
        actorNamesArray.push(getactorNameValue);
        $(".buttons").empty();
        createButton();
        $("input").val("");
    })
        //then initialize the createButton function

    //Your app should take the actorNamesArray in this array and create buttons in your HTML. 
    let createButton = function(){
        for (let i = 0; i < actorNamesArray.length; i++){
            $(".buttons").append(`
            <button class = "text-center" id = "${actorNamesArray[i]}" alt = "${actorNamesArray[i]}" value = "${actorNamesArray[i]}"  style = "margin:5px;border:0px;background-color:#1d262e;color:white;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">${actorNamesArray[i]}</button>
            `)
        };
    };
    // On click of the newly created actor buttons the system will get push to search term array
    $(".buttons").on("click","button",function(){

        
        let searchTerm = $(this).val();
        let limitReturns = 10;
        let apiKey = "Y63aILavrO1cHNIfftrz9v3XS4DTlrio";
        let queryUrl = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+searchTerm+"&limit="+limitReturns;
        
        
    
        $.ajax({
            url: queryUrl,
            method: "GET",
        
        }).then(function(result){
            console.log(result);
            $("#results").empty();
            $("#results").append(`
            <h3 class = "actorNameHeader" style = "font-family: 'Rock Salt', cursive;">${searchTerm}</h3>
            <hr class = "actorNameHeaderHr">
            <div class = "actorGifs">
            `);
            
            for (let j = 0; j < result.data.length; j++) {
                console.log(result.data[j].images.fixed_height.url);
                $(".actorGifs").append(`
                <div class = "col-lg-6 col-md-6 col-sm-12"><img class = "img-thumbnail gif" src ="${result.data[j].images.fixed_height_still.url}" data-still = "${result.data[j].images.fixed_height_still.url}" data-animate = "${result.data[j].images.fixed_height.url}" data-state = "still" style = "border-radius:0;margin:5px;padding:5px;">
                <h4>Rating: ${result.data[j].rating.toUpperCase()}<h4>
                `);
            };
            $(".gif").on("click", function() {
         
                let state = $(this).attr("data-state");

                if (state == "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                }else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });


        });
                //$("hr").append(
                //`<img src = "${result.data[j].images.fixed_height.url}" class = "img-thumbnail" style = "border-radius: 0;">` 
                //)

        })
    });


        //Try using a loop that appends a button for each string in the array.

    //When the user clicks on a button,

    //the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

    //When the user clicks one of the still GIPHY images, the gif should animate. 
    
    //If the user clicks the gif again, it should stop playing.

    //Under every gif, display its rating (PG, G, so on).


    //Add a form to your page takes the value from a user input box and adds it into your `actorNamesArray` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

    //Deploy your assignment to Github Pages.
