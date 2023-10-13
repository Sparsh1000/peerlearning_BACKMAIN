const Assignment = require('../../models/assignment')
const Log = require('../../models/log')

exports.freezeAssignment = async (req, res) => {
  var peerAssignmentId = req.query.peer_assignment_id

  await Assignment.findById(peerAssignmentId, async (err, result) => {
    if (err) {
      res.json(err)
    } else {
      result.isFreeze = True
      result.save((e, r) => {
        if (e) return res.json(e)
        else {
          let log = new Log()
          log.user_id = result.owner
          log.event_type = 'Freezed_PEER_ASSIGNMENT'
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
          //console.log("HI")
          console.log(r)
          res.json(r)
        }
      })
    }
  }).catch((err) => {
    console.log(err)
  })
}
