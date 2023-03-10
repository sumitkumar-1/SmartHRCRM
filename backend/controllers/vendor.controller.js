const Vendor = require('../models/vendor.model');
const { v4: uuidv4 } = require('uuid');

const createVendor = async (request, response) => {
    const { name, logo, primarycontact, status, email, phone, location, address  } = request.body;

    const vendor = new Vendor({ id: uuidv4(), name, logo, primarycontact, status, email, phone, location, address });
    try {
        await vendor.save();
        response.status(201).json(vendor);
    } catch (err) {
        response.status(400).json({ message: err.message });
    }
};

const getVendors = async (request, response) => {
  Vendor.scan().exec((error, results) => {
    if(error) {
      response.status(500).json({ message: "Failed: " + error });
    } else {
      response.json(results);
    }
  });
};

const getVendorById = async (request, response) => {
    const { id } = request.params;

    try {
        const vendor = await Vendor.get(id);
        if (!vendor) {
            return response.status(404).json({ message: 'Vendor not found' });
        }
        response.json(vendor);
    } catch (err) {
        response.status(500).json({ message: err.message });
    }
};

const deleteVendor = async (request, response) => {
  const { id } = request.params;

  try {
    const vendor = await Vendor.get(id);
    vendor.delete();
    return response.status(200).json({ message: "Vendor deleted - " + id });
  } catch (err) {
    response.status(500).json({ message: "Failed to delete vendor - " + id });
  }
};

const updateVendor = async (request, response) => {
  const { id } = request.params;
  const updates = {
    name: request.body.name,
    logo: request.body.logo,
    primarycontact: request.body.primarycontact,
    status: request.body.status,
    email: request.body.email,
    phone: request.body.phone,
    location: request.body.location,
    address: request.body.address
  };

  Vendor.query("id").eq(id).exec((error, results) => {
    if(error) {
      return response.status(400).json({ message: error });
    } else {
      if(results.count == 0) {
        return response.status(404).json({ message: "Vendor not found" });
      } else {
        Vendor.update(id, updates, (error, vendor) => {
          if(error) {
            return response.status(400).json({ message: error });
          }else {
            return response.json(vendor);
          }
        });
      }
    }
  });
};

module.exports = {
    createVendor,
    getVendors,
    getVendorById,
    deleteVendor,
    updateVendor
};