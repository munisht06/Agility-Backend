const asyncHandler = require("express-async-handler");
const Meeting = require("../models/meetingModels");

// @desc Get all meetings
// @route GET /api/meetings
// @access Private
const getMeeting = asyncHandler(async (req, res) => {
  const meetings = await Meeting.find({ user: req.user.id });
  res.json(meetings);
});

// @desc Create a meeting
// @route POST /api/meetings
// @access Private
const createMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.create({
    ...req.body,
    creator: req.user.id,
  });

  res.status(200).json(meeting);
});

// @desc Update a meeting
// @route PUT /api/meetings/:id
// @access Private
const updateMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    res.status(404);
    throw new Error("Meeting not found");
  }

  //check if user is meeting owner
  if (meeting.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedMeeting = await Meeting.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedMeeting);
});

// @desc Delete a meeting
// @route DELETE /api/meetings/:id
// @access Private
const deleteMeeting = asyncHandler(async (req, res) => {
  const meeting = await Meeting.findById(req.params.id);
  if (!meeting) {
    res.status(404);
    throw new Error("Meeting not found");
  }

  //check if user is meeting owner
  if (meeting.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await meeting.remove();
  res.status(200).json({ id: req.params.id, message: `Meeting deleted` });
});

module.exports = {
  getMeeting,
  createMeeting,
  updateMeeting,
  deleteMeeting,
};
