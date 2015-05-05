// Licensed under the Apache License. See footer for details.

"use strict"

const path = require("path")

const app           = require("app")
const BrowserWindow = require("browser-window")
const crashReporter = require("crash-reporter")

const pkg   = require("./package.json")
const menu  = require("./menu")
const prefs = require("./prefs")

//------------------------------------------------------------------------------
let Prefs = prefs.load({
  window_width:     800,
  window_height:    600,
  window_zoomLevel: 0
})

exports.openFile = openFile
exports.prefs    = Prefs

const MainWindows = []

crashReporter.start()

app.on("window-all-closed", on_window_all_closed)
app.on("ready",             on_ready)
app.on("open-file",         on_open_file)

//------------------------------------------------------------------------------
function on_open_file(event, fileName) {
  console.log("on_open_file:", fileName, JSON.stringify(process.argv))

  if (MainWindows.length == 0) {
    process.argv[1] = fileName
  }
  else {
    openFile(fileName)
  }
}

//------------------------------------------------------------------------------
function on_ready() {
  console.log("on_ready:", JSON.stringify(process.argv))
  openFile(process.argv[1])
}

//------------------------------------------------------------------------------
function openFile(fileName) {
  const fullFileName = getFullFileName(fileName)
  const relFileName  = getRelFileName(fileName)

  // app.addRecentDocument(fullFileName)

  const opts = {
    width:  Prefs.window_width,
    height: Prefs.window_height
  }

  if (relFileName) {
    opts.title = relFileName
  }
  else {
    opts.title = pkg.productName
  }

  const mainWindow = new BrowserWindow(opts)

  menu.load(mainWindow)

  mainWindow.loadUrl("file://" + __dirname + "/index.html")

  if (fullFileName) {
    mainWindow.setRepresentedFilename(fullFileName)
  }

  mainWindow.webContents.on("did-finish-load", function() {
    let script

    script = "mdViewer_loadMDFile(" + JSON.stringify(fullFileName) + ")"
    mainWindow.webContents.executeJavaScript(script)

    script = "mdViewer_webFrame.setZoomLevel(" + Prefs.window_zoomLevel + ")"
    mainWindow.webContents.executeJavaScript(script)
  })

  mainWindow.on("close", function() {
    on_mainWindow_close(mainWindow)
  })

  mainWindow.on("closed", function() {
    on_mainWindow_closed(mainWindow)
  })

  MainWindows.push(mainWindow)
}

//------------------------------------------------------------------------------
function on_mainWindow_close(mainWindow) {
  const size = mainWindow.getSize()

  Prefs.window_width  = size[0]
  Prefs.window_height = size[1]

  prefs.store(Prefs)
}

//------------------------------------------------------------------------------
function on_mainWindow_closed(mainWindow) {
  let index = -1

  for (let i=0; i<MainWindows.length; i++) {
    if (mainWindow == MainWindows[i]) {
      index = i
      break
    }
  }

  if (index == -1) {
    return
  }

  MainWindows.splice(index, 1)
}

//------------------------------------------------------------------------------
function getFullFileName(fileName) {
  if (!fileName) return null

  return path.resolve(fileName)
}

//------------------------------------------------------------------------------
function getRelFileName(fileName) {
  if (!fileName) return null

  const home = process.env.HOME
  if (!home) return fileName

  fileName = path.resolve(fileName)

  const relFileName = path.relative(home, fileName)
  if (relFileName[0] == ".") return fileName

  return path.join("~", relFileName)
}

//------------------------------------------------------------------------------
function on_window_all_closed() {
  app.quit()

  // if (process.platform != "darwin") {}
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
