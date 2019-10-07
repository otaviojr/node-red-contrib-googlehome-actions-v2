const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {
        console.log("GoogleHomeIntentNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.intent = config.intent;

        this.ask = [];

        this.registerAsk = (ask) => {
          this.ask.push(ask);
        };

        this.on('input', msg => {
            this.debug("GoogleHomeIntentNode - Input Message Received");
            this.log(msg);

            if(msg && msg.topic == "googlehome-controller"){
                this.app = msg.payload.getApp();
                this.app.intent(this.intent, conv => {
                  return new Promise( (resolv, reject) => {
                    const params = arguments;
                    this.ask.forEach( (c) => {
                      c(conv, params, resolv, reject);
                    });
                  });
                });

                this.send({
                  topic: "googlehome-intent",
                  payload: this
                }, false);
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
