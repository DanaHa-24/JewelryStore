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
        action: function() {
          handleMyAddress(userId);
        }
      },
      {
        text: 'פרטי התחברות',
        content: 'פרטי התחברות',
        action: function() {
          handleMyDetails(userId);
        }
      },
      {
        text: 'Wishlist',
        content: 'Wishlist',
        action: function() {
          handleMyWishList(userId);
        }
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
function handleMyAddress(userId) {
  $('.profile-page-container').empty();
  if(!userId) {
    $('.profile-page-container').text('טרם הזמנת אצלנו / עדיין לא התחברת 🖤');
  }
  else{
    // Make an AJAX request to retrieve the user's addresses from the backend
    $.ajax({
      url: `/users/${userId}/my-addresses`,
      method: 'GET',
      success: function(response) {
        
        fetchUserAddresses(response);
        
      },
      error: function(error) {
        console.error('Error retrieving addresses:', error);
      }
    });
  }
}
  

/////////////////////////////////// My Details Tab ///////////////////////////////////

// Function to handle "My Details" tab
function handleMyDetails(userId) {
  $('.profile-page-container').empty();
  
  if(!userId) {
    $('.profile-page-container').text(' עדיין לא התחברת 🖤');
  }
  else{
    // Make an AJAX request to retrieve the user's details from the backend
    $.ajax({
      url: `/users/${userId}`,
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
              url: '/users/${userId}',
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
}


/////////////////////////////////// My WishList Tab ///////////////////////////////////

function handleMyWishList(userId) {
  $('.profile-page-container').empty();
  
  if(!userId) {
    $('.profile-page-container').text(' עדיין לא התחברת 🖤');
  }
  else{
    // Make an AJAX request to retrieve the user's wishlist from the backend
    $.ajax({
      url: `/users/${userId}/my-wish`,
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
}


/////////////////////////////////// Fetching for User Addresses tab  ////////////////////////////////////

function fetchUserAddresses(data){
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
  data.forEach(function(addressId) {
    // Make an AJAX request to fetch the address details
    $.ajax({
      url: `addresses/${addressId}`,
      method: 'GET',
      success: function(addressData) {
        const tableRow = $('<tr>').append(
          $('<td>').text(addressData.nickname),
          $('<td>').text(addressData.city),
          $('<td>').text(addressData.street),
          $('<td>').text(addressData.houseNum),
          $('<td>').text(addressData.apartmentNum),
          $('<td>').text(addressData.postalCode),
          $('<td>').append(
            $('<button>')
              .text('עריכה')
              .attr('type', 'button')
              .addClass('btn btn-outline-secondary')
              .on('click', function() {
                editAddress(addressData);
              }),
            $('<button>')
              .text('מחיקה')
              .attr('type', 'button')
              .addClass('btn btn-outline-danger')
              .on('click', function() {
                deleteAddress(addressData.id);
              })
          )
        );

        table.append(tableRow);
      },
      error: function(error) {
        console.error('Error fetching address:', error);
      }
    });

    // Append a row for adding a new address
    const addRow = $('<tr>').append(
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newName')),
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newCity')),
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newStreet')),
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newHouseNum')),
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newApartmentNum')),
      $('<td>').append($('<input>').attr('type', 'text').addClass('form-control').attr('id', 'newPostalCode')),
      $('<td>').append(
        $('<button>')
          .text('שמירה')
          .attr('type', 'button')
          .addClass('btn btn-success')
          .on('click', function() {
            saveNewAddress();
          })
      )
    );

    table.append(addRow);
  })

  $('.profile-page-container').append(table);
}


/////////////////////////////////// Additional functions for Addresses  ////////////////////////////////////

function editAddress(addressId) {
  const tableRow = $(`tr[data-id='${addressId}']`);

  // Convert table cells to inputs for editing
  tableRow.children().each(function(index) {
    const cellText = $(this).text();
    $(this).empty().append($('<input>').attr('type', 'text').addClass('form-control').val(cellText));
  });

  // Replace the "Edit" button with a "Save" button
  tableRow.find('.edit-button').replaceWith(
    $('<button>')
      .text('שמירה')
      .attr('type', 'button')
      .addClass('btn btn-success save-button')
      .on('click', function() {
        saveEditedAddress(addressId);
      })
  );
}

function saveEditedAddress(addressId) {
  const tableRow = $(`tr[data-id='${addressId}']`);

  // Get the edited values from the input fields
  const nickname = tableRow.find('input:eq(0)').val();
  const city = tableRow.find('input:eq(1)').val();
  const street = tableRow.find('input:eq(2)').val();
  const houseNum = tableRow.find('input:eq(3)').val();
  const apartmentNum = tableRow.find('input:eq(4)').val();
  const postalCode = tableRow.find('input:eq(5)').val();

  // Make an AJAX request to update the address in the backend
  $.ajax({
    url: `addresses/${addressId}`,
    method: 'PUT',
    data: {
      nickname: nickname,
      city: city,
      street: street,
      houseNum: houseNum,
      apartmentNum: apartmentNum,
      postalCode: postalCode
    },
    success: function(response) {
      // Replace the input fields with the updated values
      tableRow.children().each(function(index) {
        const inputValue = $(this).find('input').val();
        $(this).empty().text(inputValue);
      });

      // Replace the "Save" button with an "Edit" button
      tableRow.find('.save-button').replaceWith(
        $('<button>')
          .text('עריכה')
          .attr('type', 'button')
          .addClass('btn btn-outline-secondary edit-button')
          .on('click', function() {
            editAddress(response);
          })
      );
    },
    error: function(error) {
      console.error('Error saving edited address:', error);
    }
  });
}

function deleteAddress(addressId) {
  // Make an AJAX request to delete the address from the backend
  $.ajax({
    url: `addresses/${addressId}`,
    method: 'DELETE',
    success: function() {
      // Remove the table row from the UI
      $(`tr[data-id='${addressId}']`).remove();
    },
    error: function(error) {
      console.error('Error deleting address:', error);
    }
  });
}

function saveNewAddress() {
  const newName = $('#newName').val();
  const newCity = $('#newCity').val();
  const newStreet = $('#newStreet').val();
  const newHouseNum = $('#newHouseNum').val();
  const newApartmentNum = $('#newApartmentNum').val();
  const newPostalCode = $('#newPostalCode').val();

  // Make an AJAX request to create a new address in the backend
  $.ajax({
    url: 'addresses/',
    method: 'POST',
    data: {
      nickname: newName,
      city: newCity,
      street: newStreet,
      houseNum: newHouseNum,
      apartmentNum: newApartmentNum,
      postalCode: newPostalCode
    },
    success: function(response) {
      // Create a new table row with the saved address
      const tableRow = $('<tr>').attr('data-id', response.id).append(
        $('<td>').text(response.nickname),
        $('<td>').text(response.city),
        $('<td>').text(response.street),
        $('<td>').text(response.houseNum),
        $('<td>').text(response.apartmentNum),
        $('<td>').text(response.postalCode),
        $('<td>').append(
          $('<button>')
            .text('עריכה')
            .attr('type', 'button')
            .addClass('btn btn-outline-secondary edit-button')
            .on('click', function() {
              editAddress(response);
            }),
          $('<button>')
            .text('מחיקה')
            .attr('type', 'button')
            .addClass('btn btn-outline-danger')
            .on('click', function() {
              deleteAddress(response.id);
            })
        )
      );

      // Insert the new table row before the add row
      $('.profile-page-container table tr:last').before(tableRow);

      // Clear the input fields
      $('#newName').val('');
      $('#newCity').val('');
      $('#newStreet').val('');
      $('#newHouseNum').val('');
      $('#newApartmentNum').val('');
      $('#newPostalCode').val('');
    },
    error: function(error) {
      console.error('Error saving new address:', error);
    }
  });
}


/////////////////////////////////// Fetching for User Order History tab ///////////////////////////////////


function fetchUserOrdersHistory(data) {
  const orderHistoryAccordion = $('<div>').attr('id', 'orderHistoryAccordion');
  $('.profile-page-container').append(orderHistoryAccordion);

  // Helper function to create table rows for order items
  function createTableRow(item) {
    const itemImage = `<td><img src="${item.image}" alt="${item.name}" width="100px" height="100px"></td>`;
    const itemName = `<td>${item.name}</td>`;
    const itemQuantity = `<td>${item.quantity}</td>`;
    const itemPrice = `<td>${item.price}</td>`;
    return $('<tr>').append(itemImage, itemName, itemQuantity, itemPrice);
  }

  // Helper function to handle address details
  function handleAddressDetails(address) {
    let orderAddress = '';
    if (address) {
      orderAddress = `${address.city}, ${address.street} ${address.houseNum}, ${address.apartmentNum}, ${address.postalCode}`;
    }
    if (orderAddress) {
      accordionBodyContent.append(`<p>כתובת למשלוח - ${orderAddress}</p>`);
    }
  }

  data.forEach(orderId => {
    const accordionItem = $('<div>').addClass('accordion-item-profile-page');
    const accordionHeader = $('<h2>')
      .addClass('pf-oh-accordion-header')
      .attr('id', `orderHeading_${orderId}`);
    const accordionButton = $('<button>')
      .addClass('accordion-button')
      .attr('type', 'button')
      .attr('data-bs-toggle', 'collapse')
      .attr('data-bs-target', `#collapse_${orderId}`)
      .attr('aria-expanded', 'false')
      .attr('aria-controls', `collapse_${orderId}`);
    accordionHeader.append(accordionButton);

    const accordionBody = $('<div>')
      .addClass('accordion-collapse collapse')
      .attr('id', `collapse_${orderId}`)
      .attr('aria-labelledby', `orderHeading_${orderId}`);

    const accordionBodyContent = $('<div>').addClass('accordion-body');

    // Fetch complete order details
    $.ajax({
      url: `/orders/${orderId}`,
      method: 'GET',
      success: function(response) {
        const orderDate = response.createdAt;
        const orderNum = response.orderNumber;
        const orderState = response.state;
        const orderPaymentMethod = response.paymentMethod;
        const orderShipmentMethod = response.deliveryMethod;
        const orderTotalPrice = response.totalPrice;
        const orderItems = response.orderItems;
        const addressId = response.address;

        // Append the order details to the accordion body
        accordionBodyContent.append(`<p>תאריך הזמנה - ${orderDate}</p>`);
        accordionBodyContent.append(`<p>מצב הזמנה - ${orderState}</p>`);
        accordionBodyContent.append(`<p>שיטת תשלום - ${orderPaymentMethod}</p>`);
        accordionBodyContent.append(`<p>משלוח / איסוף - ${orderShipmentMethod}</p>`);
        accordionBodyContent.append(`<p>סה"כ שולם - ₪${orderTotalPrice}</p>`);
        accordionButton.text(`הזמנה  ${orderNum} 🖤`);

        // Create a table for order items
        const table = $('<table>').addClass('table').attr("id","pf-oh-table");
        const tableBody = $('<tbody>');

        // Fetch order items details
        const itemPromises = orderItems.map(item => {

          const itemId = item.item;
          const itemQuantity = item.quantity;
          console.log(itemId);

          // Make an AJAX request to get item details
          return $.ajax({
            url: `item/${itemId}`,
            method: 'GET',
            success: function(response) {
              const itemImage = response.image;

              const itemName = response.name;
              const itemPrice = response.price;

              // Create table row with item details
              const row = createTableRow({
                image: itemImage,
                name: itemName,
                quantity: itemQuantity,
                price: itemPrice
              });

              // Append the row to the table body
              tableBody.append(row);
            },
            error: function(error) {
              console.error('Error fetching item details:', error);
            }
          });
        });

        // Wait for all item detail requests to complete
        Promise.all(itemPromises)
          .then(() => {
            // Append the table body to the table
            table.append(tableBody);

            // Append order's items table to accordion
            accordionBodyContent.append(table);

            // Fetch address details (for delivered orders)
            if (addressId) {
              $.ajax({
                url: `/addresses/${addressId}`,
                method: 'GET',
                success: function(address) {
                  handleAddressDetails(address);
                },
                error: function(error) {
                  console.error('Error fetching address:', error);
                },
                complete: function() {
                  // Append the accordion body content to the accordion body
                  accordionBody.append(accordionBodyContent);

                  // Append the accordion header and body to the accordion item
                  accordionItem.append(accordionHeader, accordionBody);

                  // Append the accordion item to the order history accordion
                  orderHistoryAccordion.append(accordionItem);
                }
              });
            } else {
              // Append the accordion body content to the accordion body
              accordionBody.append(accordionBodyContent);

              // Append the accordion header and body to the accordion item
              accordionItem.append(accordionHeader, accordionBody);

              // Append the accordion item to the order history accordion
              orderHistoryAccordion.append(accordionItem);
            }
          })
          .catch(error => {
            console.error('Error fetching item details:', error);
          });
      }
    });
  });

  // Activate the Bootstrap accordion after all orders have been fetched
  orderHistoryAccordion.addClass('accordion');
  $('.accordion-button').click(function() {
    $(this).attr('aria-expanded', function(index, attr) {
      return attr === 'true' ? 'false' : 'true';
    });
    const targetId = $(this).attr('data-bs-target');
    $(targetId).collapse('toggle');
  });
}



/////////////////////////////////// Fetching for User cart tab ///////////////////////////////////
