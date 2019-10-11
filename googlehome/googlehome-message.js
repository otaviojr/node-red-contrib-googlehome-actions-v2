const Promise = require('promise');

const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
  LinkOutSuggestion,
  HtmlResponse,
  OpenUrlAction,
  BrowseCarousel,
  Permission
} = require('actions-on-google');

module.exports = function(RED) {

    function GoogleHomeMessageNode(config) {
        console.log("GoogleHomeMessageNode");
        console.log(config);

        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.messageType = config.message_type;

        this.on('input', msg => {
            this.debug("GoogleHomeMessageNode - Input Message Received");
            this.log(msg);
        });

        this.on('close', () => {
            console.debug("Closed");
        });
    }

    RED.nodes.registerType("googlehome-message", GoogleHomeMessageNode);
};
