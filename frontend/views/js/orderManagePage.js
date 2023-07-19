$(document).ready(async function () {
  const orderId = window.location.pathname.split('/')[2];
  const order = await ajaxRequest('/api/orders/' + orderId, 'GET');
  const orderHistoryContainer = $('#order-container');
  orderHistoryContainer.append(`
              <div class="manage-card">
              <form id="order-form-${order._id}" class="manage-form" >
              <div>
              <label for="order-number">Order Number:</label>
              <input class="form-control" type="text" id="order-number-${
                order._id
              }" name="order-number" value="${order.orderNumber}" disabled>
              </div>
              <div>
              <label for="total-price">Total Price:</label>
              <input class="form-control" type="text" id="total-price-${
                order._id
              }" name="total-price" value="${order.totalPrice}" >
              </div>
              <div>
              <label for="delivery-method">Delivery Method:</label>
              <select class="form-control" id="delivery-method-${order._id}" name="delivery-method">
                  <option value="איסוף עצמי" ${
                    order.deliveryMethod === 'איסוף עצמי' ? 'selected' : ''
                  }>איסוף עצמי</option>
                  <option value="משלוח" ${order.deliveryMethod === 'משלוח' ? 'selected' : ''}>משלוח</option>
                  </select>
                  </div>
                  <div>
                  <label for="address">Address:</label>
                  <input class="form-control" type="text" id="address-${
                    order._id
                  }" name="address" value="${order.address}" >
                  </div>
                  <div>
                  <label for="payment-method">Payment Method:</label>
                  <select class="form-control" id="payment-method-${order._id}" name="payment-method">\
                  <option value="אשראי" ${order.paymentMethod === 'אשראי' ? 'selected' : ''}>אשראי</option>
                  <option value="ביט" ${order.paymentMethod === 'ביט' ? 'selected' : ''}>ביט</option>
                  <option value="מזומן" ${order.paymentMethod === 'מזומן' ? 'selected' : ''}>מזומן</option>
                  </select>
                  </div>
                  <div>
                  <label for="state">State:</label>
                  <select class="form-control"  id="state-${order._id}" name="state">
                  <option value="נשלח ללקוח" ${order.state === 'נשלח ללקוח' ? 'selected' : ''}>נשלח ללקוח</option>
                  <option value="הגיע לידי הלקוח/ה" ${
                    order.state === 'הגיע לידי הלקוח/ה' ? 'selected' : ''
                  }>הגיע לידי הלקוח/ה</option>
                  <option value="התקבלה" ${order.state === 'התקבלה' ? 'selected' : ''}>התקבלה</option>
                  <option value="ממתינה" ${order.state === 'ממתינה' ? 'selected' : ''}>ממתינה</option>
                  <option value="בתהליך עיבוד" ${order.state === 'בתהליך עיבוד' ? 'selected' : ''}>בתהליך עיבוד</option>
                  <option value="נאסף ע"י הלקוח/ה" ${
                    order.state === 'נאסף ע"י הלקוח/ה' ? 'selected' : ''
                  }>נאסף ע"י הלקוח/ה</option>
                  <option value="בוטלה" ${order.state === 'בוטלה' ? 'selected' : ''}>בוטלה</option>
                  </select>
                  
                  </div>
                  <div>
                  <label for="created-at">Created At:</label>
                  <input class="form-control" type="text" id="created-at-${
                    order._id
                  }" name="created-at" value="${order.createdAt}" >
                  
                  </div>
                  <div>
                  <label for="num-of-items">Number of Items:</label>
                  <input class="form-control" type="text" id="num-of-items-${
                    order._id
                  }" name="num-of-items" value="${order.numOfItems}" >
                  </div>
                  <button type="submit" class="manage-btn">שמור</button>
                  </form>
                  </div>
                  <hr/>
                  <div style="margin-top: 3rem;">
                  <h4 class="manage-title">Order Items</h4>
                  <table class="table table-striped">
                  <thead>
                  <tr>
                  <th scope="col">Item ID</th>
                  <th scope="col">Item Image</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Quantity</th>
                  </tr>
                  </thead>
                  <tbody id="order-items-${order._id}">
                  ${order.orderItems
                    .map(
                      (item) => `
                      <tr>
                      <td>${item.item.id}</td>
                      <td><img src="${item.item.image}" alt="${item.item.name}" width="50px"></td>
                      <td>${item.item.name}</td>
                      <td>${item.quantity}</td>
                      </tr>
                      `
                    )
                    .join('')}
                      </tbody>
                      </table>
                      </div>
                      <hr>
                      `);

  $(`#order-form-${order._id}`).submit(function (e) {
    e.preventDefault();
    // Handle order order form submission
    // Retrieve and process order order data
    const updatedOrder = {
      totalPrice: $(`#total-price-${order._id}`).val(),
      deliveryMethod: $(`#delivery-method-${order._id}`).val(),
      paymentMethod: $(`#payment-method-${order._id}`).val(),
      state: $(`#state-${order._id}`).val(),
      address: $(`#address-${order._id}`).val(),
      createdAt: $(`#created-at-${order._id}`).val(),
      numOfItems: $(`#num-of-items-${order._id}`).val(),
    };
    // Perform save operation or API call
    const res = ajaxRequest('/api/orders/' + order._id, 'PUT', updatedOrder);
    if (res) {
      alert('Order updated successfully');
    }
  });
});
