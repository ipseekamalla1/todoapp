const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Task = require("../models/Tasks");
const { body, validationResult } = require("express-validator");


//ROUTE 1 - Get all Tasks:  GET- api/notes/displaytasks: Login Required

router.get("/displaytasks", fetchuser, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });//Find the users task and save all in tasks
  res.json(tasks);//Print all the tasks
});



//ROUTE 2 - Add a new Task:  POST- api/tasks/addtask: Login Required
router.post(
  "/addtask",
  fetchuser,
  [
    //Write in the body for all variables
    body("taskName", "Enter a title").isLength({ min: 3 }),
    body(
      "status",
      "Status should be 'To do','In Progress' or 'Completed'"
    ).isIn(["To do", "In Progress", "Completed"]),
  ],

  async (req, res) => {
    try {
      //Add the body in variables
      const { taskName, status } = req.body;

      //Display validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      //Fetch Task Details from body
      const task = new Task({
        taskName,
        status,
        user: req.user.id,
      });

      //Save the task and display
      const savedTasks = await task.save();
      res.json(savedTasks);

      //Extra error message
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
 module.exports=router