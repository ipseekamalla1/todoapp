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
      "Status should be 'To Do','In Progress' or 'Completed'"
    ).isIn(["To Do", "In Progress", "Completed"]),
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

//ROUTE 3 - Update existing Note:  POST- api/notes/updatenote: Login Required

router.put(
  "/edittask/:id",
  fetchuser,

  async (req, res) => {
    //Fetch the body of new edited task and save it in variable
    const { taskName,status } = req.body;

    //Create a newTask object
    const newTask = {};
    if (taskName) {
      newTask.taskName = taskName;
    }
    if (status) {
      newTask.status = status;
    }

    //Fetch the existing task by using ID 
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");//User Not Found
    }
    //Check if it is authorized user
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //Fetch the existing task by using ID and update it
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ task });
  }
);

//ROUTE 4 - Delete existing Task:  POST- api/notes/deletetask: Login Required

router.delete(
  "/deletetask/:id",
  fetchuser,
  async (req, res) => {
  
    //Find the task to be deleted by id 
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");//Task not found
    }

    //Allows deletetion only if user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    
     //Find the task to be deleted by id and delete it 
    task = await Task.findByIdAndDelete(
      req.params.id,
    );
    res.json({ "Success":"Task has been deleted" });
  }
);

 module.exports=router