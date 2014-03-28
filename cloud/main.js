(function() {
  var _;

  _ = require("cloud/vendor/lodash");

  require("cloud/app");

  AV.Cloud.define("hello", function(req, res) {
    return res.success(_.first(["Hello world!"]));
  });

}).call(this);
