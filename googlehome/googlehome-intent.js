const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {
        console.log("GoogleHomeIntentNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.intent = config.intent;

        this.ask = [];

        this.registerAsk = (ask) => {
          this.ask.push(ask);
        };

        this.on('nodes-started', msg => {
          this.send({
            topic: "googlehome-intent",
            payload: this
          }, false);
        });

        this.on('input', msg => {
            console.debug("GoogleHomeIntentNode - Input Message Received");
            console.log(msg);

            if(msg && msg.topic == "googlehome-controller"){
                let app = msg.payload.getApp();
                this.app.intent(this.intent, conv => {
                  this.ask.forEach( (c) => {
                    c(conv);
                  });
                });
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
