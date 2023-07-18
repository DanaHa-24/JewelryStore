const TableBar = (tableId, options, url) => {
  return `
    <button id="${tableId}-add-btn" class="btn btn-primary" onclick="addRow('${tableId}')">הוסף</button>
    <div style="display: flex; gap: 1rem">
      <input type="text" class="form-control" id="${tableId}-searchInput" placeholder="חיפוש" />
      <button class="btn btn-primary" type="button" onclick="search('${tableId}', '${url}')">חפש</button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
      <label for="searchBy" style="white-space: nowrap; margin: 0">חיפוש לפי</label>
      <select class="form-control" id="${tableId}-searchBy" name="searchBy">
        ${options.map((opt) => {
          return ` <option value="${opt}">${opt}</option> `;
        })}
      </select>
    </div>
    <button id="clean-btn" class="btn btn-primary"> ניקוי</button>
  `;
};

const search = async (tableId, url) => {
  try {
    const data = await ajaxRequest(url, 'GET');
    const searchBy = $(`#${tableId}-searchBy`).val();
    const searchInput = String($(`#${tableId}-searchInput`).val());
    const res = data.filter((item) => String(item[searchBy]).includes(searchInput));
    const table = tables.find((table) => table.id === tableId);
    $(`#${tableId} tbody`).empty();
    $(`#${table.columnsId}`).empty();
    if (res.length === 0) {
      throw new Error('No matching results found.');
    }
    ManageTable(res, table);
  } catch (error) {
    alert(error.message);
  }
};


function addRow(tableId) {
  // add a new row to the table with empty inputs for each cell except the last one which contains the buttons for update and delete
  const columns = tables.find((table) => table.id === tableId).columns;
  $(`#${tableId} tbody`).append(`
      <tr>
        ${columns.map((key) => `<td><input type="text" class="form-control"></td>`).join('')}
        <td class="text-center" style="white-space: nowrap;">
          <button class="btn btn-success save-btn">שמור</button>
          <button class="btn btn-danger delete-btn">מחק</button>
        </td>
      </tr>
      `);

  // display none the add button
  $(`#${tableId}-add-btn`).css('display', 'none');
}