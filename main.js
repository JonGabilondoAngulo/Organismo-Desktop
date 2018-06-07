'use strict'

const electron = require('electron')
const app = electron.app
const globalShortcut = electron.globalShortcut
const os = require('os')
const path = require('path')
const config = require(path.join(__dirname, 'package.json'))
const BrowserWindow = electron.BrowserWindow
const env = require('dotenv').config()

app.setName(config.productName)
var mainWindow = null
app.on('ready', function () {
    const {width, height} = electron.screen.getPrimaryDisplay().size

    mainWindow = new BrowserWindow({
        width: width * 0.9,
        height: height * 0.9,
        backgroundColor: 'lightgray',
        title: config.productName,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8',
            webSecurity: false,
            allowRunningInsecureContent: true,
            allowDisplayingInsecureContent: true
        }
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.webContents.openDevTools()

    // Enable keyboard shortcuts for Developer Tools on various platforms.
    let platform = os.platform()
    if (platform === 'darwin') {
        globalShortcut.register('Command+Option+I', () => {
            mainWindow.webContents.openDevTools()
        })
    } else if (platform === 'linux' || platform === 'win32') {
        globalShortcut.register('Control+Shift+I', () => {
            mainWindow.webContents.openDevTools()
        })
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.setMenu(null)
        mainWindow.show()
    })

    mainWindow.onbeforeunload = (e) => {
        // Prevent Command-R from unloading the window contents.
        e.returnValue = false
    }

    mainWindow.on('closed', function () {
        mainWindow = null
    })

    // mainWindow.on('resize', function () {
    //     console.log("RESIZE")
    // })
})

app.on('window-all-closed', () => {
    app.quit()
})
