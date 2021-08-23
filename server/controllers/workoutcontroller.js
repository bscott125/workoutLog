const Express = require('express');
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt")

const { WorkoutModel } = require('../models');

router.get('/practice', validateJWT, (req, res) => {
	res.send('Hey! This is a practice route!')
});

router.post('/create', validateJWT, async (req, res) => {
	const { descriptions, definitions, results } = req.body.workout;
	const { id } = req.user;
	const workoutEntry = {
		descriptions,
		definitions,
		results,
		owner: id
	}
	try {
		const newWorkout = await WorkoutModel.create(workoutEntry);
		res.status(200).json(newWorkout);
	} catch (err) {
		res.status(500).json({ error: err });
	}
	WorkoutModel.create(workoutEntry)

}); 

router.get("/mine", validateJWT, async (req, res) => {
	let { id } = req.user;
	try {
		const userWorkout = await WorkoutModel.findAll({
			where: {
				owner: id
			}
		});
		res.status(200).json(userWorkout)
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

router.put("/update/:entryId", validateJWT, async (req, res) => {
	const { descriptions, definitions, results } = req.body.workout;
	const workoutId = req.params.entryId;
	const userId = req.user.id;

	const query = {
		where: {
			id: workoutId,
			owner: userId
		}
	};

	const updatedWorkout = {
		descriptions: descriptions,
		definitions: definitions,
		results: results
	};

	try {
		const update = await WorkoutModel.update(updatedWorkout, query);
    res.status(200).json(update);
	} catch (err) {
		res.status(500).json({ error: err });
	}
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
	const ownerId = req.user.id;
	const workoutId = req.params.id;

	try {
		const query = {
			where: {
				id: workoutId,
				owner: ownerId
			}
		};

		await WorkoutModel.destroy(query);
		res.status(200).json({ message: "Entry Deleted" });
	} catch (err) {
		res.status(500).json({ error: err });
	}
})

module.exports = router;