const { getallactivitylogsforcentral } = require("../../model/activitylogs");

const getallactivitiesCtrl = async (req, res) => {
    try {
      const { centralid } = req.params;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      
      const result = await getallactivitylogsforcentral(centralid, page, limit);
      
      res.status(200).json({
        success: true,
        data: result.activities
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching activities'
      });
    }
  };
  
  module.exports = { getallactivitiesCtrl };