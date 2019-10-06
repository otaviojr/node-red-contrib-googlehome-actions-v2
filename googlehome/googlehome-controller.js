const Promise = require('promise');
const {
  dialogflow,
  actionssdk,
  Image,
  Table,
  Carousel,
} = require('actions-on-google');

module.exports = function(RED) {

    function GoogleHomeControllerNode(config) {

        RED.nodes.createNode(this, config);

        console.log("GoogleHomeControllerNode");
        console.log(config);

        this.app = dialogflow();

        this.send({
          topic: "googlehome-controller",
          payload: this.app
        }, false);
    }

    RED.nodes.registerType("googlehome-controller", GoogleHomeControllerNode);
};
