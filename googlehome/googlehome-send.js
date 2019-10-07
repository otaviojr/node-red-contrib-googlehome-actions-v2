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

            if(msg && msg.gh_conversation !== undefined){

              if(msg.gh_messages && msg.gh_messages.length > 0){
                msg.gh_messages.forEach( (m, idx) => {
                  msg.gh_conversation.conv.ask(m);
                });                
              }

              if(this.closeConversation){
                msg.gh_conversation.conv.close(this.closeMessage);
              }
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-send", GoogleHomeSendNode);
};
