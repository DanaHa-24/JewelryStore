$(document).ready(function() {
    // Handler for the submit button click event
    $("#submitBtn").click(function() {
      // Retrieve values from the inputs
      var name = $("#nameInput").val();
      var message = $("#messageInput").val();
      var content = $("#contentInput").val();

      // Display the values or perform any desired action
      var result = "Name: " + name + "\nMessage: " + message + "\nContent: " + content;
      console.log(result);
      alert(result);
    });
  });