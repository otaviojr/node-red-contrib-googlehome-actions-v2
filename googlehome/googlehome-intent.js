const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {

        RED.nodes.createNode(this, config);

        console.log("GoogleHomeIntentNode");
        console.log(config);

    }

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
