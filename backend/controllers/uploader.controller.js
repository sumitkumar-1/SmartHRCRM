const AWSHelper = require('../utils/AWSHelper');

const uploadFile = async (request, response) => {
    AWSHelper.uploadFile(request)
    .then((url) => {
        response.json({location: url});
    })
    .catch((error) => {
        response.status(500).json({error: error});
    })
}

module.exports = {
    uploadFile
}