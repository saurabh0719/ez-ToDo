'use strict'

const { BrowserWindow } = require('electron')

const defaultProps = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
      nodeIntegration: true
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