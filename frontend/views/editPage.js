$(document).ready(function() {
    // Create table
    var table = `
      <div class="container mt-5">
        <table id="inventoryTable" class="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th></th>
              <th>כמות נמכרה</th>
              <th>כמות</th>
              <th>מספר סידורי</th>
              <th>שם המוצר</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
              <td>5</td>
              <td>
                <div class="input-group">
                  <button class="btn btn-secondary btn-sm decrease-amount">-</button>
                  <input type="number" class="form-control text-center" value="10">
                  <button class="btn btn-secondary btn-sm increase-amount">+</button>
                </div>
              </td>
              <td>SN-001</td>
              <td>מוצר 1</td>
            </tr>
            <tr>
              <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
              <td>2</td>
              <td>
                <div class="input-group">
                  <button class="btn btn-secondary btn-sm decrease-amount">-</button>
                  <input type="number" class="form-control text-center" value="5">
                  <button class="btn btn-secondary btn-sm increase-amount">+</button>
                </div>
              </td>
              <td>SN-002</td>
              <td>מוצר 2</td>
            </tr>
          </tbody>
        </table>
        <div class="input-group mt-3">
          <input id="amountSoldInput" type="number" class="form-control text-center" placeholder="כמות נמכרה">
          <input id="amountInput" type="number" class="form-control text-center" placeholder="כמות">
          <input id="serialNumberInput" type="text" class="form-control text-center" placeholder="מספר סידורי">
          <input id="productNameInput" type="text" class="form-control text-center" placeholder="שם המוצר">
          <button id="addRowBtn" class="btn btn-primary">הוסף</button>
        </div>
      </div>
    `;
   
    var headline = $('<h1 class="text-center display-4">ניהול מלאי</h1>');
    $('body').append(headline);
    $('body').append(table);
  
    // Delete row
    $(document).on('click', '.delete-row', function() {
      $(this).closest('tr').remove();
    });
  
    // Add row
    $('#addRowBtn').click(function() {
      var productName = $('#productNameInput').val();
      var serialNumber = $('#serialNumberInput').val();
      var amount = $('#amountInput').val();
      var amountSold = $('#amountSoldInput').val();
  
      if (productName && serialNumber && amount && amountSold) {
        var newRow = `
          <tr>
            <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
            <td>${amountSold}</td>
            <td>
              <div class="input-group">
                <button class="btn btn-secondary btn-sm decrease-amount">-</button>
                <input type="number" class="form-control text-center" value="${amount}">
                <button class="btn btn-secondary btn-sm increase-amount">+</button>
              </div>
            </td>
            <td>${serialNumber}</td>
            <td>${productName}</td>
          </tr>
        `;
        $('#inventoryTable tbody').append(newRow);
  
        // Clear input fields
        $('#productNameInput').val('');
        $('#serialNumberInput').val('');
        $('#amountInput').val('');
        $('#amountSoldInput').val('');
      } else {
        alert('יש למלא את כל השדות כדי להוסיף פריט חדש.');
      }
    });
  
    // Increase amount
    $(document).on('click', '.increase-amount', function() {
      var input = $(this).siblings('input[type="number"]');
      var currentValue = parseInt(input.val());
      input.val(currentValue + 1);
    });
  
    // Decrease amount
    $(document).on('click', '.decrease-amount', function() {
      var input = $(this).siblings('input[type="number"]');
      var currentValue = parseInt(input.val());
      if (currentValue > 0) {
        input.val(currentValue - 1);
      }
    });
  });
  