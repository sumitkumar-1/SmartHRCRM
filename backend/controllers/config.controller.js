const fs = require('fs');

const updateConfig = async (request, response) => {
    const config = JSON.parse(fs.readFileSync('views/assets/config.json'));
    const newBackendUrl = request.body.backendUrl;
    config.backendUrl = newBackendUrl;
    fs.writeFileSync('views/assets/config.json', JSON.stringify(config, null, 2));
    response.status(200).json({message: 'Config file updated.'});
};

module.exports = {
    updateConfig
};