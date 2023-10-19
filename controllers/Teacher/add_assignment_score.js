const axios = require('axios')
const AssignmentScore = require('../../models/assignment_score')

exports.addAssignmentScore = async (req, res) => {
    // var assignment_score = req.body;
    // AssignmentScore.create(assignment_score, function(er, data) {
    //     if(er) {
    //         console.log(er);
    //     }
    //     else {
    //         res.status(200).json(data);
    //     }

    // })
    let assignment_score = new AssignmentScore()
    assignment_score.User_id = req.body.User_id;
    assignment_score.Assignment_id = req.body.Assignment_id;
    assignment_score.final_grade = req.body.final_grade;
    await assignment_score.save().then(
        (as) => {
            console.log("Score Saved")
            return res.json(as)
        },
        (err) => {
            return res.json(err)
        }
    )
}