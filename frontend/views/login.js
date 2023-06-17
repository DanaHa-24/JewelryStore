$(document).ready(function() {
    const container = $('<section class="container forms"></section>');
  
    const loginForm = $('<div class="form login"></div>');
    const loginFormContent = $('<div class="form-content"></div>');
    const loginHeader = $('<header>התחברות</header>');
  
    const loginFormElement = $('<form action="#"></form>');
    const loginEmailField = $('<div class="field input-field"></div>');
    const loginEmailInput = $('<input type="email" placeholder="אימייל" class="input">');
    loginEmailField.append(loginEmailInput);
  
    const loginPasswordField = $('<div class="field input-field"></div>');
    const passwordContainer = $('<div class="password-container"></div>');
    const loginPasswordInput = $('<input type="password" placeholder="סיסמה" class="password">');
    passwordContainer.append(loginPasswordInput);
    passwordContainer.append('<i class="bx bxs-hide eye-icon"></i>');
    loginPasswordField.append(passwordContainer);
  
    const forgotPasswordLink = $('<div class="form-link"></div>');
    forgotPasswordLink.append('<a href="#" class="forgot-pass">שכחת סיסמה?</a>');
  
    const loginButtonField = $('<div class="field button-field"></div>');
    const loginButton = $('<button disabled>התחבר/י</button>');
    loginButtonField.append(loginButton);
  
    loginFormElement.append(loginEmailField, loginPasswordField, forgotPasswordLink, loginButtonField);
  
    loginFormContent.append(loginHeader, loginFormElement);
    loginFormContent.append('<div class="form-link"><span></span></div>');
  
    const line = $('<div class="line"></div>');
  
    const mediaOptions = $('<div class="media-options"></div>');
    mediaOptions.append('<a href="#" class="field facebook"><i class="bx bxl-facebook facebook-icon"></i><span>התחבר/י עם פייסבוק</span></a>');
  
    loginForm.append(loginFormContent, line, mediaOptions);
  
    const signupForm = $('<div class="form signup"></div>');
    const signupFormContent = $('<div class="form-content"></div>');
    const signupHeader = $('<header>הרשמה</header>');
  
    const signupFormElement = $('<form action="#"></form>');
    const signupEmailField = $('<div class="field input-field"></div>');
    const signupEmailInput = $('<input type="email" placeholder="אימייל" class="input">');
    signupEmailField.append(signupEmailInput);
  
    const signupPasswordField = $('<div class="field input-field"></div>');
    const signupPasswordContainer = $('<div class="password-container"></div>');
    const signupPasswordInput = $('<input type="password" placeholder=" הזן/י סיסמה" class="password">');
    signupPasswordContainer.append(signupPasswordInput);
    signupPasswordContainer.append('<i class="bx bxs-hide eye-icon"></i>');
    signupPasswordField.append(signupPasswordContainer);
  
    const confirmSignupPasswordField = $('<div class="field input-field"></div>');
    const confirmSignupPasswordInput = $('<input type="password" placeholder="הזן/י סיסמה שנית" class="password">');
    confirmSignupPasswordField.append(confirmSignupPasswordInput);
  
    const signupButtonField = $('<div class="field button-field"></div>');
    const signupButton = $('<button disabled>הירשם/י</button>');
    signupButtonField.append(signupButton);
  
    signupFormElement.append(signupEmailField, signupPasswordField, confirmSignupPasswordField, signupButtonField);
  
    signupFormContent.append(signupHeader, signupFormElement);
  
    signupForm.append(signupFormContent);
  
    container.append(loginForm, signupForm);
  
    $('body').append(container);
  
    const canvas = $('<canvas></canvas>').addClass("login-line-canvas");
  
    $('body').append(canvas);
  
    const pwShowHide = $('.eye-icon');
    pwShowHide.each(function() {
      $(this).on('click', function() {
        const pwFields = $(this).parent().find('.password');
        pwFields.each(function() {
          if ($(this).attr('type') === 'password') {
            $(this).attr('type', 'text');
            $(this).prev('.eye-icon').removeClass('bx-hide').addClass('bx-show');
          } else {
            $(this).attr('type', 'password');
            $(this).prev('.eye-icon').removeClass('bx-show').addClass('bx-hide');
          }
        });
      });
    });
  
    // Email validation
    loginEmailInput.on('input', function() {
      const email = $(this).val();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (isValidEmail) {
        loginButton.removeAttr('disabled');
      } else {
        loginButton.attr('disabled', 'disabled');
      }
    });
  
    // Password validation
    loginPasswordInput.on('input', function() {
      const password = $(this).val();
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isValidPassword = hasUpperCase && hasLowerCase && hasNumber;
      if (isValidPassword) {
        loginButton.removeAttr('disabled');
      } else {
        loginButton.attr('disabled', 'disabled');
      }
    });
  
    // Signup email validation
    signupEmailInput.on('input', function() {
      const email = $(this).val();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (isValidEmail) {
        signupButton.removeAttr('disabled');
      } else {
        signupButton.attr('disabled', 'disabled');
      }
    });
  
    // Signup password validation
    signupPasswordInput.on('input', function() {
      const password = $(this).val();
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isValidPassword = hasUpperCase && hasLowerCase && hasNumber;
      if (isValidPassword) {
        signupButton.removeAttr('disabled');
      } else {
        signupButton.attr('disabled', 'disabled');
      }
    });
  
  });
  