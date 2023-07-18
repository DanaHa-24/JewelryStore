const CronJob = require('node-cron');
const axios = require('axios');
const Currency = require('../models/CurrencySchema.js');
require('dotenv').config();

// Fetch the latest currency exchange rates from the Apilayer Fixer API
// This function is scheduled using the CronJob library
module.exports = () => {
  // The job runs at the first day of every month to update the currency rate
  const scheduledJobFunction = CronJob.schedule('0 0 1 * *', async () => {
    try {
      let ratios = await axios.get(
        `https://api.apilayer.com/fixer/latest?base=ILS&apikey=${process.env.FIXER_API_KEY}`
      );
      // if the API request is successful, the existing currency data in DB is cleared
      await Currency.deleteMany({});
      await Currency.insertMany(ratios?.data?.rates);
      console.log('Currency update successfully!');
    } catch (e) {
      console.error(`Currency updated failed!\n${e}`);
    }
  });
  scheduledJobFunction.start();
};
