const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeAskNode(config) {
        console.log("GoogleHomeAskNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.ask = config.ask;

        this.on('input', msg => {
            this.debug("GoogleHomeIntentNode - Input Message Received");
            this.log(msg);

            if(msg && msg.topic !== undefined){
              switch(msg.topic){
                case "googlehome-intent":
                  let intent = msg.payload;
                  intent.registerAsk( (conv, params) => {
                    //conv.ask(this.ask);
                    this.send({
                      topic: "conversation",
                      payload: {
                        ask: this.ask,
                        conv: conv
                      }
                    }, false);
                  });
                  break;

                case "ask":
                  this.ask = msg.payload;
                  break;
              }
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-ask", GoogleHomeAskNode);
};
