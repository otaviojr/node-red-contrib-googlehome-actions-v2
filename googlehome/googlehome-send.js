const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeSendNode(config) {
        console.log("GoogleHomeSendNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.close = config.close;

        this.on('input', msg => {
            this.debug("GoogleHomeSendNode - Input Message Received");
            this.log(msg);

            if(msg && msg.conversation !== undefined){

              this.conversation.messages.forEach( (m) => {
                this.conversation.conv.ask(m);
              });
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-send", GoogleHomeSendNode);
};
