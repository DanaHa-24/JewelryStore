const StatisticsService = require('../services/StatisticsService');

async function groupByOrdersByMonths(req, res) {
  try {
    const result = await StatisticsService.groupByOrdersByMonths();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function groupByItemsByTypes(req, res) {
  try {
    const result = await StatisticsService.groupByItemsByTypes();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  groupByOrdersByMonths,
  groupByItemsByTypes,
};
