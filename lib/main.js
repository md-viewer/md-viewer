// Licensed under the Apache License. See footer for details.

"use strict"

const path = require("path")

const app           = require("app")
const BrowserWindow = require("browser-window")
const crashReporter = require("crash-reporter")

crashReporter.start()

const MainWindows = []

app.on("window-all-closed", on_window_all_closed)
app.on("ready",             on_ready)

//------------------------------------------------------------------------------
function on_ready() {
  const fileName     = process.argv[1]
  const fullFileName = getFullFileName(fileName)
  const relFileName  = getRelFileName(fileName)

  const opts = {
    width:  800,
    height: 600
  }

  if (relFileName) {
    opts.title = relFileName
  }

  console.log("opts", opts)

  const mainWindow = new BrowserWindow(opts)

  mainWindow.loadUrl("file://" + __dirname + "/index.html")

  if (fullFileName) {
    mainWindow.setRepresentedFilename(fullFileName)
    const script = "loadMDFile(" + JSON.stringify(fullFileName) + ")"
    mainWindow.webContents.on("did-finish-load", function() {
      mainWindow.webContents.executeJavaScript(script)
    })
  }

  mainWindow.on("closed", function() {
    on_mainWindow_closed(mainWindow)
  })

  MainWindows.push(mainWindow)
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
  if (process.platform != "darwin") {
    app.quit()
  }
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
