// Licensed under the Apache License. See footer for details.

module.exports = [
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
