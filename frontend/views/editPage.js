$(document).ready(function() {
  const createTableRow = function(data) {
    const row = $('<tr></tr>');
    data.forEach(function(cellText, index) {
      const cell = $('<td></td>');
      if (index === 0) {
        const deleteBtn = $('<button></button>').addClass('btn btn-danger btn-sm delete-row').text('מחק');
        cell.append(deleteBtn);
      } else if (index === 4) {
        const inputGroup = $('<div></div>').addClass('input-group');
        const decreaseBtn = $('<button></button>').addClass('btn btn-secondary btn-sm decrease-amount').text('-');
        const amountInput = $('<input>').attr({
          type: 'number',
          class: 'form-control text-center amount-input',
          value: cellText,
          min: '0'
        });
        const increaseBtn = $('<button></button>').addClass('btn btn-secondary btn-sm increase-amount').text('+');
        inputGroup.append(decreaseBtn, amountInput, increaseBtn);
        cell.append(inputGroup);
      } else if (index === 3) {
        const inputGroup = $('<div></div>').addClass('input-group');
        const priceInput = $('<input>').attr({
          type: 'number',
          class: 'form-control text-center price-input',
          value: cellText,
          min: '0'
        });
        inputGroup.append(priceInput);
        cell.append(inputGroup);
      } else {
        cell.text(cellText);
      }
      row.append(cell);
    });
    return row;
  };

  const table = $('<div class="container mt-5"></div>').append(
    $('<table id="inventoryTable" class="table table-striped table-hover text-center"></table>').append(
      $('<thead></thead>').append(
        $('<tr></tr>').append(
          $('<th></th>'),
          $('<th>כמות נמכרה</th>'),
          $('<th>מספר סידורי</th>'),
          $('<th>מחיר</th>'),
          $('<th>כמות</th>'),
          $('<th>שם המוצר</th>')
        )
      ),
      $('<tbody></tbody>').append(
        createTableRow(['', '5', 'SN-001', '10', '10', 'מוצר 1']),
        createTableRow(['', '2', 'SN-002', '5', '5', 'מוצר 2'])
      )
    ),
    $('<div class="input-group mt-3"></div>').append(
      $('<input id="amountSoldInput" type="number" class="form-control text-center" placeholder="כמות נמכרה" min="0">'),
      $('<input id="serialNumberInput" type="text" class="form-control text-center" placeholder="מספר סידורי">'),
      $('<input id="priceInput" type="number" class="form-control text-center" placeholder="מחיר" min="0">'),
      $('<input id="amountInput" type="number" class="form-control text-center" placeholder="כמות" min="0">'),
      $('<input id="productNameInput" type="text" class="form-control text-center" placeholder="שם המוצר">'),
      $('<button id="addRowBtn" class="btn btn-primary">הוסף</button>')
    )
  );

  const headline = $('<h1 class="text-center display-4">ניהול מלאי</h1>');
  $('body').append(headline);
  $('body').append(table);

  $(document).on('click', '.delete-row', function() {
    $(this).closest('tr').remove();
  });

  $('#addRowBtn').click(function() {
    const productName = $('#productNameInput').val();
    const serialNumber = $('#serialNumberInput').val();
    const amount = $('#amountInput').val();
    const price = $('#priceInput').val();
    const amountSold = $('#amountSoldInput').val();

    if (productName && serialNumber && amount && price && amountSold && amount >= 0 && price >= 0) {
      const newRow = createTableRow(['', amountSold, serialNumber, price, amount, productName]);
      $('#inventoryTable tbody').append(newRow);

      $('#productNameInput').val('');
      $('#serialNumberInput').val('');
      $('#amountInput').val('');
      $('#priceInput').val('');
      $('#amountSoldInput').val('');
    } else {
      alert('יש למלא את כל השדות ולהזין מספרים לא שליליים כדי להוסיף פריט חדש.');
    }
  });

  $(document).on('click', '.increase-amount', function() {
    const input = $(this).siblings('input.amount-input');
    let currentValue = parseInt(input.val());
    input.val(currentValue + 1);
  });

  $(document).on('click', '.decrease-amount', function() {
    const input = $(this).siblings('input.amount-input');
    let currentValue = parseInt(input.val());
    if (currentValue > 0) {
      input.val(currentValue - 1);
    }
  });
});