
//Firebase setup
var config = {
    apiKey: "AIzaSyC2iJjF3Pqsko0OVzBwGY96XrfDCBSoLoI",
    authDomain: "train-e860c.firebaseapp.com",
    databaseURL: "https://train-e860c.firebaseio.com",
    projectId: "train-e860c",
    storageBucket: "train-e860c.appspot.com",
    messagingSenderId: "112118560078"
  };
  firebase.initializeApp(config);

  //Variable that essentially connects our user entered data to the firebase database
  var trainData = firebase.database();

  //Jqueary - Then submit button is pressed, the value of data from these corresponding fields will be trimmed
  // The time input will be handled with Moment
  $("#addTrainBtn").on("click", function(){
      var trainName = $("#nameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#timeInput").val().trim(), "HH:mm" ).subtract(10,"years").format("X"); 
      var frequency = $("#frequencyInput").val().trim();

      var addNewTrain = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
      }

      //The new train data is pushed into database.
      trainData.ref().push(addNewTrain);

      alert("Your entry was successful.");


      // Some tests to make sure it's working
      

      // Form fields do populate the console
      // console.log(trainName);
      // console.log(destination);
      // console.log(firstTrain);
      // console.log(frequency);
      // return false;
      
  })

  //The following pulls the data from database and displays it on the empty table body in html
    
  trainData.ref().on("child_added", function(dataPull){
    var name = dataPull.val().name;
    var destination = dataPull.val().destination;
    var frequency = dataPull.val().frequency;
    var firstTrain = dataPull.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    //Jquery to append the table row with cells into the table body. Each cell has a data var plugged into it.
    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
   

  })



