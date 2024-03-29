$(document).ready(function () {
  // Create a canvas element
  let canvas = $('<canvas>').attr('width', '200').attr('height', '1.5').attr('id', 'canvas-login-page');

  // Create a login form
  let loginForm = $('<div>')
    .addClass('container')
    .append(
      $('<header>').text('התחברות').attr('id', 'login-page-header'),
      $('<form>').addClass('login-form').attr('id', 'login-form').append(
        $('<input>')
          .addClass('form-control')
          .attr('type', 'text')
          .attr('placeholder', 'אימייל')
          .attr('id', 'login-page-input-email'),

        $('<input>')
          .addClass('form-control')
          .attr('type', 'password')
          .attr('placeholder', 'סיסמה')
          .attr('id', 'login-page-input-password'),
        $('<button>').addClass('btn btn-primary').text('התחבר/י').attr('id', 'login-page-button')
      )
    )
    .attr('id', 'login-page-container');

  // Append login form to the body
  $('body').append(loginForm);

  // Append the canvas to the body
  $('body').append(canvas);

  // Create a button to redirect to the sign-up page
  const signUpButton = $('<button>')
    .addClass('btn btn-link')
    .text('לא נרשמת עדיין? לחץ/י כאן להרשמה')
    .attr('id', 'login-page-button-link')
    .click(function () {
      window.location.href = 'signup';
    });

  // Append the sign-up button to the body
  $('body').append(signUpButton);

  // Make an AJAX request to the server
  $('#login-page-button').click(function (event) {
    event.preventDefault();
    let emaiInputLogin = $('#login-page-input-email').val();
    let passwordInputLogin = $('#login-page-input-password').val();

    // Make an AJAX request to the server
    $.ajax({
      url: '/auth/login',
      method: 'POST',
      data: {
        username: emaiInputLogin,
        password: passwordInputLogin,
      },
      success: function (response) {
        // Handle successful login
        const token = response.token;
        // Store the token in the browser's local storage
        localStorage.setItem('token', token);
        // Redirect the user to the desired page after successful login
        window.location.href = `/`;
      },
      error: function (error) {
        // Handle login error
        console.log(error);
        // Display an error message to the user
        alert('Invalid email or password. Please try again.');
      },
    });
  });
});
