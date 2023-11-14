const Assignment = require('../../models/assignment')
const PeerActivity = require('../../models/peerActivity')
const Log = require('../../models/log')
exports.deleteAssignment = (req, res) => {
  var peerAssignmentId = req.query.peer_assignment_id

  Assignment.findByIdAndDelete(peerAssignmentId, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      console.log("Deleted Peer Assignment")
      let log = new Log()
      log.user_id = result.owner
      log.event_type = 'Deleted_PEER_ASSIGNMENT'
      log.reference_id = peerAssignmentId
      log.description = result.assignment_title
      log.time_stamp = new Date()
      log.save().then(
        (r) => {
          console.log('Saved Log')
        },
        (err) => {
          console.log('ERROR while saving the log!')
        }
      )
    }
  })

  PeerActivity.deleteMany({ peerAssignment_id: peerAssignmentId }, (err, result) => {
    if (err) {
      res.json(err)
    } else {
      res.status(200).json(result)
    }
  })
}
