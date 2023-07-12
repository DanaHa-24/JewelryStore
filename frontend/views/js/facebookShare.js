$(document).ready(function () {
  // Load the Facebook SDK asynchronously
  window.fbAsyncInit = function () {
    FB.init({
      appId: '272185268743483',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v12.0',
    });
  };

  // Function to share content on Facebook
  function shareOnFacebook() {
    FB.ui(
      {
        method: 'share',
        href: 'https://www.example.com', // Replace with the URL you want to share
      },
      function (response) {
        // Callback function after the user shares the content
        if (response && !response.error_message) {
          alert('Shared successfully!');
        } else {
          alert('Share canceled or failed.');
        }
      }
    );
  }

  // Attach the click event to the share button
  $('#facebook-share-btn').on('click', function () {
    shareOnFacebook();
  });
});
