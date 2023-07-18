const CartItem = async (item) => {
  return `
    <tr id="cart-item-${item._id}">
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
          <input type="text" class="form-control" value=${item.quantity} id="quantity-${item._id}"/>
          <span class="input-group-btn">
            <button type="button" id="plus-btn-${item._id}" class="btn btn-outline-secondary plus-btn">+</button>
          </span>
        </div>
      </td>
      <td id="total-to-pay-${item._id}">${item.quantity * item.price}₪</td>
    </tr>
  `;
};
