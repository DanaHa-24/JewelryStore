$(document).ready(function() {
  // Create a canvas element
  let canvas = $("<canvas>")
    .attr("width", "200")
    .attr("height", "1.5")
    .attr("id", "canvas-signin-page");

  // Create a signin form
  let signinForm = $("<div>")
    .addClass("container")
    .append(
      $("<header>").text("הרשמה").attr("id", "signin-page-header"),
      $("<form>")
        .addClass("row g-3")
        .attr("id", "signin-form")
        .append(
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "text")
                .attr("placeholder", "שם פרטי")
                .attr("id", "signin-page-input-firstName")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "text")
                .attr("placeholder", "שם משפחה")
                .attr("id", "signin-page-input-lastName")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "text")
                .attr("placeholder", "אימייל")
                .attr("id", "signin-page-input-email")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "text")
                .attr(
                  "placeholder",
                  "כתובת - עיר, רחוב, מספר בית, מספר דירה/כניסה, מיקוד"
                )
                .attr("id", "signin-page-input-address")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "text")
                .attr("placeholder", "מספר טלפון")
                .attr("id", "signin-page-input-phoneNumber")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "password")
                .attr("placeholder", "סיסמה")
                .attr("id", "signin-page-input-password")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<input>")
                .addClass("form-control")
                .attr("type", "password")
                .attr("placeholder", "הזן סיסמה שנית")
                .attr("id", "signin-page-input-confirmPassword")
            ),
          $("<div>")
            .addClass("col-12")
            .append(
              $("<button>")
                .addClass("btn btn-primary")
                .text("הרשם/י")
                .attr("id", "signin-page-button")
            )
        )
    )
    .attr("id", "signin-page-container");

  // Append login form to the body
  $("body").append(signinForm);

  // Append the canvas to the body
  $("body").append(canvas);

  // Create a button to redirect to the sign-up page
  let signUpButton = $("<button>")
    .addClass("btn btn-link")
    .text("נרשמת כבר בעבר? לחץ/י כאן להתחברות")
    .click(function() {
      window.location.href = "loginPage.html"; // Replace "signup.html" with the URL of your sign-up page
    })
    .attr("id", "signin-page-button-link");

  // Append the sign-up button to the body
  $("body").append(signUpButton);

  $("#signin-page-button").click(function(event) {
    event.preventDefault();
    let firstNameSignin = $("#signin-page-input-firstName").val();
    let lastNameSignin = $("#signin-page-input-lastName").val();
    let emailSignin = $("#signin-page-input-email").val();
    let addressSignin = $("#signin-page-input-address").val();
    let phoneSignin = $("#signin-page-input-phoneNumber").val();
    let passwordSignin = $("#signin-page-input-password").val();
    let confirmPasswordSignin = $("#signin-page-input-confirmPassword").val();

    console.log(passwordSignin);

    // Create an object with the form data
    const formData = {
      firstName: firstNameSignin,
      lastName: lastNameSignin,
      username: emailSignin, // Assuming the email is used as the username
      address: addressSignin,
      phoneNumber: phoneSignin,
      password: passwordSignin
    };
    
    // Send a POST request to the register route in the controller
    $.ajax({
      type: "POST",
      url: "/api/myuser/register",
      data: formData,
      success: function(response) {
        // Handle the success response
        console.log(response);
        // Redirect to a success page or perform any other actions
      },
      error: function(error) {
        // Handle the error response
        console.log(error);
        // Display an error message or perform any other actions
      }
    });
  });
});
