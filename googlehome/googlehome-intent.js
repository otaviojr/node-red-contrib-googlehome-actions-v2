const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {

        RED.nodes.createNode(this, config);

        console.log("GoogleHomeIntentNode");
        console.log(config);

        this.on('input', msg => {
            console.debug("Input Message Received");
            console.log(msg);

            if(msg && msg.topic === "googlehome-controller"){
              this.app = msg.payload;
              this.send({
                topic: "debug",
                payload: "App object received"
              });
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
