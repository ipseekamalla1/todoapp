const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Task = require("../models/Tasks");
const { body, validationResult } = require("express-validator");

//ROUTE 2 - Add a new Note:  POST- api/notes/addnote: Login Required

router.post(
  "/addtask",
  fetchuser,
  [
    body("taskName", "Enter a title").isLength({ min: 3 }),
    body(
      "status",
      "Status should be 'To do','In Progress' or 'Completed'"
    ).isIn(["To do", "In Progress", "Completed"]),
  ],
  async (req, res) => {
    try {
      const { taskName, status } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const task = new Task({
        taskName,
        status,
        user: req.user.id,
      });

      const savedTasks = await task.save();

      res.json(savedTasks);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);
 module.exports=router