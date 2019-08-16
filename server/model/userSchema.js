import mongoose from "mongoose";
import { hashingPassword } from "../helper/handlePassword.js";
const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "email already exist"],
      required: [true, "please fill your username"],
      validate: {
        validator: function(v) {
          let input = v.toLowerCase();
          let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return rgx.test(v);
        },
        message: "please use valid email"
      },
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "please fill your email address"],
      validate: {
        validator: function(v) {
          if (v.length < 7) {
            return false;
          }
        },
        message: "please fill password more than 6 characters"
      }
    },
    name: {
      type: String,
      required: [true, "please fill your name"],
      validate: {
        validator: function(v) {
          if (v.length < 3) {
            return false;
          }
          let rgx = /[!@#$%^&*()_+{}\[\]:;'"\/\\?><.,1234567890]/;
          if (rgx.test(v)) {
            return false;
          }
        },
        message:
          "please fill your name more than 3 characters and not include any symbols"
      }
    },
    role: {
      type: String,
      enum: ["employee", "manager"],
      default: "employee"
    },
    task: [{ type: Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

personSchema.pre("save", function(next) {
  let user = this;
  hashingPassword(user)
    .then(response => {
      user.password = response;
      next();
    })
    .catch(err => next(err));
});

personSchema.pre("save", function(next) {
  let dateNow = new Date();
  this.update_at = dateNow;
  if (!this.created_at) {
    this.created_at = dateNow;
  }
  next();
});

const Person = mongoose.model("Person", personSchema);

export default Person;
