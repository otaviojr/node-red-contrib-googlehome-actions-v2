const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeIntentNode(config) {
        console.log("GoogleHomeIntentNode");
        console.log(config);

        RED.nodes.createNode(this, config);
        let flowContext = this.context().flow;
        let app = flowContext.get("app");

        this.intent = config.intent;

        this.ask = [];

        this.registerAsk = (ask) => {
          this.ask.push(ask);
        };

        flowContext.set("intent", this);

        //if(app !== undefined){
            this.app.intent(this.intent, conv => {
              this.ask.forEach( (c) => {
                c(conv);
              });
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

    RED.nodes.registerType("googlehome-intent", GoogleHomeIntentNode);
};
