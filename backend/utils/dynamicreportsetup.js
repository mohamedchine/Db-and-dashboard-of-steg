const cron = require('node-cron');
const db = require('../config/db');

const setupnewreports = async (setIsBusy) => {
  cron.schedule('0 0 * * *', async () => {
    try {
      setIsBusy(true);
      const [central_ids] = await db.execute("SELECT central_id FROM central");

      for (let { central_id } of central_ids) {
        await db.execute("INSERT INTO report (central_id) VALUES (?)", [central_id]);
      }

      console.log('Daily reports created successfully.');
    } catch (err) {
      console.error('Error setting up daily reports:', err.message);
    } finally {
      setIsBusy(false);
    }
  });
};

module.exports = setupnewreports;
