const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Algorithms and Data Structures",
        "Artificial Intelligence",
        "Computer Architecture",
        "Computer Graphics",
        "Computer Networks",
        "Computer Security and Cryptography",
        "Computer Systems and Operating Systems",
        "Database Systems",
        "Human-Computer Interaction",
        "Machine Learning",
        "Programming Languages",
        "Software Engineering",
        "Web Development",
      ],
    },
    duration: {
      type: String,
      required: true,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    enrollment: {
      type: Number,
      default: 0,
      required: true,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    enrolledStudents: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "session",
      },
    ],
    content: {
      data: Buffer,
      contentType: String,
      fileName: String,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

courseSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("course", courseSchema);
