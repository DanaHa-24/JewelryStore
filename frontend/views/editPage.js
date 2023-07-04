$(document).ready(function() {
  // Create table
  const table = `
    <div class="container mt-5">
      <table id="inventoryTable" class="table table-striped table-hover text-center">
        <thead>
          <tr>
            <th></th>
            <th>כמות נמכרה</th>
            <th>מספר סידורי</th>
            <th>מחיר</th>
            <th>כמות</th>
            <th>שם המוצר</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
            <td>5</td>
            <td>SN-001</td>
            <td>
              <div class="input-group">
                <input type="number" class="form-control text-center price-input" value="10" min="0">
              </div>
            </td>
            <td>
              <div class="input-group">
                <button class="btn btn-secondary btn-sm decrease-amount">-</button>
                <input type="number" class="form-control text-center amount-input" value="10" min="0">
                <button class="btn btn-secondary btn-sm increase-amount">+</button>
              </div>
            </td>
            <td>מוצר 1</td>
          </tr>
          <tr>
            <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
            <td>2</td>
            <td>SN-002</td>
            <td>
              <div class="input-group">
                <input type="number" class="form-control text-center price-input" value="5" min="0">
              </div>
            </td>
            <td>
              <div class="input-group">
                <button class="btn btn-secondary btn-sm decrease-amount">-</button>
                <input type="number" class="form-control text-center amount-input" value="5" min="0">
                <button class="btn btn-secondary btn-sm increase-amount">+</button>
              </div>
            </td>
            <td>מוצר 2</td>
          </tr>
        </tbody>
      </table>
      <div class="input-group mt-3">
        <input id="amountSoldInput" type="number" class="form-control text-center" placeholder="כמות נמכרה" min="0">
        <input id="serialNumberInput" type="text" class="form-control text-center" placeholder="מספר סידורי">
        <input id="priceInput" type="number" class="form-control text-center" placeholder="מחיר" min="0">
        <input id="amountInput" type="number" class="form-control text-center" placeholder="כמות" min="0">
        <input id="productNameInput" type="text" class="form-control text-center" placeholder="שם המוצר">
        <button id="addRowBtn" class="btn btn-primary">הוסף</button>
      </div>
    </div>
  `;
 
  const headline = $('<h1 class="text-center display-4">ניהול מלאי</h1>');
  $('body').append(headline);
  $('body').append(table);

  // Delete row
  $(document).on('click', '.delete-row', function() {
    $(this).closest('tr').remove();
  });

  // Add row
  $('#addRowBtn').click(function() {
    const productName = $('#productNameInput').val();
    const serialNumber = $('#serialNumberInput').val();
    const amount = $('#amountInput').val();
    const price = $('#priceInput').val();
    const amountSold = $('#amountSoldInput').val();

    if (productName && serialNumber && amount && price && amountSold && amount >= 0 && price >= 0) {
      const newRow = `
        <tr>
          <td><button class="btn btn-danger btn-sm delete-row">מחק</button></td>
          <td>${amountSold}</td>
          <td>${serialNumber}</td>
          <td>
            <div class="input-group">
              <input type="number" class="form-control text-center price-input" value="${price}" min="0">
            </div>
          </td>
          <td>
            <div class="input-group">
              <button class="btn btn-secondary btn-sm decrease-amount">-</button>
              <input type="number" class="form-control text-center amount-input" value="${amount}" min="0">
              <button class="btn btn-secondary btn-sm increase-amount">+</button>
            </div>
          </td>
          <td>${productName}</td>
        </tr>
      `;
      $('#inventoryTable tbody').append(newRow);

      // Clear input fields
      $('#productNameInput').val('');
      $('#serialNumberInput').val('');
      $('#amountInput').val('');
      $('#priceInput').val('');
      $('#amountSoldInput').val('');
    } else {
      alert('יש למלא את כל השדות ולהזין מספרים לא שליליים כדי להוסיף פריט חדש.');
    }
  });

  // Increase amount
  $(document).on('click', '.increase-amount', function() {
    const input = $(this).siblings('input.amount-input');
    let currentValue = parseInt(input.val());
    input.val(currentValue + 1);
  });

  // Decrease amount
  $(document).on('click', '.decrease-amount', function() {
    const input = $(this).siblings('input.amount-input');
    let currentValue = parseInt(input.val());
    if (currentValue > 0) {
      input.val(currentValue - 1);
    }
  });
});
