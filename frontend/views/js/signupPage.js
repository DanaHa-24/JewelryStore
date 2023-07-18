$(document).ready(function () {
  // Create a canvas element
  let canvas = $('<canvas>').attr('width', '200').attr('height', '1.5').attr('id', 'canvas-signin-page');

  // Create a signin form
  let signinForm = $('<div>')
    .addClass('container')
    .append(
      $('<header>').text('הרשמה').attr('id', 'signin-page-header'),
      $('<form>')
        .addClass('row g-3')
        .attr('id', 'signin-form')
        .append(
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', 'שם פרטי')
                .attr('id', 'signin-page-input-firstName')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', 'שם משפחה')
                .attr('id', 'signin-page-input-lastName')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', 'אימייל')
                .attr('id', 'signin-page-input-email')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', 'כתובת - עיר, רחוב, מספר בית, מספר דירה/כניסה, מיקוד')
                .attr('id', 'signin-page-input-address')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', 'מספר טלפון')
                .attr('id', 'signin-page-input-phoneNumber')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'password')
                .attr('placeholder', 'סיסמה')
                .attr('id', 'signin-page-input-password')
            ),
          $('<div>')
            .addClass('col-12')
            .append(
              $('<input>')
                .addClass('form-control')
                .attr('type', 'password')
                .attr('placeholder', 'הזן סיסמה שנית')
                .attr('id', 'signin-page-input-confirmPassword')
            ),
          $('<div>')
            .addClass('col-12')
            .append($('<button>').addClass('btn btn-primary').text('הרשם/י').attr('id', 'signin-page-button'))
        )
    )
    .attr('id', 'signin-page-container');

  // Append login form to the body
  $('body').append(signinForm);

  // Append the canvas to the body
  $('body').append(canvas);

  // Create a button to redirect to the sign-up page
  let signUpButton = $('<button>')
    .addClass('btn btn-link')
    .text('נרשמת כבר בעבר? לחץ/י כאן להתחברות')
    .click(function () {
      window.location.href = '/login';
    })
    .attr('id', 'signin-page-button-link');

  // Append the sign-up button to the body
  $('body').append(signUpButton);

  $('#signin-page-button').click(async function (event) {
    event.preventDefault();
    let firstNameSignin = $('#signin-page-input-firstName').val();
    let lastNameSignin = $('#signin-page-input-lastName').val();
    let emailSignin = $('#signin-page-input-email').val();
    let addressSignin = $('#signin-page-input-address').val().split(',');
    let phoneSignin = $('#signin-page-input-phoneNumber').val();
    let passwordSignin = $('#signin-page-input-password').val();
    let confirmPasswordSignin = $('#signin-page-input-confirmPassword').val();

    if (passwordSignin !== confirmPasswordSignin) {
      alert('הסיסמאות אינן תואמות');
      return;
    }
    // Create an object with the address data
    const addressData = {
      city: addressSignin[0],
      street: addressSignin[1],
      houseNum: parseInt(addressSignin[2]),
      apartmentNum: parseInt(addressSignin[3]),
      postalCode: parseInt(addressSignin[4]),
    };

    const formData = {
      firstName: firstNameSignin,
      lastName: lastNameSignin,
      username: emailSignin,
      password: passwordSignin,
      address: addressData,
      phoneNumber: phoneSignin,
    };

    // Send a POST request to create the user with the updated address
    const res = await ajaxRequest('/auth/register', 'POST', formData);
    if (res) {
      window.location.href = `/login`;
    }
  });
});
