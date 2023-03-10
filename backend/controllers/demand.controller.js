const Demand = require('../models/demand.model');
const { v4: uuidv4 } = require('uuid');

const createDemand = async (request, response) => {
    const { description, level, qualification, contact, position, skills, yearofexpfrom, yearofexpto, worklocation, workmode, maxnoticeperiod, minnoticeperiod, minsalary, maxsalary, startdate, enddate } = request.body;

    const demand = new Demand({ id: uuidv4(), description, level, qualification, contact, position, skills, yearofexpfrom, yearofexpto, worklocation, workmode, maxnoticeperiod, minnoticeperiod, minsalary, maxsalary, startdate, enddate });
    try {
        await demand.save();
        response.status(201).json(demand);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
};

const getDemands = async (request, response) => {
  Demand.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getDemandById = async (request, response) => {
    const { id } = request.params;

    try {
        const demand = await Demand.get(id);
        if (!demand) {
            return response.status(404).json({ message: 'Demand not found' });
        }
        response.json(demand);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteDemand = async (request, response) => {
  const { id } = request.params;

  try {
    const demand = await Demand.get(id);
    demand.delete();
    return response.status(200).json({ message: "Demand deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete demand - " + id });
  }
};

const updateDemand = async (request, response) => {
  const { id } = request.params;
  const updates = {
    description: request.body.description,
    level: request.body.level,
    qualification: request.body.qualification,
    contact: request.body.contact,
    position: request.body.position,
    skills: request.body.skills,
    yearofexpfrom: request.body.yearofexpfrom,
    yearofexpto: request.body.yearofexpto,
    worklocation: request.body.worklocation,
    workmode: request.body.workmode,
    maxnoticeperiod: request.body.maxnoticeperiod,
    minnoticeperiod: request.body.minnoticeperiod,
    minsalary: request.body.minsalary,
    maxsalary: request.body.maxsalary,
    startdate: request.body.startdate,
    enddate: request.body.enddate
  };

  Demand.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "Demand not found" });
      } else {
        Demand.update(id, updates, (error, demand) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(demand);
          }
        });
      }
    }
  });
};

module.exports = {
    createDemand,
    getDemands,
    getDemandById,
    deleteDemand,
    updateDemand
};