$(document).ready(function() {
    // Create navbar
    const navbar = $('<div>').addClass('profile-page-navbar');
    const tabsList = $('<ul></ul>').addClass('profile-page-options');
  
    const tabs = [
      {
        text: 'ההזמנות שלי',
        content: 'הזמנות שלי',
        action: handleMyOrders
      },
      {
        text: 'הכתובות שלי',
        content: 'כתובות שלי',
        action: handleMyAddress
      },
      {
        text: 'פרטי התחברות',
        content: 'פרטי התחברות',
        action: handleMyDetails
      },
      {
        text: 'Wishlist',
        content: 'Wishlist',
        action: handleMyWishList
      }
    ];
  
    // Create profile section
    const profile = $('<div class="profile-header-container"></div>');
    const infoContainter = $('<div>').addClass('profile-page-subtitle');
    profile.append(($('<h1>החשבון שלי</h1>').addClass('profile-page-header')), infoContainter);


    const info = $('<p>שמחים לראות אותך שוב</p>').addClass('profile-page-info');
    const heart = $('<i class="far fa-heart" style="color: #fe39c9;"></i>').attr('id','profile-page-heart');
    infoContainter.append(info,heart);
    profile.append(infoContainter);
    $('body').append(profile);
    
    
    // Create profile container for data
    const profileContainer = $('<div>').addClass('profile-page-container');
    $('body').append(profileContainer);


    // Create profile navbar
    for (let i = 0; i < tabs.length; i++) {
      let tab = $('<li class="tab">' + tabs[i].text + '</li>');
      tab.data('content', tabs[i].content);
      tab.on('click', tabs[i].action);
      tabsList.append(tab);
    }
  
    navbar.append(tabsList);
    const dots = $('<div class="profile-page-dots">&#8230;</div>');
    navbar.append(dots);
    $('body').append(navbar);

    // Toggle navbar when the window is resized
    $(window).resize(function() {
      toggleNavbar();
    });
  
    // Initial toggle when the page loads
    toggleNavbar();
  
    // Function to toggle the visibility of tabs and dots
    function toggleNavbar() {
      let windowWidth = $(window).width();
  
      if (windowWidth <= 800) {
        $('.profile-page-navbar .profile-page-dots').show();
        $('.profile-page-navbar ul').hide();
      } else {
        $('.profile-page-navbar .profile-page-dots').hide();
        $('.profile-page-navbar ul').show();
      }
    }
  
    // Toggle the visibility of tabs when dots are clicked
    $('.profile-page-dots').click(function() {
      $('.profile-page-navbar ul').toggle();
    });
  
    // Show tab content on tab click
    $('.profile-page-navbar .tab').click(function() {
      let content = $(this).data('content');
      $('.profile-page-info').text(content);
      $('#heart-profile').detach(); // Detach the heart element by its ID
    });
});


// Function to handle "My Orders" tab
function handleMyOrders() {
  // Make an AJAX request to retrieve the user's order history from the backend
  $.ajax({
    url: 'http://localhost:5000/api/myorders',
    method: 'GET',
    success: function(response) {
      if (response.length === 0) {
        $('.profile-page-container').text('טרם הזמנת אצלנו');
      } else {
        // Build and display the order history table
        const table = $('<table>').addClass('order-history-table');
        const tableHeader = $('<tr>').append(
          $('<th>').text('מחיר כולל'),
          $('<th>').text('תאריך'),
          $('<th>').text('מספר הזמנה'),
          $('<th>').text('כמות מוצרים')
        );

        table.append(tableHeader);

        response.forEach(function(order) {
          const tableRow = $('<tr>').append(
            $('<td>').text(order.totalPrice),
            $('<td>').text(order.date),
            $('<td>').text(order.orderId),
            $('<td>').text(order.items.length)
          );

          table.append(tableRow);
        });

        $('.profile-page-container').empty().append(table);
      }
    },
    error: function(error) {
      console.error('Error retrieving order history:', error);
    }
  });
}


// Function to handle "My Addresses" tab
function handleMyAddress() {
  // Make an AJAX request to retrieve the user's addresses from the backend
  $.ajax({
    url: 'http://localhost:5000/api/myaddresses',
    method: 'GET',
    success: function(response) {
      // Build and display the addresses table
      const table = $('<table>').addClass('address-table');
      const tableHeader = $('<tr>').append(
        $('<th>').text('שם'),
        $('<th>').text('טלפון'),
        $('<th>').text('כתובת')
      );

      table.append(tableHeader);

      response.forEach(function(address) {
        const tableRow = $('<tr>').append(
          $('<td>').text(address.name),
          $('<td>').text(address.phone),
          $('<td>').text(address.address)
        );

        table.append(tableRow);
      });

      $('.profile-page-container').empty().append(table);
    },
    error: function(error) {
      console.error('Error retrieving addresses:', error);
    }
  });
}


// Function to handle "My Details" tab
function handleMyDetails() {
  // Make an AJAX request to retrieve the user's details from the backend
  $.ajax({
    url: 'http://localhost:5000/api/myuser',
    method: 'GET',
    success: function(response) {
      if (response === null) {
        $('.profile-page-container').text('לא נמצאו פרטי משתמש');
      } else {
        // Build and display the details form
        const form = $('<form>').addClass('details-form');
        const firstNameInput = $('<input>').attr('type', 'text').val(response.firstName);
        const lastNameInput = $('<input>').attr('type', 'text').val(response.lastName);
        const usernameInput = $('<input>').attr('type', 'email').val(response.username);
        const phoneNumberInput = $('<input>').attr('type', 'tel').val(response.phoneNumber);
        const passwordInput = $('<input>').attr('type', 'password').val(response.password);
        const submitButton = $('<button>').attr('type', 'submit').text('שמור');

        form.append(
          $('<label>').text('שם פרטי: ').append(firstNameInput),
          $('<br>'),
          $('<label>').text('שם משפחה: ').append(lastNameInput),
          $('<br>'),
          $('<label>').text('שם משתמש: ').append(usernameInput),
          $('<br>'),
          $('<label>').text('מספר טלפון: ').append(phoneNumberInput),
          $('<br>'),
          $('<label>').text('סיסמה: ').append(passwordInput),
          $('<br>'),
          submitButton
        );

        form.on('submit', function(event) {
          event.preventDefault();

          // Make an AJAX request to update the user's details in the backend
          const updatedDetails = {
            firstName: firstNameInput.val(),
            lastName: lastNameInput.val(),
            username: usernameInput.val(),
            phoneNumber: phoneNumberInput.val(),
            password: passwordInput.val()
          };

          $.ajax({
            url: 'http://localhost:5000/api/myuser',
            method: 'PUT',
            data: updatedDetails,
            success: function(response) {
              console.log('User details updated successfully');
            },
            error: function(error) {
              console.error('Error updating user details:', error);
            }
          });
        });

        $('.profile-page-container').empty().append(form);
      }
    },
    error: function(error) {
      console.error('Error retrieving user details:', error);
    }
  });
}

function handleMyWishList() {
  // Make an AJAX request to retrieve the user's wishlist from the backend
  $.ajax({
    url: 'http://localhost:5000/api/mywishlist',
    method: 'GET',
    success: function(response) {
      if (response.length === 0) {
        $('.profile-page-container').text('ריק פה, בטוח יש דברים יפים שראיתם 🖤');
      } else {
        // Build and display the wishlist table
        const table = $('<table>').addClass('wishlist-table');
        const tableHeader = $('<tr>').append(
          $('<th>').text('Item Name'),
          $('<th>').text('Price'),
          $('<th>').text('Quantity'),
          $('<th>').text('Add to Cart')
        );

        table.append(tableHeader);

        response.forEach(function(item) {
          const tableRow = $('<tr>').append(
            $('<td>').text(item.name),
            $('<td>').text(item.price),
            $('<td>').text(item.amount),
            $('<td>').append(
              $('<button>').text('Add').on('click', function() {
                addToCart(item.id);
              })
            )
          );

          table.append(tableRow);
        });

        $('.profile-page-container').empty().append(table);
      }
    },
    error: function(error) {
      console.error('Error retrieving wishlist:', error);
    }
  });
}



// Function to handle adding an item to the cart from "My Wish List" tab
function addToCart(itemId) {
  // Make an AJAX request to add the item to the user's cart in the backend
  $.ajax({
    url: 'http://localhost:5000/api/mycart',
    method: 'POST',
    data: {
      itemId: itemId
    },
    success: function(response) {
      console.log('Item added to cart');
    },
    error: function(error) {
      console.error('Error adding item to cart:', error);
    }
  });
}


  