const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(serveStatic(path.join(__dirname, '/app/public')))

require('./app/routing/apiRoutes')(app)
require('./app/routing/htmlRoutes')(app)

app.listen(PORT, function () {
    console.log(`Now listening on PORT ${PORT}`)
})