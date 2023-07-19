let tables = [
  {
    id: 'stockTable',
    url: '/item',
    columnsId: 'items-columns',
    rowsId: 'items-rows',
    visibleColumns: [
      '_id',
      'id',
      'name',
      'price',
      'type',
      'color',
      'size',
      'material',
      'style',
      'amountInStock',
      'status',
      'howManySold',
      'createdAt',
    ],
    notEditableColumns: ['_id', 'createdAt', 'amountInStock', 'howManySold'],
    dropdownColumns: [{ name: 'status', options: ['available', 'almost out of stock', 'out of stock'] }],
    pageButton: false,
  },
  {
    id: 'usersTable',
    url: '/users',
    columnsId: 'users-columns',
    rowsId: 'users-rows',
    visibleColumns: ['_id', 'firstName', 'lastName', 'username', 'role'],
    pageButton: true,
    managePage: '/user-manage-page',
  },
  {
    id: 'ordersTable',
    url: '/api/orders',
    columnsId: 'orders-columns',
    rowsId: 'orders-rows',
    visibleColumns: ['_id', 'orderNumber', 'numOfItems', 'totalPrice', 'deliveryMethod', 'state'],
    pageButton: true,
    managePage: '/order-manage-page',
  },
  {
    id: 'branchesTable',
    url: '/storeBranches',
    columnsId: 'branches-columns',
    rowsId: 'branches-rows',
    visibleColumns: ['_id', 'name', 'city', 'street', 'latitude', 'longitude'],
    pageButton: false,
  },
];

$(document).ready(async function () {
  tables.forEach(async (table) => {
    const res = await ajaxRequest(table.url, 'GET');
    //clean the searchBy select button

    const options = table.visibleColumns;
    $(`#${table.id}-buttons`).append(TableBar(table.id, options, table.url));
    ManageTable(res, table);
  });
});

$(document).on('click', '#clean-btn', function () {
  window.location.reload();
});

// Function to delete the row containing the clicked button
$(document).on('click', '.delete-btn', async function () {
  // get the table name and the _id of the row, the _id is the text of input in the first cell
  const tableName = $(this).closest('table').attr('id');
  const _id = $(this).closest('tr').find('td:first-child').text();
  const url = tables.find((table) => table.id === tableName).url;
  const res = await ajaxRequest(url + '/' + _id, 'DELETE');
  if (!res) {
    alert('מחיקה נכשלה');
    return;
  }
  $(this).closest('tr').remove();
  alert('המוצר נמחק בהצלחה');
});

// Function to update the row containing the clicked button
$(document).on('click', '.update-btn', function () {
  // const the table id
  const tableName = $(this).closest('table').attr('id');
  const isEditable = tables.find((table) => table.id === tableName).notEditableColumns;
  // change all the text to input except the isEditable columns

  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const text = $(this).find('p').text();
      const key = $(this).closest('table').find('th').eq($(this).index()).text().slice(0, -2);
      // if the column is in dropdownColumns return
      const dropdownColumn = tables.find((table) => table.id === tableName).dropdownColumns;
      if (dropdownColumn) {
        const dropdown = dropdownColumn.find((column) => column.name === key);
        if (dropdown) return;
      }
      if (isEditable.includes(key)) {
        $(this).html(`<input class="form-control" type="text" value="${text}" disabled>`);
      } else {
        $(this).html(`<input class="form-control" type="text" value="${text}">`);
      }
    });

  // change the button to save button
  $(this).closest('td').html('<button class="btn btn-success save-btn">שמור</button>');
});

// Function to save the row containing the clicked button
$(document).on('click', '.save-btn', async function () {
  const tableName = $(this).closest('table').attr('id');
  const _id = $(this).closest('tr').find('td:first-child input').val();
  const data = {};
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const key = $(this).closest('table').find('th').eq($(this).index()).text().slice(0, -2);
      const dropdownColumn = tables.find((table) => table.id === tableName).dropdownColumns;
      if (dropdownColumn) {
        const dropdown = dropdownColumn.find((column) => column.name === key);
        if (dropdown) {
          data[key] = $(this).find('select').val();
          return;
        }
      }
      const value = $(this).find('input').val();
      if (value.includes(',')) {
        data[key] = value.split(',');
      } else data[key] = value;
    });

  for (const key in data) {
    if (data[key] === '' && key !== '_id') {
      alert(`השדה ${key} ריק`);
      return;
    }
  }

  delete data._id;

  const isNewItem = _id === '';
  const url = tables.find((table) => table.id === tableName).url;

  const res = isNewItem ? await ajaxRequest(url, 'POST', data) : await ajaxRequest(url + '/' + _id, 'PUT', data);

  if (!res) return alert('העדכון נכשל');

  // change all the input to text and add to the first cell the _id of the res
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      // if the column is in dropdownColumns return
      const key = $(this).closest('table').find('th').eq($(this).index()).text().slice(0, -2);
      const dropdownColumn = tables.find((table) => table.id === tableName).dropdownColumns;
      if (dropdownColumn) {
        const dropdown = dropdownColumn.find((column) => column.name === key);
        if (dropdown) return;
      }
      const text = $(this).find('input').val();
      $(this).html(`<p class="tr-p">${text}</p>`);
    });

  if (isNewItem) {
    $(this).closest('tr').find('td:first-child').html(res._id);
  }

  // change the button to update button and add delete button
  $(this)
    .closest('td')
    .html(
      `
      <button class="btn btn-primary update-btn">עדכן</button>
      <button class="btn btn-danger delete-btn">מחק</button>
    `
    );

  $(`#${tableName}-add-btn`).css('display', 'block');

  alert('המוצר נוסף בהצלחה');
});

// Function to 1` the table based on the selected column
$(document).on('click', 'th', function () {
  if ($(this).text() === '_id') return;
  var header = $(this);
  var table = header.closest('table');
  var columnIndex = header.index();
  var sortingOrder = header.data('sorting') || 'asc';

  // Toggle the sorting order
  if (sortingOrder === 'asc') {
    sortingOrder = 'desc';
    header.html(header.html().replace('▼', '▲'));
  } else {
    sortingOrder = 'asc';
    header.html(header.html().replace('▲', '▼'));
  }

  header.data('sorting', sortingOrder);

  // Get the rows except the header
  var rows = table.find('tbody tr').get();

  // Sort the rows based on the column values
  rows.sort(function (row1, row2) {
    var cell1 = $(row1).find('td').eq(columnIndex).text().trim();
    var cell2 = $(row2).find('td').eq(columnIndex).text().trim();
    if (sortingOrder === 'asc') {
      return compare(cell1, cell2);
    } else {
      return compare(cell2, cell1);
    }
  });

  // Remove existing rows from the table body
  table.find('tbody tr').remove();

  // Append the sorted rows back to the table body
  $.each(rows, function (index, row) {
    table.find('tbody').append(row);
  });
});

// Custom compare function for number sorting
function compare(a, b) {
  var numA = parseFloat(a);
  var numB = parseFloat(b);

  // If the values are valid numbers, compare them
  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  // Fallback to string comparison if the values are not valid numbers
  return a.localeCompare(b);
}
