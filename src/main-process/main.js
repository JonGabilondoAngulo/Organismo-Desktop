'use strict'

const {app} = require('electron')
const isDev = require('electron-is-dev')
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, '../../package.json'))
const OrganismoWindow = require('./org-window')
var mainWindow = null

app.name = config.productName

app.on('ready', function () {
    mainWindow = new OrganismoWindow(app)
})

app.on('window-all-closed', () => {
    app.quit()
})
