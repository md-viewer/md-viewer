// Licensed under the Apache License. See footer for details.

"use strict"

console.log("loaded", __filename)

const fs = require("fs")

const $      = require("jquery")
const marked = require("marked")

//------------------------------------------------------------------------------
exports.loadMDFile = loadMDFile

marked.setOptions({
  renderer:     new marked.Renderer(),
  gfm:          true,
  tables:       true,
  breaks:       false,
  pedantic:     false,
  sanitize:     true,
  smartLists:   true,
  smartypants:  false
})

//------------------------------------------------------------------------------
function loadMDFile(fileName) {
  const mContents = fs.readFileSync(fileName, "utf8")
  const hContents = marked(mContents)

  $("#content").html(hContents)
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
