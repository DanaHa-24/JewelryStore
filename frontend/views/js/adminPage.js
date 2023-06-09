let tables = [
  {
    id: 'stockTable',
    url: '/item',
    columnsId: 'items-columns',
    rowsId: 'items-rows',
  },
  {
    id: 'usersTable',
    url: '/users',
    columnsId: 'users-columns',
    rowsId: 'users-rows',
  },
  {
    id: 'ordersTable',
    url: '/api/orders',
    columnsId: 'orders-columns',
    rowsId: 'orders-rows',
  },
  {
    id: 'branchesTable',
    url: '/storeBranches',
    columnsId: 'branches-columns',
    rowsId: 'branches-rows',
  },
];

$(document).ready(async function () {
  tables.forEach(async (table) => {
    const res = await ajaxRequest(table.url, 'GET');
    //clean the searchBy select button

    const options = Object.keys(res[0]);
    $(`#${table.id}-buttons`).append(TableBar(table.id, options, table.url));
    ManageTable(res, table);
  });
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
  // change all the text to input
  $(this)
    .closest('tr')
    .find('td:not(:last-child)')
    .each(function () {
      const text = $(this).text();
      $(this).html(`<input type="text" class="form-control" value="${text}">`);
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
      const value = $(this).find('input').val();
      data[key] = value;
    });

  delete data._id;

  const isNewItem = _id === '';
  const url = tables.find((table) => table.id === tableName).url;

  const res = isNewItem ? await ajaxRequest(url, 'POST', data) : await ajaxRequest(url + '/' + _id, 'PUT', data);

  if (!res) return alert('העדכון נכשל');

  delete res.__v;

  const actionCell = `
              <button class="btn btn-danger delete-btn">מחק</button>
              <button class="btn btn-primary update-btn">עדכן</button>`;
  $(this).closest('tr').html(`
        ${Object.values(res)
          .map((value) => `<td class="text-center">${value}</td>`)
          .join('')}
        <td class="text-center">${actionCell}</td>
        `);

  alert('המוצר נוסף בהצלחה');
});

// Function to sort the table based on the selected column
$(document).on('click', 'th', function () {
  var $header = $(this);
  var $table = $header.closest('table');
  var columnIndex = $header.index();
  var sortingOrder = $header.data('sorting') || 'asc';

  // Toggle the sorting order
  if (sortingOrder === 'asc') {
    sortingOrder = 'desc';
    $header.html($header.html().replace('▼', '▲'));
  } else {
    sortingOrder = 'asc';
    $header.html($header.html().replace('▲', '▼'));
  }

  $header.data('sorting', sortingOrder);

  // Get the rows except the header
  var $rows = $table.find('tbody tr').get();

  // Sort the rows based on the column values
  $rows.sort(function (row1, row2) {
    var cell1 = $(row1).find('td').eq(columnIndex).text().trim();
    var cell2 = $(row2).find('td').eq(columnIndex).text().trim();

    if (sortingOrder === 'asc') {
      return cell1.localeCompare(cell2);
    } else {
      return cell2.localeCompare(cell1);
    }
  });

  // Remove existing rows from the table body
  $table.find('tbody tr').remove();

  // Append the sorted rows back to the table body
  $.each($rows, function (index, row) {
    $table.find('tbody').append(row);
  });
});
