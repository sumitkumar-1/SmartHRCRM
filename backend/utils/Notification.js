const AWSHelper = require('./AWSHelper');

function notify(message) {
    AWSHelper.publishNotification(message);
}

module.exports = {
    notify
}