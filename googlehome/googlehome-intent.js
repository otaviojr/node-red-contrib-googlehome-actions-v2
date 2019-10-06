const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {
        console.log("GoogleHomeIntentNode");
        console.log(config);

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;
        const app = flowContext.get("app");

        this.intent = config.intent;

        if(app && app !== undefined){
            this.app.intent(this.intent, conv => {
              this.send({
                topic: "intent",
                payload: {
                  conv: conv
                }
              }, false);
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
