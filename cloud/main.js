(function() {
  var _;

  _ = require("cloud/lodash");

  require("cloud/app");

  AV.Cloud.define("hello", function(req, res) {
    return response.success(_.first(["Hello world!"]));
  });

}).call(this);
