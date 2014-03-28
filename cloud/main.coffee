_ = require("./cloud/vendor/lodash")
require("./cloud/app")

AV.Cloud.define("hello", (req, res)->
  response.success(_.first(["Hello world!"]))
)