const ManageTable = async (data, options) => {
  data.forEach((item) => {
    delete item.__v;
  });
  const columns = options.visibleColumns || Object.keys(data[0]);
  options.columns = columns;
  columns.forEach((column, index) => {
    const header = document.createElement('th');
    header.setAttribute('scope', 'col');
    header.classList.add('text-center');
    header.style.whiteSpace = 'nowrap';
    if (column === '_id') {
      header.innerHTML = `${column}`;
      $(`#${options.columnsId}`).append(header);
      return;
    }
    header.innerHTML = `${column} <span class="sort-icon" data-sorting="asc">▼</span>`;
    $(`#${options.columnsId}`).append(header);
  });

  $(`#${options.columnsId}`).append(`<th>פעולות</th>`);

  data.forEach((item) => {
    const actionCell = `
    ${
      options.pageButton
        ? `<a href="${options.managePage}/${item._id}" class="btn btn-primary">הצגה</a>`
        : `<button id="update-btn-${item._id}" class="btn btn-primary update-btn">עדכן</button>`
    }
    <button id="del-btn-${item._id}" class="btn btn-danger delete-btn">מחק</button>
    `;

    $(`#${options.rowsId}`).append(`
    <tr id="row-${item._id}">
    ${columns
      .map((key) => {
        // if key is in dropdownColumns make it a dropdown menu
        if (options.dropdownColumns) {
          const dropdownColumn = options.dropdownColumns.find((column) => column.name === key);
          if (dropdownColumn) {
            return `<td class="text-center" style="white-space: nowrap;">
            <select class="form-control" id="${key}-${item._id}" name="${key}">
            ${dropdownColumn.options.map((option) => {
              return `<option value="${option}" ${item[key] === option ? 'selected' : ''}>${option}</option>`;
            })}
            </select>
            </td>`;
          }
        }

        return `<td ><p class="tr-p">${item[key]}</p></td>`;
      })
      .join('')}
            <td class="text-center" style="white-space: nowrap;">${actionCell}</td>
          </tr>
        `);
  });
};
