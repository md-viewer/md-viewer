// Licensed under the Apache License. See footer for details.

"use strict"

const app           = require("app")
const Menu          = require("menu")
const Dialog        = require("dialog")
const BrowserWindow = require("browser-window")

const main  = require("./main")
const prefs = require("./prefs")

//------------------------------------------------------------------------------
exports.load = load

let ZoomLevel = 0

//------------------------------------------------------------------------------
function load(mainWindow) {
  const template = [
    {
      label: "md-viewer",
      submenu: [
        { label: "About md-viewer",                                selector: "orderFrontStandardAboutPanel:" },
        { type:  "separator" },
        { label: "Services", submenu: [] },
        { type:  "separator" },
        { label: "Hide md-viewer", accelerator: "Command+H",       selector: "hide:" },
        { label: "Hide Others",    accelerator: "Command+Shift+H", selector: "hideOtherApplications:" },
        { label: "Show All",                                       selector: "unhideAllApplications:" },
        { type:  "separator" },
        { label: "Quit",           accelerator: "Command+Q",       click: quit }
      ]
    },
    {
      label: "File",
      submenu: [
        { label: "Open File...", accelerator: "Command+O", click: openFileMenu },
        { label: "Close",        accelerator: "Command+W", selector: "performClose:" },
        { type:  "separator" },
        { label: "Print...",     accelerator: "Command+P", click: print }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Copy",       accelerator: "Command+C", selector: "copy:" },
        { label: "Select All", accelerator: "Command+A", selector: "selectAll:" }
      ]
    },
    {
      label: "View",
      submenu: [
        { label: "Reload",          accelerator: "Command+R",     click: reload },
        { label: "Enter Fullscreen",                              click: enterFullscreen },
        { label: "Actual Size",     accelerator: "Command+0",     click: zoomActualSize },
        { label: "Zoom In",         accelerator: "Command+=",     click: zoomIn },
        { label: "Zoom Out",        accelerator: "Command+-",     click: zoomOut },
        { label: "Toggle DevTools", accelerator: "Alt+Command+I", click: toggleDevTools }
      ]
    },
    {
      label: "Window",
      submenu: [
        { label: "Minimize", accelerator: "Command+M", selector: "performMiniaturize:" },
        { label: "Close",    accelerator: "Command+W", selector: "performClose:" },
        { type:  "separator" },
        { label: "Bring All to Front",                 selector: "arrangeInFront:" }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  //-----------------------------------
  function openFileMenu() {
    const options = {
      title:        "Open Markdown File",
      defaultPath:  process.env.HOME,
      filters:      [
        { name: "Markdown files", extensions: ["md", "markdown"] }
      ],
      properties: [ "openFile" ]
    }

    const mWindow = getMainWindow(mainWindow)

    Dialog.showOpenDialog(mWindow, options, openFileCB)
  }

  //-----------------------------------
  function openFileCB(fileNames) {
    if (!fileNames) return

    openFiles(fileNames)
  }

  //-----------------------------------
  function quit() {
    app.quit()
  }

  //-----------------------------------
  function print() {
    getMainWindow(mainWindow).print()
  }

  //-----------------------------------
  function reload() {
    const script = "mdViewer_reload()"
    getMainWindow(mainWindow).webContents.executeJavaScript(script)
  }

  //-----------------------------------
  function enterFullscreen() {
    getMainWindow(mainWindow).setFullScreen(true)
  }

  //-----------------------------------
  function toggleDevTools() {
    getMainWindow(mainWindow).toggleDevTools()
  }

  //-----------------------------------
  function zoomActualSize() {
    ZoomLevel = 0
    setZoomLevel(mainWindow, ZoomLevel)
  }

  //-----------------------------------
  function zoomIn() {
    ZoomLevel++
    setZoomLevel(mainWindow, ZoomLevel)
  }

  //-----------------------------------
  function zoomOut() {
    ZoomLevel--
    setZoomLevel(mainWindow, ZoomLevel)
  }
}

//------------------------------------------------------------------------------
function setZoomLevel(mainWindow, zoomLevel) {
  mainWindow = getMainWindow(mainWindow)

  const script = "mdViewer_webFrame.setZoomLevel(" + zoomLevel + ")"
  mainWindow.webContents.executeJavaScript(script)

  main.prefs.window_zoomLevel = zoomLevel
  prefs.store(main.prefs)
}

//------------------------------------------------------------------------------
function getMainWindow(mainWindow) {
  if (process.platform != "darwin") return mainWindow

  const focusedWindow = BrowserWindow.getFocusedWindow()
  if (focusedWindow) return focusedWindow

  return mainWindow
}

//------------------------------------------------------------------------------
function openFiles(fileNames) {
  fileNames.forEach(function(fileName) {
    main.openFile(fileName)
  })
}

//------------------------------------------------------------------------------
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------
