// Licensed under the Apache License. See footer for details.

var app           = require("app")
var BrowserWindow = require("browser-window")
var crashReporter = require("crash-reporter")

crashReporter.start()

var mainWindows = []

app.on("window-all-closed", on_window_all_closed)
app.on("ready",             on_ready)

//------------------------------------------------------------------------------
function on_ready() {
  var mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadUrl("file://" + __dirname + "/index.html")

  mainWindow.on("closed", function() {
    on_mainWindow_closed(mainWindow)
  })

  mainWindows.push(mainWindow)
}

//------------------------------------------------------------------------------
function on_mainWindow_closed(mainWindow) {
  var index = -1
  for (var i=0; i<mainWindows.length; i++) {
    if (mainWindows[i] == mainWindow) {
      index = i
      break
    }
  }

  if (index == -1) {
    return
  }

  mainWindows.splice(index, 1)
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
