import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "please fill the title "]
  },
  list: [
    {
      listName: {
        type: String
      },
      finish: {
        type: Boolean,
        default: false
      }
    }
  ],
  taskFor: [{ type: Schema.Types.ObjectId, ref: "Person" }]
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
