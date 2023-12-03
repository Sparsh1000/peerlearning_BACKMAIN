// const axios = require('axios')
// const AssignmentScore = require('../../models/assignment_score')

// exports.addAssignmentScore = async (req, res) => {

//     let assignment_score = new AssignmentScore()
//     assignment_score.User_id = req.body.User_id;
//     assignment_score.Assignment_id = req.body.Assignment_id;
//     assignment_score.final_grade = req.body.final_grade;
//     await assignment_score.save().then(
//         (as) => {
//             console.log("Score Saved")
//             return res.json(as)
//         },
//         (err) => {
//             return res.json(err)
//         }
//     )
// }

// const axios = require('axios');
// const AssignmentScore = require('../../models/assignment_score');

// exports.addAssignmentScore = async (req, res) => {
//     const { User_id, Assignment_id, final_grade } = req.body;

//     // Search for an existing assignment score with the same Assignment_id and User_id
//     const existingScore = await AssignmentScore.findOne({ User_id, Assignment_id });

//     if (existingScore) {
//         // If an existing score is found, update it
//         existingScore.final_grade = final_grade;
//         await existingScore.save()
//             .then((as) => {
//                 console.log("Score Updated");
//                 return res.json(as);
//             })
//             .catch((err) => {
//                 return res.status(500).json(err);
//             });
//     } else {
//         // If no existing score is found, create a new one
//         const newScore = new AssignmentScore({
//             User_id,
//             Assignment_id,
//             final_grade
//         });

//         await newScore.save()
//             .then((as) => {
//                 console.log("Score Saved");
//                 return res.json(as);
//             })
//             .catch((err) => {
//                 return res.status(500).json(err);
//             });
//     }
// };
const axios = require('axios');
const AssignmentScore = require('../../models/assignment_score');

exports.addAssignmentScore = async (req, res) => {
    const { User_id, Assignment_id, final_grade } = req.body;

    const existingScore = await AssignmentScore.findOne({ User_id, Assignment_id });

    //   console.log("existingScore");
    //   console.log(existingScore);

    if (existingScore) {
        // Update the existing AssignmentScore
        existingScore.final_grade = final_grade;

        try {
            const updatedScore = await existingScore.save();
            //console.log("updatedScore");
            //   console.log(updatedScore);
            return res.status(200).json(updatedScore);
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {

        //console.log("Score");

        const newScore = new AssignmentScore({
            User_id,
            Assignment_id,
            final_grade,
        });

        try {
            const savedScore = await newScore.save();
            return res.status(201).json(savedScore);
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};
