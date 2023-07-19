const tables = [
  {
    id: 'addressesTable',
    url: '/api/addresses',
    columnsId: 'addresses-columns',
    rowsId: 'addresses-rows',
  },
];

$(document).ready(async function () {
  // Needs to get after loggin

  // Create navbar
  const navbar = $('<div>').addClass('profile-page-navbar');
  const tabsList = $('<ul></ul>').addClass('profile-page-options');

  const clientUser = await ajaxRequest(`/me`, 'GET');
  const userId = clientUser._id;

  const tabs = [
    {
      text: 'ההזמנות שלי',
      content: 'הזמנות שלי',
      action: function () {
        handleMyOrders(userId);
      },
    },
    {
      text: 'הכתובות שלי',
      content: 'כתובות שלי',
      action: function () {
        handleMyAddress(userId);
      },
    },
    {
      text: 'פרטי התחברות',
      content: 'פרטי התחברות',
      action: function () {
        handleMyDetails(clientUser);
      },
    },
    {
      text: 'התנתקות',
      content: 'התנתקות',
      action: function () {
        handleSignOut();
      },
    },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  // Create profile section
  const profile = $('<div class="profile-header-container"></div>');
  const infoContainter = $('<div>').addClass('profile-page-subtitle');
  profile.append($('<h1>החשבון שלי</h1>').addClass('profile-page-header'), infoContainter);

  const info = $('<p>שמחים לראות אותך שוב</p>').addClass('profile-page-info');
  const heart = $('<i class="far fa-heart" style="color: #fe39c9;"></i>').attr('id', 'profile-page-heart');
  infoContainter.append(info, heart);
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
  $(window).resize(function () {
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
  $('.profile-page-dots').click(function () {
    $('.profile-page-navbar ul').toggle();
  });

  // Show tab content on tab click
  $('.profile-page-navbar .tab').click(function () {
    let content = $(this).data('content');
    $('.profile-page-info').text(content);
    $('#heart-profile').detach(); // Detach the heart element by its ID
  });
});

/////////////////////////////////// My Orders Tab ///////////////////////////////////

// Function to handle "My Orders" tab
async function handleMyOrders() {
  $('.profile-page-container').empty();

  const orders = await ajaxRequest(`/users/order-history`, 'GET');
  fetchUserOrdersHistory(orders);

  if (orders.length === 0) {
    $('.profile-page-container').text('טרם הזמנת אצלנו / עדיין לא התחברת 🖤');
  }
}

/////////////////////////////////// My Details Tab ///////////////////////////////////

// Function to handle "My Details" tab
function handleMyDetails(user) {
  $('.profile-page-container').empty();

  if (user === null) $('.profile-page-container').text('לא נמצאו פרטי משתמש');

  // Build and display the details form
  const form = $('<form>').addClass('details-form');
  const firstNameInput = $('<input>').attr('type', 'text').val(user.firstName);
  const lastNameInput = $('<input>').attr('type', 'text').val(user.lastName);
  const usernameInput = $('<input>').attr('type', 'email').val(user.username);
  const phoneNumberInput = $('<input>').attr('type', 'tel').val(user.phoneNumber);
  const passwordInput = $('<input>').attr('type', 'password').val(user.password);
  const submitButton = $('<button>')
    .addClass('btn btn-primary')
    .attr('id', 'login-page-button')
    .attr('type', 'submit')
    .text('שמור');

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

  form.on('submit', function (event) {
    event.preventDefault();

    // Make an AJAX request to update the user's details in the backend
    const updatedDetails = {
      firstName: firstNameInput.val(),
      lastName: lastNameInput.val(),
      username: usernameInput.val(),
      phoneNumber: phoneNumberInput.val(),
      password: passwordInput.val() ? passwordInput.val() : user.password,
    };

    $.ajax({
      url: `/users/${user._id}`,
      method: 'PUT',
      data: updatedDetails,
      success: function (response) {
        console.log('User details updated successfully');
      },
      error: function (error) {
        console.error('Error updating user details:', error);
      },
    });
  });
  $('.profile-page-container').empty().append(form);
}

/////////////////////////////////// Fetching for User Addresses tab  ////////////////////////////////////

async function handleMyAddress() {
  const options = {
    id: 'addressesTable',
    url: '/users/my-addresses',
    columnsId: 'addresses-columns',
    rowsId: 'addresses-rows',
  };
  $('.profile-page-container').empty();
  const addressesTable = $('<table>').attr('id', options.id).addClass('table');
  const tableHead = $('<thead>');
  const tableHeadRow = $('<tr>').attr('id', options.columnsId);
  const tableBody = $('<tbody>').attr('id', options.rowsId);
  const buttonsDiv = $('<div>').attr('id', `${options.id}-buttons`).addClass('buttons-div');

  addressesTable.append(tableHead.append(tableHeadRow), tableBody);
  $('.profile-page-container').append(buttonsDiv);
  $('.profile-page-container').append(addressesTable);

  const addresses = await ajaxRequest(options.url, 'GET');

  if (addresses.length === 0) {
    $('.profile-page-container').text('אין לנו כתובת שלך 🖤');
    return;
  }

  const params = Object.keys(addresses[0]);
  params.pop();

  buttonsDiv.append(TableBar(options.id, params, options.url));
  ManageTable(addresses, options);
}


/////////////////////////////////// Fetching for User Order History tab ///////////////////////////////////

function fetchUserOrdersHistory(data) {
  const orderHistoryAccordion = $('<div>').attr('id', 'orderHistoryAccordion').attr('style', 'width: 40vw;');
  $('.profile-page-container').append(orderHistoryAccordion);

  // Create an accordion body content element with width of 40%
  const accordionBodyContent = $('<div>').addClass('accordion-body');

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

  data.forEach((order) => {
    const accordionItem = $('<div>').addClass('accordion-item-profile-page');
    const accordionHeader = $('<h2>').addClass('pf-oh-accordion-header').attr('id', `orderHeading_${order._id}`);
    const accordionButton = $('<button>')
      .addClass('accordion-button')
      .attr('type', 'button')
      .attr('data-bs-toggle', 'collapse')
      .attr('data-bs-target', `#collapse_${order._id}`)
      .attr('aria-expanded', 'false')
      .attr('aria-controls', `collapse_${order._id}`);
    accordionHeader.append(accordionButton);

    const accordionBody = $('<div>')
      .addClass('accordion-collapse collapse')
      .attr('id', `collapse_${order._id}`)
      .attr('aria-labelledby', `orderHeading_${order._id}`);

    const accordionBodyContent = $('<div>').addClass('accordion-body');

    // Fetch complete order details

    const orderDate = order.createdAt;
    const orderNum = order.orderNumber;
    const orderState = order.state;
    const orderPaymentMethod = order.paymentMethod;
    const orderShipmentMethod = order.deliveryMethod;
    const orderTotalPrice = order.totalPrice;
    const orderItems = order.orderItems;
    const addressId = order.address;

    // Append the order details to the accordion body
    accordionBodyContent.append(`<p>תאריך הזמנה - ${orderDate}</p>`);
    accordionBodyContent.append(`<p>מצב הזמנה - ${orderState}</p>`);
    accordionBodyContent.append(`<p>שיטת תשלום - ${orderPaymentMethod}</p>`);
    accordionBodyContent.append(`<p>משלוח / איסוף - ${orderShipmentMethod}</p>`);
    accordionBodyContent.append(`<p>סה"כ שולם - ₪${orderTotalPrice}</p>`);
    accordionButton.text(`הזמנה  ${orderNum} 🖤`);

    // Create a table for order items
    const table = $('<table>').addClass('table').attr('id', 'pf-oh-table');
    const tableBody = $('<tbody>');

    // Fetch order items details
    const itemPromises = orderItems.map((item) => {
      const itemId = item.item;
      const itemQuantity = item.quantity;

      // Make an AJAX request to get item details
      return $.ajax({
        url: `item/${itemId}`,
        method: 'GET',
        success: function (response) {
          const itemImage = response.image;

          const itemName = response.name;
          const itemPrice = response.price;

          // Create table row with item details
          const row = createTableRow({
            image: itemImage,
            name: itemName,
            quantity: itemQuantity,
            price: itemPrice,
          });

          // Append the row to the table body
          tableBody.append(row);
        },
        error: function (error) {
          console.error('Error fetching item details:', error);
        },
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
            success: function (address) {
              handleAddressDetails(address);
            },
            error: function (error) {
              console.error('Error fetching address:', error);
            },
            complete: function () {
              // Append the accordion body content to the accordion body
              accordionBody.append(accordionBodyContent);

              // Append the accordion header and body to the accordion item
              accordionItem.append(accordionHeader, accordionBody);

              // Append the accordion item to the order history accordion
              orderHistoryAccordion.append(accordionItem);
            },
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
      .catch((error) => {
        console.error('Error fetching item details:', error);
      });
  });

  // Activate the Bootstrap accordion after all orders have been fetched
  orderHistoryAccordion.addClass('accordion');
  $('.accordion-button').click(function () {
    $(this).attr('aria-expanded', function (index, attr) {
      return attr === 'true' ? 'false' : 'true';
    });
    const targetId = $(this).attr('data-bs-target');
    $(targetId).collapse('toggle');
  });
}

/////////////////////////////////// Fetching & Updating User Addresses tab ///////////////////////////////////

$(document).ready(async function () {
  try {
    for (const table of tables) {
      const res = await ajaxRequest(table.url, 'GET');

      if (res.length > 0) {
        const options = Object.keys(res[0]);
        $(`#${table.id}-buttons`).append(TableBar(table.id, options, table.url));
        ManageTable(res, table);
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

$(document).on('click', '#clean-btn', function () {
  window.location.reload();
});

// Function to delete the row containing the clicked button
$(document).on('click', '.delete-btn', async function () {
  // get the table name and the _id of the row, the _id is the text of input in the first cell
  const tableName = $(this).closest('table').attr('id');
  const _id = $(this).closest('tr').find('td:first-child').text();
  const url = tables.find((table) => table.id === tableName).url;
  const res = await ajaxRequest(url + '/' + _id, 'DELETE');
  if (!res) {
    alert('מחיקה נכשלה');
    return;
  }
  $(this).closest('tr').remove();
  alert('הכתובת נמחקה בהצלחה');
});

// Function to update the row containing the clicked button
$(document).on('click', '.update-btn', function () {
  // change all the text to input
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const text = $(this).text();
      $(this).html(`<input type="text" class="form-control" value="${text}">`);
    });

  // change the button to save button
  $(this).closest('td').html('<button class="btn btn-success save-btn">שמור</button>');
});

// Function to save the row containing the clicked button
$(document).on('click', '.save-btn', async function () {
  const tableName = $(this).closest('table').attr('id');
  const _id = $(this).closest('tr').find('td:first-child input').val();
  const data = {};
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const key = $(this).closest('table').find('th').eq($(this).index()).text().slice(0, -2);
      const value = $(this).find('input').val();
      data[key] = value;
    });

  for (const key in data) {
    if (data[key] === '' && key !== '_id') {
      alert(`השדה ${key} ריק`);
      return;
    }
  }

  delete data._id;

  const isNewItem = _id === '';
  const url = tables.find((table) => table.id === tableName).url;

  const res = isNewItem ? await ajaxRequest(url, 'POST', data) : await ajaxRequest(url + '/' + _id, 'PUT', data);

  if (!res) return alert('העדכון נכשל');

  // change all the input to text and add to the first cell the _id of the res
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const text = $(this).find('input').val();
      $(this).html(text);
    });

  if (isNewItem) {
    $(this).closest('tr').find('td:first-child').html(res._id);
  }

  // change the button to update button and add delete button
  $(this)
    .closest('td')
    .html(
      `
      <button class="btn btn-danger delete-btn">מחק</button>
      <button class="btn btn-primary update-btn">עדכן</button>
    `
    );

  $(`#${tableName}-add-btn`).css('display', 'block');

  alert('הכתובת נוספה בהצלחה');
});

// Function to sort the table based on the selected column
$(document).on('click', 'th', function () {
  var $header = $(this);
  var $table = $header.closest('table');
  var columnIndex = $header.index();
  var sortingOrder = $header.data('sorting') || 'asc';

  // Toggle the sorting order
  if (sortingOrder === 'asc') {
    sortingOrder = 'desc';
    $header.html($header.html().replace('▼', '▲'));
  } else {
    sortingOrder = 'asc';
    $header.html($header.html().replace('▲', '▼'));
  }

  $header.data('sorting', sortingOrder);

  // Get the rows except the header
  var $rows = $table.find('tbody tr').get();

  // Sort the rows based on the column values
  $rows.sort(function (row1, row2) {
    var cell1 = $(row1).find('td').eq(columnIndex).text().trim();
    var cell2 = $(row2).find('td').eq(columnIndex).text().trim();

    if (sortingOrder === 'asc') {
      return cell1.localeCompare(cell2);
    } else {
      return cell2.localeCompare(cell1);
    }
  });

  // Remove existing rows from the table body
  $table.find('tbody tr').remove();

  // Append the sorted rows back to the table body
  $.each($rows, function (index, row) {
    $table.find('tbody').append(row);
  });
});
