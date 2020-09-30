'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 300,
    height: 400,
    show: false,
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