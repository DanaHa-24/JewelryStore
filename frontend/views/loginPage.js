$(document).ready(function() {
  // Create a canvas element
  let canvas = $("<canvas>").attr("width", "200").attr("height", "1.5").attr("id","canvas-login-page");

  // Create a login form
  let loginForm = $("<div>").addClass("container").append(
    $("<header>").text("התחברות").attr("id","login-page-header"),
    $("<form>").addClass("row g-3").attr("id", "login-form").append(
      $("<div>").addClass("col-12").append(
        $("<input>").addClass("form-control").attr("type", "text").attr("placeholder", "אימייל").attr("id","login-page-input")
      ),
      $("<div>").addClass("col-12").append(
        $("<input>").addClass("form-control").attr("type", "password").attr("placeholder", "סיסמה").attr("id","login-page-input")
      ),
      $("<div>").addClass("col-12").append(
        $("<button>").addClass("btn btn-primary").text("התחבר/י").attr("id","login-page-button")
      )
    )
  ).attr("id","login-page-container");

  // Append login form to the body
  $("body").append(loginForm);

 // Append the canvas to the body
 $("body").append(canvas);
   

  
  // Create a button to redirect to the sign-up page
  let signUpButton = $("<button>").addClass("btn btn-link").text("לא נרשמת עדיין? לחץ/י כאן להרשמה").attr("id","login-page-button-link").click(function() {
    window.location.href = "signupPage.html"; // Replace "signup.html" with the URL of your sign-up page
  });

  // Append the sign-up button to the body
  $("body").append(signUpButton);
});