const ShortListedProfile = require('../models/shortlistedprofile.model');
const { v4: uuidv4 } = require('uuid');

const createShortListedProfile = async (request, response) => {
    const { userid, demandid, companyname, jobdescription, scheduledate, status, venue, mode, duration, panel, operator } = request.body;

    const shortlistedprofile = new ShortListedProfile({ id: uuidv4(), userid, demandid, companyname, jobdescription, scheduledate, status, venue, mode, duration, panel, operator });
    try {
        await shortlistedprofile.save();
        response.status(201).json(shortlistedprofile);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
};

const getShortListedProfiles = async (request, response) => {
  ShortListedProfile.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getShortListedProfileById = async (request, response) => {
    const { id } = request.params;

    try {
        const shortlistedprofile = await ShortListedProfile.get(id);
        if (!shortlistedprofile) {
            return response.status(404).json({ message: 'ShortListedProfile not found' });
        }
        response.json(shortlistedprofile);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteShortListedProfile = async (request, response) => {
  const { id } = request.params;

  try {
    const shortlistedprofile = await ShortListedProfile.get(id);
    shortlistedprofile.delete();
    return response.status(200).json({ message: "ShortListedProfile deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete shortlistedprofile - " + id });
  }
};

const updateShortListedProfile = async (request, response) => {
  const { id } = request.params;
  const updates = {
    userid: request.body.userid,
    demandid: request.body.demandid,
    companyname: request.body.companyname,
    jobdescription: request.body.jobdescription,
    scheduledate: request.body.scheduledate,
    status: request.body.status,
    venue: request.body.venue,
    mode: request.body.mode,
    duration: request.body.duration,
    panel: request.body.panel,
    operator: request.body.operator
  };

  ShortListedProfile.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "ShortListedProfile not found" });
      } else {
        ShortListedProfile.update(id, updates, (error, shortlistedprofile) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(shortlistedprofile);
          }
        });
      }
    }
  });
};

module.exports = {
    createShortListedProfile,
    getShortListedProfiles,
    getShortListedProfileById,
    deleteShortListedProfile,
    updateShortListedProfile
};