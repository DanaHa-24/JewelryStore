$(document).ready(function () {
    const userId = '64982471eaa2cfe2d1b32d5d';
  
    // Create cart section
    const cart = $('<div class="cart-page-header-container"></div>');
    cart.append($('<h1>סל קניות</h1>').addClass('cart-page-header'));
    $('body').append(cart);
  
    // Create cart container for data
    const cartContainer = $('<div>').addClass('cart-page-container');
    $('body').append(cartContainer);
  
    if (userId === null) {
      $('.cart-page-container').text('עלייך להתחבר קודם 🖤');
    } else {
      // Get user's cart ID
      $.ajax({
        url: `/users/${userId}/my-cart`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
          console.log(response);
          const cartId = response;
  
          // Fetch cart items
          $.ajax({
            url: `/cart/${cartId}/items`,
            method: 'GET',
            dataType: 'json',
            success: function (cartItems) {
              if (cartItems.length === 0) {
                $('.cart-page-container').text('ריק פה, בטוח יש דברים יפים שראיתם 🖤');
              } else {
                // Create table
                const table = $('<table>').addClass('table');
                const tableHeader = $('<thead>').html('<tr><th>שם הפריט</th><th>תמונה</th><th>כמות</th><th>מחיר הפריט</th><th>מחיר כולל</th></tr>');
                table.append(tableHeader);
                console.log(cartItems);
                const tableBody = $('<tbody>');
                let totalToPay = 0;
  
                // Populate table rows with cart items
                cartItems.forEach(function (item) {
                  // Fetch additional item information
                  $.ajax({
                    url: `/item/${item.item}`,
                    method: 'GET',
                    dataType: 'json',
                    success: function (itemDetails) {
                      const row = $('<tr>');
                      const itemName = $('<td>').text(itemDetails.name);
                      const itemImage = $('<td>').append($('<img>').attr('src', itemDetails.image).css('max-width', '100px'));
                      const itemQuantity = $('<td>').html(`<div class="input-group">
                                                <button class="minus-btn btn btn-outline-secondary btn-sm" type="button">-</button>
                                                <input type="number" value="${item.quantity}" min="1" class="form-control">
                                                <button class="plus-btn btn btn-outline-secondary btn-sm" type="button">+</button>
                                              </div>`);
                      const itemPrice = $('<td>').text(itemDetails.price);
                      const totalPrice = $('<td>').text(item.quantity * itemDetails.price);
                      totalToPay += item.quantity * itemDetails.price;
  
                      // Remove item button
                      const removeButton = $('<button>').addClass('btn btn-danger btn-sm').text('הסר');
                      removeButton.on('click', function () {
                        // Remove item from cart
                        $.ajax({
                          url: `/cart/${cartId}/items/${item.item.itemId}`,
                          method: 'DELETE',
                          success: function () {
                            // Remove table row
                            row.remove();
  
                            // Update total to pay
                            totalToPay = cartItems.reduce((total, item) => total + item.quantity * itemDetails.price, 0);
                            updateTotalToPay();
                          },
                          error: function (err) {
                            console.error('Failed to remove item from cart:', err);
                          },
                        });
                      });
  
                      itemName.append(removeButton);
                      row.append(itemName, itemImage, itemQuantity, itemPrice, totalPrice);
                      tableBody.append(row);
                    },
                    error: function (err) {
                      console.error('Failed to retrieve item details:', err);
                    },
                  });
                });
  
                table.append(tableBody);
  
                // Append table to cart container
                cartContainer.append(table);
  
                // Total to pay
                const tableFooter = $('<tfoot>');
                const totalToPayRow = $('<tr>').html(`<td colspan="4" class="text-end"><strong>סך הכל לתשלום:</strong></td><td>${totalToPay}</td>`);
                tableFooter.append(totalToPayRow);
                table.append(tableFooter);
  
                const orderButton = $('<button>').addClass('btn btn-primary').text('הזמן עכשיו');
                orderButton.on('click', function () {
                  // Redirect to end purchase page
                  window.location.href = `endPurchasePage.html`;
                });
                cartContainer.append(orderButton);
  
                // Function to update total to pay
                function updateTotalToPay() {
                  totalToPayRow.find('td:last-child').text(totalToPay);
                }
  
                // Update quantity and total price on input change
                tableBody.find('input[type="number"]').on('change', function () {
                  const quantity = parseInt($(this).val());
                  const itemIndex = $(this).closest('tr').index();
                  const item = cartItems[itemIndex];
  
                  // Update quantity in cart
                  item.quantity = quantity;
  
                  // Update total price in table
                  const totalPriceCell = $(this).closest('tr').find('td:last-child');
                  totalPriceCell.text(quantity * itemDetails.price);
  
                  // Update total to pay
                  totalToPay = cartItems.reduce((total, item) => total + item.quantity * itemDetails.price, 0);
                  updateTotalToPay();
  
                  // Update quantity in cart through AJAX request
                  $.ajax({
                    url: `/cart/${cartId}/items/${item.item.itemId}`,
                    method: 'PUT',
                    data: { quantity: quantity },
                    success: function () {
                      console.log('Quantity updated successfully.');
                    },
                    error: function (err) {
                      console.error('Failed to update quantity:', err);
                    },
                  });
                });
              }
            },
            error: function (err) {
              console.error('Failed to retrieve cart items:', err);
            },
          });
        },
        error: function (err) {
          console.error('Failed to retrieve cart:', err);
        },
      });
    }
  });