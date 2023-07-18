function OrdersList(orders) {
  const ordersContainer = $('#orders-container');

  orders.forEach(function (order) {
    const card = $('<div>').addClass('card col-md-6');

    const header = $('<div>').addClass('card-header').text(`Order Number: ${order.orderNumber}`);
    card.append($header);

    const infoContainer = $('<div>').addClass('card-info p-3');

    const username = $('<div>').addClass('row');
    const usernameLabel = $('<div>').addClass('col-4 card-label').text('Username:');
    const usernameValue = $('<div>').addClass('col-8 card-value').text(order.username);
    username.append(usernameLabel, usernameValue);
    infoContainer.append(username);

    const numOfItems = $('<div>').addClass('row');
    const numOfItemsLabel = $('<div>').addClass('col-4 card-label').text('Number of Items:');
    const numOfItemsValue = $('<div>').addClass('col-8 card-value').text(order.numOfItems);
    numOfItems.append(numOfItemsLabel, numOfItemsValue);
    infoContainer.append(numOfItems);

    const totalPrice = $('<div>').addClass('row');
    const totalPriceLabel = $('<div>').addClass('col-4 card-label').text('Total Price:');
    const totalPriceValue = $('<div>').addClass('col-8 card-value').text(order.totalPrice);
    totalPrice.append(totalPriceLabel, totalPriceValue);
    infoContainer.append(totalPrice);

    const deliveryMethod = $('<div>').addClass('row');
    const deliveryMethodLabel = $('<div>').addClass('col-4 card-label').text('Delivery Method:');
    const deliveryMethodValue = $('<div>').addClass('col-8 card-value').text(order.deliveryMethod);
    deliveryMethod.append(deliveryMethodLabel, deliveryMethodValue);
    infoContainer.append(deliveryMethod);

    const createdAt = $('<div>').addClass('row');
    const createdAtLabel = $('<div>').addClass('col-4 card-label').text('Created At:');
    const createdAtValue = $('<div>').addClass('col-8 card-value').text(order.createdAt);
    createdAt.append(createdAtLabel, createdAtValue);
    infoContainer.append(createdAt);

    card.append(infoContainer);

    ordersContainer.append(card);
  });
}
