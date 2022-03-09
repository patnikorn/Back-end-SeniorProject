// import moment from 'moment';
// import constants from '../configs/constants'
const moment = require('moment')
const constants = require('../configs/constants')

const Decorator = (item) => {

  if (!item)
    return {}

  return {
    id: item._id,
    complaintFirstName: item.complaintFirstName,
    complaintLastName: item.complaintLastName,
    complaintStudentId: item.complaintStudentId,
    complaintText: item.complaintText,
    // createdAt: moment(user.createdAt).format(constants.DATETIME_FORMAT),
    // updatedAt: moment(user.updatedAt).format(constants.DATETIME_FORMAT),
  }
}

module.exports = { Decorator }
