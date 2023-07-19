$(document).ready(async function () {
  const userId = window.location.pathname.split('/')[2];
  const user = await ajaxRequest('/users/' + userId, 'GET');
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
              <div class="manage-card">
              <h4>Address ${index + 1}</h4>
              <form id="address-form-${address._id}" class="manage-form">
              <div>
              <label for="address-id">Address ID:</label>
              <input class="form-control" type="text" id="address-id-${address._id}" name="address-id" value="${
      address._id
    }" disabled>
              </div>
              <div>
              <label for="city">City:</label>
              <input class="form-control" type="text" id="city-${address._id}" name="city" value="${address.city}" >
              </div>
              <div>
              <label for="street">Street:</label>
              <input class="form-control" type="text" id="street-${address._id}" name="street" value="${
      address.street
    }" >
              </div>
              <div>
              <label for="house-number">House Number:</label>
              <input class="form-control" type="number" id="house-number-${address._id}" name="house-number" value="${
      address.houseNum
    }" >
              </div>
              <div>
              <label for="postal-code">Postal Code:</label>
              <input class="form-control" type="number" id="postal-code-${address._id}" name="postal-code" value="${
      address.postalCode
    }" >
              </div>
              <button type="submit" class="manage-btn">שמור</button>
              </form>
              <hr>
              </div>
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

  // Form Submit Handlers
  $('#user-details-form').submit(function (e) {
    e.preventDefault();
    // Handle user details form submission
    const userDetails = {
      firstName: $('#first-name').val(),
      lastName: $('#last-name').val(),
      username: $('#username').val(),
      phoneNumber: $('#phone-number').val(),
      role: $('#role').val(),
    };
    // Perform save operation or API call
    const res = ajaxRequest('/users/' + userId, 'PUT', userDetails);
    if (res) {
      alert('User details updated successfully');
    }
  });
});
