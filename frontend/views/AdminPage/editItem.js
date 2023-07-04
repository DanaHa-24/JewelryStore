$(document).ready(function () {
    // Function to handle form submission
    $('#editForm').on('submit', function (e) {
      e.preventDefault(); // Prevent form submission
  
      // Get form data
      var formData = $(this).serializeArray();
  
      // Perform Ajax request to update the database
      $.ajax({
        url: 'update.php', // Replace with your backend endpoint
        method: 'POST',
        data: formData,
        success: function (response) {
          // Handle success response
          console.log(response); // You can customize this as per your needs
          alert('Item updated successfully!');
        },
        error: function (error) {
          // Handle error response
          console.log(error); // You can customize this as per your needs
          alert('An error occurred. Please try again later.');
        },
      });
    });
  });
  