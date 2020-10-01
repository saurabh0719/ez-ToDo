'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 350,
    height: 500,
    show: false,
    resizable: false,
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    }
  }

  class Window extends BrowserWindow{
      constructor({file, ...windowsettings}){
          super({...defaultProps,...windowsettings})
          this.loadFile(file)
          this.webContents.openDevTools()

          this.once('ready-to-show', ()=> { this.show() })
      }
  }

  module.exports = Window