const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeAskNode(config) {
        console.log("GoogleHomeAskNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.ask = config.ask;

        this.on('input', msg => {
            console.debug("GoogleHomeIntentNode - Input Message Received");
            console.log(msg);

            if(msg && msg.topic == "googlehome-intent"){
                let intent = msg.payload;
                intent.registerAsk( (conv) => {
                  conv.ask(this.ask);
                });
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-ask", GoogleHomeAskNode);
};
