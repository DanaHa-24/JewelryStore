$(document).ready(function() {
  // Needs to get after loggin  
  const userId = "64982471eaa2cfe2d1b32d5a";  

    // Create navbar
    const navbar = $('<div>').addClass('profile-page-navbar');
    const tabsList = $('<ul></ul>').addClass('profile-page-options');
  
    const tabs = [
      {
        text: 'ההזמנות שלי',
        content: 'הזמנות שלי',
        action: function() {
          handleMyOrders(userId);
        }
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


/////////////////////////////////// My Orders Tab ///////////////////////////////////

// Function to handle "My Orders" tab
function handleMyOrders(userId) {
  $('.profile-page-container').empty();
  //console.log(userId);
  if(!userId) {
    $('.profile-page-container').text('טרם הזמנת אצלנו / עדיין לא התחברת 🖤');
  }
  // Make an AJAX request to retrieve the user's order history from the backend
  $.ajax({
    url: `/users/${userId}/order-history`,
    method: 'GET',
    dataType: 'json',
    success: function (response) {
      // Handle successful response (order history data)
      //console.log(response);
      // Populate the user's order history accordion
      fetchUserOrdersHistory(response);
    },
    error: function (error) {
      // Handle error
      console.error('Error fetching order history:', error);
      // Display an error message or perform appropriate error handling
    }
  });
}


/////////////////////////////////// My Addresses Tab ///////////////////////////////////

// Function to handle "My Addresses" tab
function handleMyAddress() {
  $('.profile-page-container').empty();
  // Make an AJAX request to retrieve the user's addresses from the backend
  $.ajax({
    url: 'http://localhost:5000/addresses',
    method: 'GET',
    success: function(response) {
      // Build and display the addresses table
      const table = $('<table>').addClass('table table-striped');
      const tableHeader = $('<tr>').append(
        $('<th>').text('שם'),
        $('<th>').text('עיר'),
        $('<th>').text('רחוב'),
        $('<th>').text('מספר בית'),
        $('<th>').text('מספר דירה'),
        $('<th>').text('מיקוד'),
        $('<th>').text('פעולות')
      );

      table.append(tableHeader);

      response.forEach(function(address) {
        const tableRow = $('<tr>').append(
          $('<td>').text(address.nickname),
          $('<td>').text(address.city),
          $('<td>').text(address.street),
          $('<td>').text(address.houseNum),
          $('<td>').text(address.apartmentNum),
          $('<td>').text(address.postalCode),
          $('<td>').append(
            $('<button>').text('עריכה').attr('type','button').addClass('btn btn-outline-secondary').on('click', function() {
              editAddress(address);
            }),
            $('<button>').text('מחיקה').attr('type','button').addClass('btn btn-outline-danger').on('click', function() {
              deleteAddress(address.id);
            })
          )
        );

        table.append(tableRow);
      });

      $('.profile-page-container').append(table);
    },
    error: function(error) {
      console.error('Error retrieving addresses:', error);
    }
  });
}

// Function to handle editing an address
function editAddress(address) {
  const tableRow = $('tr').has('td:contains("' + address.name + '")');

  // Convert address fields to input fields for editing
  tableRow.children().each(function(index) {
    const text = $(this).text();
    $(this).html($('<input>').val(text));
  });

  const editButton = tableRow.find('.btn-primary');
  editButton.text('שמירה').off('click').on('click', function() {
    saveAddress(address.id);
  });
}

// Function to save the edited address
function saveAddress(addressId) {
  const tableRow = $('tr').has('button:contains("שמירה")');

  // Get the edited values from the input fields
  const editedValues = {
    name: tableRow.find('input').eq(0).val(),
    city: tableRow.find('input').eq(1).val(),
    street: tableRow.find('input').eq(2).val(),
    houseNumber: tableRow.find('input').eq(3).val(),
    apartmentNumber: tableRow.find('input').eq(4).val(),
    zipCode: tableRow.find('input').eq(5).val()
  };

  // Make an AJAX request to update the address in the backend
  $.ajax({
    url: 'http://localhost:5000/addresses/' + addressId,
    method: 'PUT',
    data: editedValues,
    success: function(response) {
      console.log('Address updated successfully');
      handleMyAddress(); // Refresh the addresses table
    },
    error: function(error) {
      console.error('Error updating address:', error);
    }
  });
}

// Function to delete an address
function deleteAddress(addressId) {
  // Make an AJAX request to delete the address from the backend
  $.ajax({
    url: 'http://localhost:5000/addresses/' + addressId,
    method: 'DELETE',
    success: function(response) {
      console.log('Address deleted successfully');
      handleMyAddress(); // Refresh the addresses table
    },
    error: function(error) {
      console.error('Error deleting address:', error);
    }
  });
}

/////////////////////////////////// My Details Tab ///////////////////////////////////

// Function to handle "My Details" tab
function handleMyDetails() {
  $('.profile-page-container').empty();
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


/////////////////////////////////// My WishList Tab ///////////////////////////////////

function handleMyWishList() {
  $('.profile-page-container').empty();
  // Make an AJAX request to retrieve the user's wishlist from the backend
  $.ajax({
    url: 'http://localhost:5000/wishlist',
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


/////////////////////////////////// Fetching for User Order History tab ///////////////////////////////////


function fetchUserOrdersHistory(data) {
  const orderHistoryAccordion = $('<div>').attr('id', 'orderHistoryAccordion');
  $('.profile-page-container').append(orderHistoryAccordion);

  data.forEach(orderId => {
    //console.log(orderId);
    // Make an AJAX request to fetch the complete order details
    $.ajax({
      url: `/orders/${orderId}`, // Adjust the URL endpoint to fetch the order details
      method: 'GET',
      success: function(response) {
        //console.log(response);
        // Handle successful response (complete order details)
        const orderDate = response.createdAt;
        const orderNum = response.orderNumber;
        const orderState = response.state;
        const orderPaymentMethod = response.paymentMethod;
        const orderShipmentMethod = response.deliveryMethod;
        const orderTotalPrice = response.totalPrice;
        const orderItemsId = response.orderItems;
        const addressId = response.address;

        // Create the accordion item
        const accordionItem = $('<div>').addClass('accordion-item-profile-page');

        // Create the accordion header
        const accordionHeader = $('<h2>')
          .addClass('accordion-header')
          .attr('id', `orderHeading_${orderId}`);

        const accordionButton = $('<button>')
          .addClass('accordion-button')
          .attr('type', 'button')
          .attr('data-bs-toggle', 'collapse')
          .attr('data-bs-target', `#collapse_${orderId}`)
          .attr('aria-expanded', 'false')
          .attr('aria-controls', `collapse_${orderId}`)
          .text(`הזמנה  ${orderNum} 🖤  `);

        accordionHeader.append(accordionButton);

        // Create the accordion body
        const accordionBody = $('<div>')
          .addClass('accordion-collapse collapse')
          .attr('id', `collapse_${orderId}`)
          .attr('aria-labelledby', `orderHeading_${orderId}`);

        const accordionBodyContent = $('<div>').addClass('accordion-body');

        // Append the order details to the accordion body
        accordionBodyContent.append(`<p>תאריך הזמנה - ${orderDate}</p>`);
        accordionBodyContent.append(`<p>מצב הזמנה - ${orderState}</p>`);
        accordionBodyContent.append(`<p>שיטת תשלום - ${orderPaymentMethod}</p>`);
        accordionBodyContent.append(`<p>משלוח / איסוף - ${orderShipmentMethod}</p>`);
        accordionBodyContent.append(`<p>סה"כ שולם - ₪${orderTotalPrice}</p>`);

        // Create a table for order items
        const table = $('<table>').addClass('table');
        const tableBody = $('<tbody>');

        // Fetch order items details
        const fetchOrderItems = orderItemsId.map(itemId => {
          return $.ajax({
            url: `/items/${itemId}`,
            method: 'GET'
          });
        });

        // Wait for all AJAX requests for order items to complete
        $.when(...fetchOrderItems)
          .then(function(...orderItemsResponses) {
            // Handle successful responses for order items
            const orderItems = orderItemsResponses.map(response => response[0]);

            // Iterate over order items and create table rows
            orderItems.forEach(item => {
              const itemImage = `<img src="${item.image}" alt="${item.name}" width="50" height="50">`;
              const itemName = `<td>${item.name}</td>`;
              const itemQuantity = `<td>${item.quantity}</td>`;
              const itemPrice = `<td>${item.price}</td>`;

              const row = $('<tr>').append(itemImage, itemName, itemQuantity, itemPrice);
              tableBody.append(row);
            });

            // Append the table to the accordion body
            table.append(tableBody);
            accordionBodyContent.append(table);

            // Fetch address details - just for delivered orders
            if (addressId) {
              $.ajax({
                url: `/addresses/${addressId}`, // Adjust the URL endpoint to fetch the address
                method: 'GET',
                success: function(address) {
                  // Concatenate the address fields if available
                  let orderAddress = '';
                  if (address) {
                    orderAddress = `${address.city}, ${address.street} ${address.houseNum}, ${address.apartmentNum}, ${address.postalCode}`;
                  }

                  // Append the order address if available
                  if (orderAddress) {
                    accordionBodyContent.append(`<p>כתובת למשלוח - ${orderAddress}</p>`);
                  }
                },
                error: function(error) {
                  // Handle error fetching address
                  console.error('Error fetching address:', error);
                },
                complete: function() {
                  // Append the accordion body content to the accordion body
                  accordionBody.append(accordionBodyContent);

                  // Append the accordion header and body to the accordion item
                  accordionItem.append(accordionHeader, accordionBody);

                  // Append the accordion item to the order history accordion
                  orderHistoryAccordion.append(accordionItem);

                  // Activate the Bootstrap accordion
                  $('#orderHistoryAccordion').addClass('accordion');
                  $('.accordion-button').click(function() {
                    $(this).attr('aria-expanded', function(index, attr) {
                      return attr === 'true' ? 'false' : 'true';
                    });
                    const targetId = $(this).attr('data-bs-target');
                    $(targetId).collapse('toggle');
                  });
                }
              });
            } else {
              // Append the accordion body content to the accordion body
              accordionBody.append(accordionBodyContent);

              // Append the accordion header and body to the accordion item
              accordionItem.append(accordionHeader, accordionBody);

              // Append the accordion item to the order history accordion
              orderHistoryAccordion.append(accordionItem);

              // Activate the Bootstrap accordion
              $('#orderHistoryAccordion').addClass('accordion');
              $('.accordion-button').click(function() {
                $(this).attr('aria-expanded', function(index, attr) {
                  return attr === 'true' ? 'false' : 'true';
                });
                const targetId = $(this).attr('data-bs-target');
                $(targetId).collapse('toggle');
              });
            }
          })
          .fail(function(error) {
            // Handle errors fetching order items
            console.error('Error fetching order items:', error);
          });
      },
      error: function(error) {
        // Handle error fetching order details
        console.error('Error fetching order details:', error);
      }
    });
  });
}




/////////////////////////////////// Fetching for User cart tab ///////////////////////////////////




