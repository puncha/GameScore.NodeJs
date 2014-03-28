_ = require("cloud/vendor/lodash")
express = require('express')
app = express()

app.set('views', 'cloud/views')
app.set('view engine', 'ejs')
app.use(express.logger())
app.use(express.bodyParser())

app.get('/hello', (req, res)-> 
  res.render('hello', message: 'Congrats you just set up your app!' )
)

app.listen(80)