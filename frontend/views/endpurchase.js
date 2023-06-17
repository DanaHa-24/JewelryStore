$(document).ready(function() {
    // Create the container div
    var container = $('<div class="container"></div>');

    // Create the h1 element for the heading
    var heading = $('<h1 class="mt-4">תודה על הרכישה שלך !</h1>');

    // Create the paragraph for purchase details
    var purchaseDetails = $('<p>להלן פרטי הרכישה שלך :</p>');

    // Create the card for order summary
    var orderSummaryCard = $('<div class="card"></div>');
    var orderSummaryCardHeader = $('<div class="card-header"><h2>סיכום ההזמנה</h2></div>');
    var orderSummaryCardBody = $('<div class="card-body"></div>');
    var orderNumber = $('<p><strong>מספר הזמנה:</strong> #123456</p>');
    var orderTotal = $('<p><strong>סכום כולל:</strong> 500.00 ₪</p>');
    orderSummaryCardBody.append(orderNumber, orderTotal);
    orderSummaryCard.append(orderSummaryCardHeader, orderSummaryCardBody);

    // Create the card for shipping details
    var shippingDetailsCard = $('<div class="card"></div>');
    var shippingDetailsCardHeader = $('<div class="card-header"><h2>פרטי משלוח</h2></div>');
    var shippingDetailsCardBody = $('<div class="card-body"></div>');
    var shippingAddress = $('<p><strong>כתובת למשלוח:</strong>, רחוב , עיר, מיקוד</p>');
    var shippingMethod = $('<p><strong>שיטת משלוח:</strong> משלוח רגיל</p>');
    shippingDetailsCardBody.append(shippingAddress, shippingMethod);
    shippingDetailsCard.append(shippingDetailsCardHeader, shippingDetailsCardBody);

    // Create the card for payment details
    var paymentDetailsCard = $('<div class="card"></div>');
    var paymentDetailsCardHeader = $('<div class="card-header"><h2>פרטי תשלום</h2></div>');
    var paymentDetailsCardBody = $('<div class="card-body"></div>');
    var paymentMethod = $('<p><strong>אמצעי תשלום:</strong> כרטיס אשראי</p>');
    paymentDetailsCardBody.append(paymentMethod);
    paymentDetailsCard.append(paymentDetailsCardHeader, paymentDetailsCardBody);

    // Create the thank you message
    var thankYouMessage = $('<p>תודה שקנית אצלנו!</p>');

    // Create the "Back to Homepage" button
    var homeButton = $('<div class="text-center mt-4"><a href="#" class="btn">חזור לדף הבית</a></div>');

    // Append all the created elements to the container div
    container.append(
      heading,
      purchaseDetails,
      orderSummaryCard,
      shippingDetailsCard,
      paymentDetailsCard,
      thankYouMessage,
      homeButton
    );

    // Append the container to the body of the document
    $('body').append(container);
  });