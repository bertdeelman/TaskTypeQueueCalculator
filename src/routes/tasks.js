const express = require("express");
const router = express.Router();
const taskData = require("../data/taskData.json");

// Endpoint to get all tasks
router.get("/", (req, res) => {
    res.json(taskData);
});

// Endpoint to update tasks with new inputs
router.post("/calculate", (req, res) => {
    const { TaskTypes, ExpectedDistribution, BinsAvailable } = req.body;

    // Perform calculations based on new inputs
    const AvgTaskPerGroup = ExpectedDistribution * 2; // Example logic
    const TaskGroups = BinsAvailable / AvgTaskPerGroup;
    const MaxTaskGroup = TaskGroups * 1.5; // Example logic

    res.json({
        TaskTypes,
        ExpectedDistribution,
        BinsAvailable,
        AvgTaskPerGroup,
        TaskGroups,
        MaxTaskGroup,
    });
});

module.exports = router;
