'use strict'

const electron = require('electron')
const app = electron.app
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, '../../package.json'))
const OrganismoWindow = require('./org-window')

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
    mainWindow = new OrganismoWindow(app)
})

app.on('window-all-closed', () => {
    app.quit()
})
