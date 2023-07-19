$(document).ready(async function () {
    const userId = window.location.pathname.split('/')[2];
    const user = await ajaxRequest('/users/' + userId, 'GET');
    console.log(JSON.stringify(user));
    // Populate User Details
    $('#user-id').val(user._id);
    $('#first-name').val(user.firstName);
    $('#last-name').val(user.lastName);
    $('#username').val(user.username);
    $('#phone-number').val(user.phoneNumber);
    $('#role').val(user.role);
    $('#num-of-orders').val(user.numOfOrders);
  
    // Populate Address
    const addressContainer = $('#address-container');
    user.address.forEach((address, index) => {
      addressContainer.append(`
              <form id="address-form-${address._id}" class="manage-form">
              <h4>Address ${index + 1}</h4>
              <div>
                <label for="address-id">Address ID:</label>
                <input type="text" id="address-id-${address._id}" name="address-id" value="${address._id}" >
              </div>
              <div>
                <label for="city">City:</label>
                <input type="text" id="city-${address._id}" name="city" value="${address.city}" >
              </div>
              <div>
                <label for="street">Street:</label>
                <input type="text" id="street-${address._id}" name="street" value="${address.street}" >
              </div>
              <div>
                <label for="house-number">House Number:</label>
                <input type="text" id="house-number-${address._id}" name="house-number" value="${address.houseNum}" >
              </div>
              <div>
                <label for="postal-code">Postal Code:</label>
                <input type="text" id="postal-code-${address._id}" name="postal-code" value="${address.postalCode}" >
              </div>
              <button type="submit">Save Changes</button>
              </form>
            <hr>
          `);
      $(`#address-form-${address._id}`).submit(function (e) {
        e.preventDefault();
        // Handle address form submission
        // Retrieve and process address data
        const addressId = $(`#address-id-${address._id}`).val();
        const city = $(`#city-${address._id}`).val();
        const street = $(`#street-${address._id}`).val();
        const houseNum = $(`#house-number-${address._id}`).val();
        const postalCode = $(`#postal-code-${address._id}`).val();
        // Perform save operation or API call
        const res = ajaxRequest('/api/addresses/' + addressId, 'PUT', {
          city,
          street,
          houseNum,
          postalCode,
        });
        if (res) {
          alert('Address updated successfully');
        }
      });
    });
  
    // Populate Order History
    const orderHistoryContainer = $('#order-history-container');
    user.orderHistory.forEach((history, index) => {
      orderHistoryContainer.append(`
              <form id="order-form-${history._id}" class="manage-form">
              <h4>Order ${index + 1}</h4>
              <div>
                <label for="order-number">Order Number:</label>
                <input type="text" id="order-number-${history._id}" name="order-number" value="${history.orderNumber}" >
              </div>
              <div>
                <label for="total-price">Total Price:</label>
                <input type="text" id="total-price-${history._id}" name="total-price" value="${history.totalPrice}" >
              </div>
              <div>
                <label for="delivery-method">Delivery Method:</label>
                <input type="text" id="delivery-method-${history._id}" name="delivery-method" value="${
        history.deliveryMethod
      }" >
              </div>
              <div>
                <label for="payment-method">Payment Method:</label>
                <input type="text" id="payment-method-${history._id}" name="payment-method" value="${
        history.paymentMethod
      }" >
              </div>
              <div>
                <label for="state">State:</label>
                <input type="text" id="state-${history._id}" name="state" value="${history.state}" >
              </div>
              <div>
                <label for="created-at">Created At:</label>
                <input type="text" id="created-at-${history._id}" name="created-at" value="${history.createdAt}" >
  
              </div>
              <div>
                <label for="num-of-items">Number of Items:</label>
                <input type="text" id="num-of-items-${history._id}" name="num-of-items" value="${history.numOfItems}" >
              </div>
              <button type="submit">Save Changes</button>
              </form>
            <hr>
          `);
  
      $(`#order-form-${history._id}`).submit(function (e) {
        e.preventDefault();
        // Handle order history form submission
        // Retrieve and process order history data
        const orderNumber = $(`#order-number-${history._id}`).val();
        const totalPrice = $(`#total-price-${history._id}`).val();
        const deliveryMethod = $(`#delivery-method-${history._id}`).val();
        const paymentMethod = $(`#payment-method-${history._id}`).val();
        const state = $(`#state-${history._id}`).val();
        const createdAt = $(`#created-at-${history._id}`).val();
        const numOfItems = $(`#num-of-items-${history._id}`).val();
        // Perform save operation or API call
        const res = ajaxRequest('/api/orders/' + orderNumber, 'PUT', {
          totalPrice,
          deliveryMethod,
          paymentMethod,
          state,
          createdAt,
          numOfItems,
        });
        if (res) {
          alert('Order updated successfully');
        }
      });
    });
  
    // Populate Wishlist
    $('#wishlist-id').val(user.myWishList._id);
    $('#wishlist-user').val(user.myWishList.user);
    const wishlistItemsContainer = $('#wishlist-items-container');
    user.myWishList.items.forEach((item, index) => {
      wishlistItemsContainer.append(`
            <div class="manage-form">
              <h4>Item ${index + 1}</h4>
              <div>
                <label for="item-id">Item ID:</label>
                <input type="text" id="item-id-${item._id}" name="item-id" value="${item._id} " disabled>
              </div>
              <div>
                <label for="item-name">Item Name:</label>
                <input type="text" id="item-name-${item._id}" name="item-name" value="${item.name} " disabled>
              </div>
              <div>
                <label for="item-price">Item Price:</label>
                <input type="text" id="item-price-${item._id}" name="item-price" value="${item.price} " disabled>
              </div>
            <hr>
          `);
    });
  
    // Form Submit Handlers
    $('#user-details-form').submit(function (e) {
      e.preventDefault();
      // Handle user details form submission
      const userDetails = {
        firstName: $('#first-name').val(),
        lastName: $('#last-name').val(),
        username: $('#username').val(),
        phoneNumber: $('#phone-number').val(),
      };
      // Perform save operation or API call
      console.log(userDetails);
    });
  
    $('#wishlist-form').submit(function (e) {
      e.preventDefault();
      // Handle wishlist form submission
      const wishlistId = $('#wishlist-id').val();
      const wishlistUser = $('#wishlist-user').val();
      const wishlistItems = [];
      $('#wishlist-items-container > div').each(function () {
        const item = $(this).find('p:nth-child(2)').text().split(': ')[1];
        wishlistItems.push(item);
      });
      // Perform save operation or API call
      console.log(wishlistId, wishlistUser, wishlistItems);
    });
  });
  