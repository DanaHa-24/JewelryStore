$(document).ready(() => {
  $.ajax({
    url: 'http://localhost:5000/addresses',
    type: 'GET',
    success: (data) => {
      console.log(data);
      const addressesList = document.getElementById('addresses');
      data.forEach((address) => {
        const li = document.createElement('li');
        li.textContent = address.city + ', ' + address.street + ' ' + address.houseNum;
        addressesList.appendChild(li);
      });
    },
  });
});
