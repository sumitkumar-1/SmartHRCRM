const bcrypt = require('bcryptjs');
const Interview = require('../models/interview.model');
const { v4: uuidv4 } = require('uuid');

const createInterview = async (request, response) => {
    const { userid, companyname, companylogo, jobdescription, scheduledate, status, venue, mode, starttime, duration, panel } = request.body;
    const interview = new Interview({ id: uuidv4(), userid, companyname, companylogo, jobdescription, scheduledate, status, venue, mode, starttime, duration, panel });
    try {
          interview.save();
          response.status(201).json(interview);
    } catch (err) {
          response.status(400).json({ message: err.message });
    }
};

const getInterviews = async (request, response) => {
  Interview.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getInterviewById = async (request, response) => {
    const { id } = request.params;

    try {
        const interview = await Interview.get(id);
        if (!interview) {
            return response.status(404).json({ message: 'Interview not found' });
        }
        response.json(interview);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteInterview = async (request, response) => {
  const { id } = request.params;

  try {
    const interview = await Interview.get(id);
    interview.delete();
    return response.status(200).json({ message: "Interview deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete interview - " + id });
  }
};

const updateInterview = async (request, response) => {
  const { id } = request.params;
  const updates = {
    userid: request.body.userid,
    companyname: request.body.companyname,
    companylogo: request.body.companylogo,
    jobdescription: request.body.jobdescription,
    scheduledate: request.body.scheduledate,
    status: request.body.status,
    venue: request.body.venue,
    mode: request.body.mode,
    starttime: request.body.starttime,
    duration: request.body.duration,
    panel: request.body.panel
  };

  Interview.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "Interview not found" });
      } else {
        Interview.update(id, updates, (error, interview) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(interview);
          }
        });
      }
    }
  });
};

module.exports = {
    createInterview,
    getInterviews,
    getInterviewById,
    deleteInterview,
    updateInterview
};