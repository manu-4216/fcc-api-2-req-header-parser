var express = require('express')

var app = express()

app.set('port', process.env.PORT || 5000)

app.use(express.static(__dirname + '/public'))

app.all('/', function (req, res) {
    var rawOS = req.headers['user-agent'],
        start = rawOS.indexOf('(') + 1,
        stop = rawOS.indexOf(')')
    
    var answer = {
        ip: req.headers['x-forwarded-for'],
        language: req.headers['accept-language'].slice(0,2),
        os: rawOS.slice(start, stop)
    }
    
    res.send('<div style="font-family: Georgia, serif;">' + JSON.stringify(answer) + '</div>')
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port + ' + app.get('port'))
})
