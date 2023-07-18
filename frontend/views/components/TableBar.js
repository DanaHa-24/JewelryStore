const TableBar = (tableId, params, table, url) => {
  const buttonsDiv = `
    <button id="${tableId}-add-btn" class="btn btn-primary" onclick="addRow('${tableId}')">הוסף</button>
    <div style="display: flex; gap: 1rem">
      <input type="text" class="form-control" id="${tableId}-searchInput" placeholder="חיפוש" />
      <button class="btn btn-primary" type="button" onclick="search('${tableId}', '${url}')">חפש</button>
    </div>
    <div style="display: flex; gap: 1rem; align-items: center">
      <label for="searchBy" style="white-space: nowrap; margin: 0">חיפוש לפי</label>
      <select class="form-control" id="${tableId}-searchBy" name="searchBy">
        ${params.map((opt) => {
          return ` <option value="${opt}">${opt}</option> `;
        })}
      </select>
    </div>
    <button id="clean-btn" class="btn btn-primary"> ניקוי</button>
  `;

  $(`#${tableId}-buttons`).append(buttonsDiv);
};

const search = async (tableId, url) => {
  const data = await ajaxRequest(url, 'GET');
  // get the value form the searchBy
  const searchBy = $(`#${tableId}-searchBy`).val();
  const searchInput = $(`#${tableId}-searchInput`).val();
  console.log(searchInput, searchBy);
  const res = data.filter((item) => item[searchBy].includes(searchInput));
  const table = tables.find((table) => table.id === tableId);
  $(`#${tableId} tbody`).empty();
  $(`#${table.columnsId}`).empty();
  ManageTable(res, table);
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