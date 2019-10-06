const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeAskNode(config) {
        console.log("GoogleHomeAskNode");
        console.log(config);

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;
        const app = flowContext.get("app");

        this.ask = config.ask;

        this.on('input', msg => {
            console.debug("GoogleHomeIntentNode - Input Message Received");
            console.log(msg);

            if(msg && msg.topic === "intent"){
              let conv = msg.payload.conv;
              conv.ask(this.ask);
              this.send(msg, false);
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-ask", GoogleHomeAskNode);
};
