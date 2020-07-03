const baseUrl = '/proto-api'
let bodyParser = require('body-parser')
let express = require('express')
let app = express()
let helmet = require('helmet')
let moment = require('moment')
let serverStartTime = moment().format('LLLL')
let cors = require('cors')

process
.on('unhandledRejection', (reason, p) => {
  console.log('Promise error', JSON.stringify(reason.stack || reason))
  
})
.on('uncaughtException', err => {
  console.log(JSON.stringify({ error: err.stack }))
  
})

module.exports = app
app.use(helmet())
app.use(cors())
app.use(bodyParser.raw({
    limit: '50mb'
  }))
  app.use(bodyParser.json({
    limit: '50mb'
  }))
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }))

// DECLARE ROUTES HERE. e.g. app.get(BASE_URL + '/helloworld', function(req, res){...})
app.get(baseUrl + '/api/ping', function (req, res) {
    res.status(200).send('Pong <br />\nServer : ' + serverStartTime + '<br />\nNow : ' + moment().format('LLLL'))
  })

  app.get(`${baseUrl}/api/studentList`,  require('./api/controller/studentList').studentList)
  app.get(`${baseUrl}/api/getStudents`,  require('./api/controller/getStudents').getStudents)
  app.post(`${baseUrl}/api/login`,  require('./api/controller/login').login)

  

  let port = process.env.SRT_PORT_NUMBER || 8001
  let server = app.listen(port, function () {
    console.log('Application started on port ' + port)
    console.log('try this: curl http://localhost:' + port + baseUrl + '/api/ping')
  })