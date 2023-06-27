$(document).ready(function() {
  const createTableRow = function(data) {
    const row = document.createElement('tr');
    data.forEach(function(cellText, index) {
      const cell = document.createElement('td');
      if (index === 0) {
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'delete-row');
        deleteBtn.textContent = 'מחק';
        cell.appendChild(deleteBtn);
      } else if (index === 4) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');
        const decreaseBtn = document.createElement('button');
        decreaseBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'decrease-amount');
        decreaseBtn.textContent = '-';
        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.classList.add('form-control', 'text-center', 'amount-input');
        amountInput.value = cellText;
        amountInput.min = '0';
        const increaseBtn = document.createElement('button');
        increaseBtn.classList.add('btn', 'btn-secondary', 'btn-sm', 'increase-amount');
        increaseBtn.textContent = '+';
        inputGroup.appendChild(decreaseBtn);
        inputGroup.appendChild(amountInput);
        inputGroup.appendChild(increaseBtn);
        cell.appendChild(inputGroup);
      } else if (index === 3) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');
        const priceInput = document.createElement('input');
        priceInput.type = 'number';
        priceInput.classList.add('form-control', 'text-center', 'price-input');
        priceInput.value = cellText;
        priceInput.min = '0';
        inputGroup.appendChild(priceInput);
        cell.appendChild(inputGroup);
      } else {
        cell.textContent = cellText;
      }
      row.appendChild(cell);
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
