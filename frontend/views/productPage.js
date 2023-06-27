$(document).ready(function() {
    // Function to update product details dynamicly
    function updateProductDetails(id) {
      // Make a request to your MongoDB Atlas database to fetch the product details by ID
      // Assuming you have set up the necessary connection and have the appropriate MongoDB client library installed
      // Replace the connection and query logic with your actual implementation
    
      // Example using MongoDB Node.js driver
      const { MongoClient } = require('mongodb');
      const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas connection string
    
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
      client.connect((err) => {
        if (err) {
          console.error('Error connecting to MongoDB Atlas:', err);
          return;
        }
    
        const collection = client.db('your-database-name').collection('your-collection-name'); // Replace with your database and collection names
    
        collection.findOne({ id: id }, (err, product) => {
          if (err) {
            console.error('Error fetching product details from MongoDB Atlas:', err);
            client.close();
            return;
          }
    
          // Update the product details on the page with the fetched data
          $('.product-title').text(product.name);
          $('.product-price').text(`מחיר: ₪${product.price}`).data('currency', 'shekels');
          $('.product-description').text(product.description);
    
          // Check if it's the last couple of units
          if (product.amountInStock <= 2) {
            // Fetch additional information from the database based on the provided id
            // and update the product availability accordingly
            // You can customize this part based on your database structure and requirements
            const additionalInfo = `יחידות אחרונות במלאי - צבעים זמינים: ${product.color.join(', ')}, גדלים זמינים: ${product.size.join(', ')}`;
            $('.product-availability').text(additionalInfo);
          } else {
            $('.product-availability').text('מוצר במלאי');
          }
    
          // Update the product image source dynamically
          const productImage = $('<img>')
            .attr('src', product.image)
            .addClass('img-fluid rounded')
            .attr('alt', 'Product Image');
          $('.col-md-6.product-page-rtl').empty().append(productImage);
    
          client.close();
        });
      });
    }
    
  
    // WebSocket section
    const websocket = new WebSocket('ws://localhost:5000');

    // WebSocket event handlers
    websocket.onopen = function () {
    console.log('WebSocket connection established.');
    };

    websocket.onmessage = function (event) {
    // Receive opinions from the server and display them
    const opinionText = event.data;
    const opinionItem = $('<div>')
        .addClass('opinion-item product-page-rtl')
        .text('• ' + opinionText);
    $('.opinion-Container').prepend(opinionItem);
    };

    websocket.onerror = function (event) {
    console.error('WebSocket error:', event);
    };

    websocket.onclose = function () {
    console.log('WebSocket connection closed.');
    };

    function submitOpinion() {
        const opinionText = $('#opinion-input').val();
      
        if (opinionText) {
          const opinionItem = $('<div>')
            .addClass('opinion-item product-page-rtl')
            .text('• ' + opinionText);
      
          // Insert the opinion above the input field
          opinionItem.insertBefore('#opinion-input');
          $('#opinion-input').val('');
          
          // Send the opinion to the server via WebSocket
          websocket.send(opinionText);
        }
      }
      
    //web socket section end
  
    //live convertion rate webservice
    function convertCurrency() {
      const shekelsPrice = parseFloat($('.product-price').data('shekels'));
      const currentCurrency = $('.product-price').data('currency');
  
      // Toggle between shekels and dollars
      if (currentCurrency === 'shekels') {
        const url = 'https://api.exchangerate-api.com/v4/latest/ILS';
  
        // Make a GET request to the web service
        $.get(url, function(data) {
          const exchangeRate = data.rates.USD;
          const dollarsPrice = (shekelsPrice / exchangeRate).toFixed(2);
  
          $('.product-price').text(`מחיר: $${dollarsPrice}`).data('currency', 'dollars');
        }).fail(function() {
          // Display an error message if currency conversion fails
          $('.product-price').text('מחיר: שגיאה').data('currency', 'shekels');
        });
      } else {
        $('.product-price').text(`מחיר: ₪${shekelsPrice}`).data('currency', 'shekels');
      }
    }
  
    // Text content arrays
    const productTitle = ['שם המוצר'];
    const productPrice = ['מחיר: ₪0'];
    const productAvailability = ['יחידות אחרונות במלאי'];
    const productDescription = [
      'תיאור המוצר מפורט כאן ומספק מידע על המאפיינים המרכזיים של המוצר. ניתן לכתוב על החומרים, העיצוב, הגימור וכל פרטים נוספים שיהיו רלוונטיים ללקוח.',
    ];
  
    // Create the product container
    const productContainer = $('<div>').addClass('container product-page-rtl');
  
    // Create the row element
    const row = $('<div>').addClass('row');
  
    // Create the product image column
    const imageColumn = $('<div>').addClass('col-md-6 product-page-rtl');
    const productImage = $('<img>')
      .attr('src', 'path/to/product-image.jpg')
      .addClass('img-fluid rounded')
      .attr('alt', 'Product Image');
    imageColumn.append(productImage);
  
    // Create the product details column
    const detailsColumn = $('<div>').addClass('col-md-6 text-right product-page-rtl');
    detailsColumn.append($('<h1>').addClass('display-4 product-title product-page-rtl').text(productTitle[0]));
  
    // Create the price container
    const priceContainer = $('<div>').addClass('d-flex align-items-center product-price-container product-page-rtl');
    const priceText = $('<p>').addClass('lead mb-3 product-price product-page-rtl').text(productPrice[0]);
    const priceButton = $('<button>').addClass('btn btn-secondary btn-sm ml-2 product-page-rtl product-page-convert').text('המר מטבע');
    priceContainer.append(priceText);
    priceContainer.append(priceButton);
  
    // Add click event to the price button
    priceButton.on('click', convertCurrency);
  
    detailsColumn.append(priceContainer);
    detailsColumn.append($('<p>').addClass('text-muted product-availability product-page-rtl').text(productAvailability[0]));
    detailsColumn.append($('<hr>'));
    const descriptionHeading = $('<h2>').addClass('h4 product-page-rtl').text('תיאור המוצר:');
    descriptionHeading.css('margin-bottom', '10px');
    detailsColumn.append(descriptionHeading);
    detailsColumn.append($('<p>').addClass('text-muted product-description product-page-rtl').text(productDescription[0]));
  
    // Create a div to hold the buttons and apply margin between them
    const buttonsDiv = $('<div>').addClass('product-page-rtl');
    buttonsDiv.append($('<button>').addClass('btn btn-primary btn-lg product-page-rtl').text('הוסף לעגלת הקניות'));
    buttonsDiv.append($('<button>').addClass('btn btn-secondary btn-lg ml-4 product-page-rtl').text('הוסף לרשימת המשאלות'));
    buttonsDiv.children().css('margin-right', '10px');
  
    // Add the buttons div to the details column
    detailsColumn.append(buttonsDiv);
  
    // Create the opinion window
    const opinionContainer = $('<div>').addClass('opinion-Container ml-2 product-page-rtl');
    const opinionHeading = $('<h2>').addClass('h4 product-page-rtl').text(' מה הלקוחות חשבו על מוצר זה:');
    opinionHeading.css('margin-bottom', '10px');
    opinionContainer.append(opinionHeading);
    const opinionInput = $('<input>').attr('id', 'opinion-input').addClass('form-control mb-3 product-page-rtl').attr('placeholder', 'הקלד את דעתך כאן');
    const opinionButton = $('<button>').addClass('btn btn-primary product-page-rtl').text('הוסף את דעתך');
    opinionButton.on('click', submitOpinion);
    opinionContainer.append(opinionInput);
    opinionContainer.append(opinionButton);
  
    // Append the columns and opinion window to the row
    row.append(imageColumn);
    row.append(detailsColumn);
    row.append(opinionContainer);
  
    // Append the row to the product container
    productContainer.append(row);
  
    // Append the product container to the body
    $('body').append(productContainer);
  
    // Update the product details with default content
    updateProductDetails(productTitle[0], productPrice[0], productAvailability[0], productDescription[0]);
  });
  