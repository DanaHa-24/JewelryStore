const ManageTable = async (data, options) => {
  data.forEach((item) => {
    delete item.__v;
  });

  console.log(data);

  const columns = Object.keys(data[0]);
  options.columns = columns;
  columns.forEach((column, index) => {
    $(`#${options.columnsId}`).append(`
    <th scope="col" onclick="sortTable(this, ${index})" class="text-center" style="white-space: nowrap;">${column} ▼</th>
    `);
  });

  $(`#${options.columnsId}`).append(`<th>פעולות</th>`);

  data.forEach((item) => {
    const actionCell = `
    <button id="del-btn-${item._id}" class="btn btn-danger delete-btn">מחק</button>
    <button id="update-btn-${item._id}" class="btn btn-primary update-btn">עדכן</button>`;

    //the values will be inside a <p> tag inside the <td> tag
    $(`#${options.rowsId}`).append(`
    <tr id="row-${item._id}">
        ${columns.map((key) => `<td ><p class="tr-p">${item[key]}</p></td>`).join('')}
            <td class="text-center" style="white-space: nowrap;">${actionCell}</td>
          </tr>
        `);
  });
};
