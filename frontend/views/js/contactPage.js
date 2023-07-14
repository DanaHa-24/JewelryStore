$(document).ready(function () {
  let $container = $('<div class="container"></div>').attr('id', 'contact-page-container');
  let $form = $('<form action="#"></form>').attr('id', 'contact-page-form');
  let $header = $('<header>צור קשר</header>').attr('id', 'contact-page-header');

  let $nameInputField = $('<div class="field input-field"></div>').attr('id', 'contact-page-field');
  let $nameInput = $('<input type="name" placeholder="שם" class="input" id="contact-page-name-input">');
  $nameInputField.append($nameInput);

  let $emailInputField = $('<div class="field input-field"></div>').attr('id', 'contact-page-field');
  let $emailInput = $('<input type="email" placeholder="אימייל" class="input" id="contact-page-email-input">');
  $emailInputField.append($emailInput);

  let $textareaField = $('<div class="field input-field textarea-field"></div>').attr('id', 'contact-page-field');
  let $textarea = $('<textarea placeholder="הודעה" class="input textarea" id="contact-page-textarea"></textarea>');
  $textareaField.append($textarea);

  let $buttonField = $('<div class="field button-field"></div>').attr('id', 'contact-page-field');
  let $submitButton = $('<button id="submitBtn">שליחה</button>').attr('id', 'contact-page-button');
  $buttonField.append($submitButton);

  $form.append($header, $nameInputField, $emailInputField, $textareaField, $buttonField);
  $container.append($form);
  $('body').append($container);

  $('#contact-page-button').on('click', function () {
    const recipientEmail = $('#contact-page-email-input').val();
    const subject = $('#contact-page-name-input').val();
    const body = $('#contact-page-textarea').val();

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = mailtoLink;
  });
});
