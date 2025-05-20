const modificationRouter = require('express').Router();
const {verifyCentralEmployee, verifygroupementemployee, verifymodificationismeantforhim} = require('../middleware/verifyToken');
const {requestmodificationCtrl, getAllModificationRequestsCtrl,acceptModificationRequestCtrl} = require('../controllers/modificationCtrl');
const { validatemodificationid } = require('../middleware/central');

modificationRouter.route('/request-modification').post(verifyCentralEmployee ,requestmodificationCtrl );
modificationRouter.route('/get-all-modification-requests').get(verifygroupementemployee ,getAllModificationRequestsCtrl);
modificationRouter.route('/accept-mdfication-request/:id').post( verifygroupementemployee , validatemodificationid,verifymodificationismeantforhim,acceptModificationRequestCtrl);
module.exports = modificationRouter;