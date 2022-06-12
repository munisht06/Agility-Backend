const { default: mongoose } = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: 5,
      maxlength: 255,
    },
    creator:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: 5,
      maxlength: 255,
    },
    date: {
      type: Date,
      // required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      minlength: 5,
      maxlength: 255,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      minlength: 5,
      maxlength: 255,
    },
  },
  // creates updatedAt and createdAt fields automatically in the database
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);
