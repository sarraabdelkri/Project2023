//Expertise Back
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
    expireToken: String,
    role: {
      type: String,
      enum: ["student", "instructor", "admin", "employer"],
      default: "student",
    },
    company: {
      type: String,
      required: false,
    },
    websitecompany: {
      type: String,
      required: false,
    },
    linkedinUrl: {
      type: String,
      required: false,
    },
    employerRequest: {
      type: Boolean,
      default: false,
      required: false,
    },
    skills: [String],
    enrolledcourses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "course",
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    postedCourses: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "course",
        },
      },
    ],
    profilePicture: { type: String },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    likedAssessments: {
      type: Array,
      default: [],
    },
    contract: [
      {
        type: Schema.Types.ObjectId,
        ref: "Contract",
      },
    ],

    notifications: [
      {
        notification: {
          type: Schema.Types.ObjectId,
          ref: "Notification",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
