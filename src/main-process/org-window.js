
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const os = require('os')
const isDev = require('electron-is-dev')

module.exports =
    class OrganismoWindow {
        constructor (atomApplication) {

            this.atomApplication = atomApplication

            const {width, height} = electron.screen.getPrimaryDisplay().size

            const options = {
                width: width * 0.9,
                height: height * 0.9,
                backgroundColor: 'lightgray',
                title: "Organismo",
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                    defaultEncoding: 'UTF-8',
                    webSecurity: false,
                    allowRunningInsecureContent: true,
                    allowDisplayingInsecureContent: true
                }
            }

            this.browserWindow = new BrowserWindow(options)
            this.handleEvents()
            this.browserWindow.loadURL(`file://${__dirname}/../../index.html`)
            if (isDev) {
                this.openDevTools()
            }
        }

        handleEvents () {
            this.browserWindow.on('close', async event => {
            })

            this.browserWindow.on('closed', () => {
            })

            this.browserWindow.once('ready-to-show', () => {
                this.browserWindow.setMenu(null)
                this.browserWindow.show()
            })

            this.browserWindow.onbeforeunload = (e) => {
                // Prevent Command-R from unloading the window contents.
                e.returnValue = false
            }

            // mainWindow.on('resize', function () {
            //     console.log("RESIZE")
            // })
        }

        getDimensions () {
            const [x, y] = Array.from(this.browserWindow.getPosition())
            const [width, height] = Array.from(this.browserWindow.getSize())
            return {x, y, width, height}
        }

        shouldAddCustomTitleBar () {
            return (
                !this.isSpec &&
                process.platform === 'darwin' &&
                this.atomApplication.config.get('core.titleBar') === 'custom'
            )
        }

        shouldAddCustomInsetTitleBar () {
            return (
                !this.isSpec &&
                process.platform === 'darwin' &&
                this.atomApplication.config.get('core.titleBar') === 'custom-inset'
            )
        }

        shouldHideTitleBar () {
            return (
                !this.isSpec &&
                process.platform === 'darwin' &&
                this.atomApplication.config.get('core.titleBar') === 'hidden'
            )
        }

        close () {
            return this.browserWindow.close()
        }

        focus () {
            return this.browserWindow.focus()
        }

        minimize () {
            return this.browserWindow.minimize()
        }

        maximize () {
            return this.browserWindow.maximize()
        }

        unmaximize () {
            return this.browserWindow.unmaximize()
        }

        restore () {
            return this.browserWindow.restore()
        }

        setFullScreen (fullScreen) {
            return this.browserWindow.setFullScreen(fullScreen)
        }

        setAutoHideMenuBar (autoHideMenuBar) {
            return this.browserWindow.setAutoHideMenuBar(autoHideMenuBar)
        }

        handlesAtomCommands () {
            return !this.isSpecWindow() && this.isWebViewFocused()
        }

        isFocused () {
            return this.browserWindow.isFocused()
        }

        isMaximized () {
            return this.browserWindow.isMaximized()
        }

        isMinimized () {
            return this.browserWindow.isMinimized()
        }

        isWebViewFocused () {
            return this.browserWindow.isWebViewFocused()
        }

        toggleDevTools () {
            return this.browserWindow.toggleDevTools()
        }

        openDevTools () {
            return this.browserWindow.openDevTools()
        }

        closeDevTools () {
            return this.browserWindow.closeDevTools()
        }

        disableZoom () {
            return this.browserWindow.webContents.setVisualZoomLevelLimits(1, 1)
        }
    }