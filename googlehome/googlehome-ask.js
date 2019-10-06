const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeAskNode(config) {
        console.log("GoogleHomeAskNode");
        console.log(config);

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;
        let app = flowContext.get("app");
        let intent = flowContext.get("intent");

        this.ask = config.ask;

        //if(app !== undefined){
          intent.registerAsk( (conv) => {
            conv.ask(this.ask);
          });
        //}
        this.on('input', msg => {
            console.debug("GoogleHomeIntentNode - Input Message Received");
            console.log(msg);
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-ask", GoogleHomeAskNode);
};
