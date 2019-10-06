const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {
        console.log("GoogleHomeIntentNode");
        console.log(config);

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;
        const app = flowContext.get("app");

        if(app && app !== undefined){
            this.send({
              topic: "debug",
              payload: "Habemos app"
            });
        }

        this.on('input', msg => {
            console.debug("GoogleHomeIntentNode - Input Message Received");
            console.log(msg);
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
