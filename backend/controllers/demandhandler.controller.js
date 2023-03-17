const DemandHandler = require('../models/demandhandler.model');
const { v4: uuidv4 } = require('uuid');

const createDemandHandler = async (request, response) => {
    const { demandid, handlername, operator, processingdate, status } = request.body;

    const demandhandler = new DemandHandler({ id: uuidv4(), demandid, handlername, operator, processingdate, status });
    try {
        await demandhandler.save();
        response.status(201).json(demandhandler);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
};

const getDemandHandlers = async (request, response) => {
  DemandHandler.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getDemandHandlerById = async (request, response) => {
    const { id } = request.params;

    try {
        const demandhandler = await DemandHandler.get(id);
        if (!demandhandler) {
            return response.status(404).json({ message: 'DemandHandler not found' });
        }
        response.json(demandhandler);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteDemandHandler = async (request, response) => {
  const { id } = request.params;

  try {
    const demandhandler = await DemandHandler.get(id);
    demandhandler.delete();
    return response.status(200).json({ message: "DemandHandler deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete demandhandler - " + id });
  }
};

const updateDemandHandler = async (request, response) => {
  const { id } = request.params;
  const updates = {
    demandid: request.body.demandid,
    handlername: request.body.handlername,
    operator: request.body.operator,
    processingdate: request.body.processingdate,
    status: request.body.status
  };

  DemandHandler.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "DemandHandler not found" });
      } else {
        DemandHandler.update(id, updates, (error, demandhandler) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(demandhandler);
          }
        });
      }
    }
  });
};

module.exports = {
    createDemandHandler,
    getDemandHandlers,
    getDemandHandlerById,
    deleteDemandHandler,
    updateDemandHandler
};