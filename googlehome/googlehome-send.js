const Promise = require('promise');

module.exports = function(RED) {

    function GoogleHomeSendNode(config) {
        console.log("GoogleHomeSendNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.closeConversation = config.close_conversation;
        this.closeMessage = config.close_message;

        this.on('input', msg => {
            this.debug("GoogleHomeSendNode - Input Message Received");
            this.log(msg);

            if(msg && msg.res !== undefined && msg.res.conv !== undefined){

              if(msg.gh_messages && msg.gh_messages.length > 0){
                msg.gh_messages.forEach( (m, idx) => {
                  msg.res.conv.ask(m);
                });
              }

              if(this.closeConversation){
                msg.res.conv.close(this.closeMessage);
              }
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-send", GoogleHomeSendNode);
};
