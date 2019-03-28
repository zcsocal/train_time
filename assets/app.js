
var config = {
    apiKey: "AIzaSyC2iJjF3Pqsko0OVzBwGY96XrfDCBSoLoI",
    authDomain: "train-e860c.firebaseapp.com",
    databaseURL: "https://train-e860c.firebaseio.com",
    projectId: "train-e860c",
    storageBucket: "train-e860c.appspot.com",
    messagingSenderId: "112118560078"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

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

      trainData.ref().push(addNewTrain);

      alert("Your entry was successful.");

      // Form fields do populate the console
      // console.log(trainName);
      // console.log(destination);
      // console.log(firstTrain);
      // console.log(frequency);
      // return false;
      
  })

  trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes,"m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tbody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
   

  })



