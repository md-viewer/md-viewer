// Licensed under the Apache License. See footer for details.

"use strict"

const fs   = require("fs")
const path = require("path")

const app = require("app")

const mkdirp = require("mkdirp")

const PREFS = "preferences.json"

//------------------------------------------------------------------------------
exports.load  = load
exports.store = store

const PrefsFileName = getPrefsFileName()

//------------------------------------------------------------------------------
function load(defaultValues) {
  if (!PrefsFileName) return defaultValues

  if (!fs.existsSync(PrefsFileName)) return defaultValues

  try {
    const contents = fs.readFileSync(PrefsFileName, "utf8")
    return JSON.parse(contents)
  }
  catch (e) {
    console.log("error reading preferences '" + PrefsFileName + "': " + e)
    return defaultValues
  }
}

//------------------------------------------------------------------------------
function store(obj) {
  if (!PrefsFileName) return

  try {
    const contents = JSON.stringify(obj, null, 4)
    fs.writeFileSync(PrefsFileName, contents)
  }
  catch (e) {
    console.log("error writing preferences '" + PrefsFileName + "': " + e)
  }
}

//------------------------------------------------------------------------------
function getPrefsFileName() {
  let userDataPath

  try {
    userDataPath = app.getPath("userData")
  }
  catch(e) {
    userDataPath = getPrefsPathUnixy()
  }

  try {
    mkdirp.sync(userDataPath)
  }
  catch(e) {
    return null
  }

  return path.join(userDataPath, PREFS)
}

//------------------------------------------------------------------------------
function getPrefsPathUnixy() {
  const homePath = process.env.HOME || process.env.USERPROFILE

  return path.join(homePath, ".mb-viewer")
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
