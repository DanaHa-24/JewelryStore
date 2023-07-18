const Order = require('../models/OrderSchema');

async function groupByOrdersByMonths() {
  const result = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: { $toDate: '$createdAt' } } },
        count: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        month: { $substr: ['$_id', 5, 2] },
        year: { $substr: ['$_id', 0, 4] },
        count: 1,
        totalSales: 1,
      },
    },
    {
      $group: {
        _id: '$year',
        months: {
          $push: {
            month: '$month',
            count: '$count',
            totalSales: '$totalSales',
          },
        },
      },
    },
  ]);

  return result;
}

async function groupByItemsByTypes() {
  const result = await Order.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        totalSales: { $sum: { $multiply: ['$price', '$howManySold'] } },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  return result;
}

module.exports = {
  groupByOrdersByMonths,
  groupByItemsByTypes,
};
