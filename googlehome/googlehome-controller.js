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

        this.getApp = () => {
          return this.app;
        };

        RED.events.on('nodes-started', msg => {
          this.log("Sending Controller");

          this.send([{
            topic: "googlehome-controller",
            payload: this
          }, null], false);
        });

        this.on('input', msg => {
            console.debug("GoogleHomeControllerNode - Input Message Received");
            console.log(msg);

            if(msg && msg.payload && msg.req && msg.res){
              this.app(msg.payload, msg.req.headers).then( (res) => {
                this.send([null,{
                  payload: res.body,
                  headers: res.headers,
                  statusCode: res.status,
                  req: msg.req,
                  res: msg.res
                }]);
              }).catch( (err) => {
                this.log("ERROR");
                this.log(err);
              });
            }
        });

        this.on('close', () => {
            console.debug("Closed");
        });

    }

    RED.nodes.registerType("googlehome-controller", GoogleHomeControllerNode);
};
