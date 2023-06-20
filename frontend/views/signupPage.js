$(document).ready(function() {
    // // Create a canvas element
    let canvas = $("<canvas>").attr("width", "200").attr("height", "1.5");
  
    // Create a signin form
    let signinForm = $("<div>").addClass("container").append(
      $("<header>").text("הרשמה").attr("id","signin-page-header"),
      $("<form>").addClass("row g-3").attr("id", "signin-form").append(
        $("<div>").addClass("col-12").append(
          $("<input>").addClass("form-control").attr("type", "text").attr("placeholder", "אימייל").attr("id","signin-page-input")
        ),
        $("<div>").addClass("col-12").append(
          $("<input>").addClass("form-control").attr("type", "password").attr("placeholder", "סיסמה").attr("id","signin-page-input")
        ),
        $("<div>").addClass("col-12").append(
            $("<input>").addClass("form-control").attr("type", "password").attr("placeholder", "הזן סיסמה שנית").attr("id","signin-page-input")
          ),
        $("<div>").addClass("col-12").append(
          $("<button>").addClass("btn btn-primary").text("הרשם/י").attr("id","signin-page-button")
        )
      )
    ).attr("id","signin-page-container");
  
    // Append login form to the body
    $("body").append(signinForm);
  
   // Append the canvas to the body
    $("body").append(canvas);
     
    // Create a button to redirect to the sign-up page
    let signUpButton = $("<button>").addClass("btn btn-link").text("נרשמת כבר בעבר? לחץ/י כאן להתחברות").attr("id","signin-page-button-link").click(function() {
      window.location.href = "loginPage.html"; // Replace "signup.html" with the URL of your sign-up page
    });
  
    // Append the sign-up button to the body
    $("body").append(signUpButton);
  });