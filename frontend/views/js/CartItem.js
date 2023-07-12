const CartItem = async (item) => {
    return `
      <tr>
        <td>${item.name}</td>
        <td>
          <img src="${item.image}" alt="${item.name}" style="width: 5rem" />
        </td>
        <td>${item.price}₪</td>
        <td>
          <div class="input-group">
            <span class="input-group-btn">
              <button type="button" id="minus-btn-${item._id}" class="btn btn-outline-secondary minus-btn">-</button>
            </span>
            <input type="number" class="form-control" value=${item.quantity} />
            <span class="input-group-btn">
              <button type="button" id="plus-btn-${item._id}" class="btn btn-outline-secondary plus-btn">+</button>
            </span>
          </div>
        </td>
        <td id="total-to-pay">${item.quantity * item.price}₪</td>
      </tr>
    `;
  };
  