$(document).ready(async function () {
  const users = await ajaxRequest('/users', 'GET');
  const items = await ajaxRequest('/item', 'GET');
  const ordersByMonths = await ajaxRequest(`/statistics/orders-gb-months`, 'GET');
  const salesByType = await ajaxRequest(`/statistics/items-gb-types`, 'GET');

  BarChart(salesByType);
  MonthsChart(ordersByMonths);
  TopChart(users, 'numOfOrders', 'username', '#topUsersChart');
  TopChart(items, 'howManySold', 'name', '#topItemsChart');
});
