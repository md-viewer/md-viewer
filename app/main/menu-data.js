// Licensed under the Apache License. See footer for details.

"use strict"

const app    = require("app")
const Dialog = require("dialog")

const main = require("./main")

//------------------------------------------------------------------------------
function setExports() {
  exports.template     = getTemplate()
  exports.HandlerClass = HandlerClass
}

//------------------------------------------------------------------------------
function getTemplate() {
  return [
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
        { label: "Quit",           accelerator: "Command+Q",       on_click: "onQuit" }
      ]
    },
    {
      label: "File",
      submenu: [
        { label: "Open File...", accelerator: "Command+O", on_click: "onOpenFileMenu" },
        { label: "Close",        accelerator: "Command+W", selector: "performClose:" },
        { type:  "separator" },
        { label: "Print...",     accelerator: "Command+P", on_click: "onPrint" }
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
        { label: "Reload",          accelerator: "Command+R",     on_click: "onReload" },
        { label: "Enter Fullscreen",                              on_click: "onEnterFullscreen" },
        { label: "Actual Size",     accelerator: "Command+0",     on_click: "onZoomActualSize" },
        { label: "Zoom In",         accelerator: "Command+=",     on_click: "onZoomIn" },
        { label: "Zoom Out",        accelerator: "Command+-",     on_click: "onZoomOut" },
        { label: "Toggle DevTools", accelerator: "Alt+Command+I", on_click: "onToggleDevTools" }
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
}

//------------------------------------------------------------------------------
class HandlerClass {

  //-----------------------------------
  constructor(menu) {
    this.menu = menu
  }

  //-----------------------------------
  onOpenFileMenu() {
    const options = {
      title:        "Open Markdown File",
      defaultPath:  process.env.HOME,
      filters:      [
        { name: "Markdown files", extensions: ["md", "markdown"] }
      ],
      properties: [ "openFile" ]
    }

    if (this.menu.browserWindow) {
      Dialog.showOpenDialog(this.menu.browserWindow, options, onOpenFileCB)
    }
    else {
      Dialog.showOpenDialog(options, onOpenFileCB)
    }

  //-----------------------------------
    function onOpenFileCB(fileNames) {
      if (!fileNames) return

      fileNames.forEach(function(fileName) {
        main.openFile(fileName)
      })
    }
  }

  //-----------------------------------
  onQuit() {
    app.quit()
  }

  //-----------------------------------
  onPrint() {
    if (!this.menu.browserWindow) return

    this.menu.browserWindow.print()
  }

  //-----------------------------------
  onReload() {
    if (!this.menu.browserWindow) return

    const script = "mdViewer_reload()"
    this.menu.browserWindow.webContents.executeJavaScript(script)
  }

  //-----------------------------------
  onEnterFullscreen() {
    if (!this.menu.browserWindow) return

    this.menu.browserWindow.setFullScreen(true)
  }

  //-----------------------------------
  onToggleDevTools() {
    if (!this.menu.browserWindow) return

    this.menu.browserWindow.toggleDevTools()
  }

  //-----------------------------------
  onZoomActualSize() {
    setZoomLevel(this.menu.viewer, 0)
  }

  //-----------------------------------
  onZoomIn() {
    const zoomLevel = getZoomLevel(this.menu.viewer)
    setZoomLevel(this.menu.viewer, zoomLevel + 1)
  }

  //-----------------------------------
  onZoomOut() {
    const zoomLevel = getZoomLevel(this.menu.viewer)
    setZoomLevel(this.menu.viewer, zoomLevel - 1)
  }
}

//------------------------------------------------------------------------------
function getZoomLevel(viewer) {
  if (!viewer) return 0

  return viewer.zoomLevel
}

//------------------------------------------------------------------------------
function setZoomLevel(viewer, zoomLevel) {
  if (!viewer) return

  viewer.runScript("mdViewer_webFrame.setZoomLevel(" + zoomLevel + ")")
  viewer.zoomLevel = zoomLevel

  viewer.prefs.data.window_zoomLevel = zoomLevel
  viewer.prefs.store()
}

//------------------------------------------------------------------------------
setExports()

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
