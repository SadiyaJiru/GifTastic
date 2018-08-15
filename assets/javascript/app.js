$( document ).ready(function() {
  // An array of topics, new topics will be pushed into this array;
  var topics = ["Salsa" , "Michael Jackson" , "Ball Room Dancing" , "Cha CHa" , "Milly Rock" , "Ballet" ,
  "Macarena" , "Hip Hop" , "Bachata" , "Zumba"];
  // Creating Functions & Methods
  // Function that displays all gif buttons

// Creates a new button
function addNewButton(){

  $("#addGif").on("click", function(){
  var action = $("#user-input").val().trim();
  if (action == ""){
    return false; // added so user cannot add a blank button
  }
  topics.push(action);
  displayBtns();
  return false;
  });
}
//displays all of the buttons by appending the new ones
function displayBtns(){
  $("#gifButtonsView").empty(); // prevents duplication when a new button is added
    // $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the gifResults
    for (var i = 0; i < topics.length; i++){ //loop through the array
        var gifButton = $("<button>"); //create a new gif button in html
        gifButton.addClass("action"); //create a class called ation
        gifButton.addClass("btn btn-primary") //
        gifButton.attr("data-name", topics[i]); 
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton); 
    }
}

  // Function that displays all of the gifs
  function displayGifs(){
      var action = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=3EXHyNptM9m6Q9yAhAzpjibJWHq9P8Oq&limit=5";
      console.log(queryURL); // displays the constructed url
      $.ajax({
          url: queryURL,
          method: 'GET'
      })
      .done(function(response) {
          console.log(response); // console test to make sure something returns
          $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
          var gifResults = response.data; //shows results of gifs
          if (gifResults == ""){
            alert("There isn't a gif for this selected button");
          }
          for (var i=0; i<gifResults.length; i++){
  
              var gifDiv = $("<div>"); //div for the gifs to go inside
              gifDiv.addClass("gifDiv");
              // pulling rating of gif
              var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);
              gifDiv.append(gifRating);
              // pulling still image of gif

              // pulling gif from the api
              var gifImg = $("<img>");
              gifImg.attr("src", gifResults[i].images.fixed_height_small_still.url); // still image stored into src of image
              gifImg.attr("data-still",gifResults[i].images.fixed_height_small_still.url); // still image
              gifImg.attr("data-animate",gifResults[i].images.fixed_height_small.url); // animated image
              gifImg.attr("data-state", "still"); // set the image state
              gifImg.addClass("image");
              gifDiv.append(gifImg);
              // add the giffs as the first child
              $("#gifsView").prepend(gifDiv);
          }
      });
  }
  // Calling Functions & Methods
  displayBtns(); // displays list of topics already created
  addNewButton();
  // Document Event Listeners
  $(document).on("click", ".action", displayGifs);
  $(document).on("click", ".image", function(){
      var state = $(this).attr('data-state');
      if ( state == 'still'){
          $(this).attr('src', $(this).data('animate'));
          $(this).attr('data-state', 'animate');
      }else{
          $(this).attr('src', $(this).data('still'));
          $(this).attr('data-state', 'still');
      }
  });
  });
  