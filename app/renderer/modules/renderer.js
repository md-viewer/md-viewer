// Licensed under the Apache License. See footer for details.

"use strict"

const fs = require("fs")

const shell    = require("shell")
const webFrame = require("web-frame")

const $         = require("jquery")
const marked    = require("marked")
const highlight = require("highlight.js")

window.mdViewer = {}
window.mdViewer_openLink   = mdViewer_openLink
window.mdViewer_loadMDFile = mdViewer_loadMDFile
window.mdViewer_reload     = mdViewer_reload
window.mdViewer_webFrame   = webFrame

window.mdViewer_fileName = null

//------------------------------------------------------------------------------
configureMarked()

//------------------------------------------------------------------------------
/*eslint no-unused-vars:0*/
function mdViewer_openLink(href) {
  shell.openExternal(href)
}

//------------------------------------------------------------------------------
function mdViewer_loadMDFile(fileName) {
  let hContents = null

  if (fileName == null) {
    hContents = fs.readFileSync(__dirname + "/../about.html", "utf8")
  }
  else {
    window.mdViewer_fileName = fileName
    const mContents = fs.readFileSync(fileName, "utf8")
    hContents = marked(mContents)
    fs.watchFile(fileName, {interval: 1000}, fileModified)
  }

  $("#content").html(hContents)
}

//------------------------------------------------------------------------------
function fileModified(curr, prev) {
  if (curr.mtime == prev.mtime) return

  mdViewer_reload()
}

//------------------------------------------------------------------------------
function mdViewer_reload() {
  const fileName = window.mdViewer_fileName
  if (fileName == null) return

  const mContents = fs.readFileSync(fileName, "utf8")
  const hContents = marked(mContents)

  $("#content").html(hContents)
}

//------------------------------------------------------------------------------
function configureMarked() {
  const renderer = new marked.Renderer()

  renderer.link = renderLink

  marked.setOptions({
    renderer:     renderer,
    gfm:          true,
    tables:       true,
    breaks:       false,
    pedantic:     false,
    sanitize:     true,
    smartLists:   true,
    smartypants:  false,
    highlight:    highlightCode
  })
}

//------------------------------------------------------------------------------
function renderLink(href, title, text) {
  var plain   = "<a href='javascript:void(0)'>" + text + "</a>"
  var link    = JSON.stringify(href)

  if (href.match(/^javascript:/i)) return plain
  if (href.match(/['|"]/)) return plain

  /*eslint no-script-url:0*/
  href  = "javascript:void(0)"

  var onclick = "mdViewer_openLink(" + link + ")"

  return "<a href='" + href + "' onclick='" + onclick + "'>" + text + "</a>"
}

//------------------------------------------------------------------------------
function highlightCode(code, lang) {
  if (!lang || lang == "") {
    return highlight.highlightAuto(code).value
  }

  return highlight.highlightAuto(code, [lang]).value
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
