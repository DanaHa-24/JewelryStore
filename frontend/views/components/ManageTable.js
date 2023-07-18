const ManageTable = async (data, options) => {
  data.forEach((item) => {
    delete item.__v;
  });


  const columns = Object.keys(data[0]);
  options.columns = columns;
  columns.forEach((column, index) => {
    const header = document.createElement('th');
    header.setAttribute('scope', 'col');
    header.classList.add('text-center');
    header.style.whiteSpace = 'nowrap';
    header.innerHTML = `${column} <span class="sort-icon" data-sorting="asc">▼</span>`;
    header.addEventListener('click', function() {
      sortTable(this, index);
    });
  
    $(`#${options.columnsId}`).append(header);
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
