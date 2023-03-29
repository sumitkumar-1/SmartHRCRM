const Profile = require('../models/profile.model');
const { v4: uuidv4 } = require('uuid');

const createProfile = async (request, response) => {
    const { userid, firstname, lastname, email, contact, alternatecontact, whatsappcontact, linkedinprofile, skills, totalexp, relevantexp, currentorganization, noticeperiod, currentlocation, prefferedlocation, ctc, ectc, gender, status, cvurl, profileurl, designation } = request.body;
    console.log(request.body);
    const profile = new Profile({ id: uuidv4(), userid, firstname, lastname, email, contact, alternatecontact, whatsappcontact, linkedinprofile, skills, totalexp, relevantexp, currentorganization, noticeperiod, currentlocation, prefferedlocation, ctc, ectc, gender, status, cvurl, profileurl, designation });
    try {
        await profile.save();
        response.status(201).json(profile);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
};

const getProfiles = async (request, response) => {
  Profile.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getProfileById = async (request, response) => {
    const { id } = request.params;

    try {
        const profile = await Profile.get(id);
        if (!profile) {
            return response.status(404).json({ message: 'Profile not found' });
        }
        response.json(profile);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const getProfileByUserId = async (request, response) => {
  const { id } = request.params;

  Profile.query("userid").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "Profile not found" });
      } else {
        return response.status(200).json(results[0]);
      }
    }
  });
};

const deleteProfile = async (request, response) => {
  const { id } = request.params;

  try {
    const profile = await Profile.get(id);
    profile.delete();
    return response.status(200).json({ message: "Profile deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete Profile - " + id });
  }
};

const updateProfile = async (request, response) => {
  const { id } = request.params;
  const updates = {
    userid: request.body.userid,
    firstname: request.body.firstname,
    lastname: request.body.lastname,
    email: request.body.email,
    contact: request.body.contact,
    alternatecontact: request.body.alternatecontact,
    whatsappcontact: request.body.whatsappcontact,
    linkedinprofile: request.body.linkedinprofile,
    skills: request.body.skills,
    totalexp: request.body.totalexp,
    relevantexp: request.body.relevantexp,
    currentorganization: request.body.currentorganization,
    noticeperiod: request.body.noticeperiod,
    currentlocation: request.body.currentlocation,
    prefferedlocation: request.body.prefferedlocation,
    ctc: request.body.ctc,
    ectc: request.body.ectc,
    gender: request.body.gender,
    status: request.body.status,
    cvurl: request.body.cvurl,
    profileurl: request.body.profileurl,
    designation: request.body.designation
  };

  Profile.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "Profile not found" });
      } else {
        Profile.update(id, updates, (error, Profile) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(Profile);
          }
        });
      }
    }
  });
};

module.exports = {
    createProfile,
    getProfiles,
    getProfileById,
    deleteProfile,
    updateProfile,
    getProfileByUserId
};