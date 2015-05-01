# Licensed under the Apache License. See footer for details.

require "cakex"

pkg = require "./package.json"

#-------------------------------------------------------------------------------
task "watch",    "watch for source file changes, build", -> taskWatch()
task "build",    "run a build",                          -> taskBuild()
task "buildIcns", "build the OS X icns file",            -> taskBuildIcns()

WatchSpec = "lib/**/* www/**/*"

#-------------------------------------------------------------------------------
mkdir "-p", "tmp"

#-------------------------------------------------------------------------------
taskBuild = ->
  #log "linting ..."
  #eshint "lib/*.js lib/channels/*.js"

  log "build starting."

  buildBrowserVersion()

  platformArch = "#{process.platform}-#{process.arch}"

  if platformArch is "darwin-x64"
    build_darwin_x64()

  log "build done."

#-------------------------------------------------------------------------------
watchIter = ->
  taskBuild()

#-------------------------------------------------------------------------------
taskWatch = ->
  watchIter()

  watch
    files: WatchSpec.split " "
    run:   watchIter

  # watch
  #   files: "doc/**/*"
  #   run:   watchIterDoc

  watch
    files: "Cakefile"
    run: (file) ->
      return unless file == "Cakefile"
      log "Cakefile changed, exiting"
      exit 0

#-------------------------------------------------------------------------------
buildBrowserVersion = ->
  name   = "md-viewer"
  jsName = "#{name}.js"

  # run browserify
  opts = """
    --outfile    tmp/#{jsName}
    --standalone #{name}
    --entry      www/#{jsName}
    --debug
  """

  opts = opts.trim().split(/\s+/).join(" ")

  # log "running browserify ..."
  # browserify opts

  # run cat-source-map

  # log "running cat-source-map ..."
  # cat_source_map "--fixFileNames tmp/#{jsName} www/#{jsName}"

  # log "browser file(s) generated at: www/#{jsName}"

#-------------------------------------------------------------------------------
build_darwin_x64 = ->
  platformArch = "darwin-x64"

  log "building #{platformArch} ..."

  iDir = j "node_modules", "electron-prebuilt", "dist"
  oDir = j "build", platformArch

  eiDir = j iDir, "Electron.app"
  eoDir = j oDir, "Electron.app"

  rm "-rf", oDir

  cp "-R", eiDir, oDir
  cp j(iDir, "LICENSE"), j(eoDir, "LICENSE-electron")
  cp j(iDir, "version"), j(eoDir, "version-electron")

  cp j("www", "images", "md-viewer.icns"), j(eoDir, "Contents", "Resources")

  cfBundleFix "md-viewer-build", j(eoDir, "Contents", "Info.plist")

  mv j(eoDir, "Contents", "MacOS", "Electron"), j(eoDir, "Contents", "MacOS", "md-viewer-build")
  mv eoDir, j(oDir, "md-viewer-build.app")

#-------------------------------------------------------------------------------
cfBundleFix = (name, iFile) ->
  log "fixing #{iFile}..."

  contents = cat iFile

  contents = contents.replace /atom\.icns/g,            "md-viewer.icns"
  contents = contents.replace /com\.github\.electron/g, "org.muellerware.#{name}"
  contents = contents.replace /Electron/g,              "#{name}"


  match = contents.match /([\S\s]*)<\/dict>[\S\s]*?/m
  unless match
    log "unable to add additional plist goodies"
    return

  additional = cat j("lib", "additions.plist")

  contents = "#{match[1]}\n#{additional}\n</dict>\n</plist>"

  contents.to iFile

#-------------------------------------------------------------------------------
taskBuildIcns = ->
  log "build icns file..."

  iFile = "www/images/md-viewer.png"
  oFile = "www/images/md-viewer.icns"
  tDir  = "tmp/icns.iconset"

  cleanDir tDir

  exec "sips -z    16 16  #{iFile} --out #{tDir}/icon_16x16.png"
  exec "sips -z    32 32  #{iFile} --out #{tDir}/icon_16x16@2x.png"
  exec "sips -z    32 32  #{iFile} --out #{tDir}/icon_32x32.png"
  exec "sips -z    64 64  #{iFile} --out #{tDir}/icon_32x32@2x.png"
  exec "sips -z  128 128  #{iFile} --out #{tDir}/icon_128x128.png"
  exec "sips -z  256 256  #{iFile} --out #{tDir}/icon_128x128@2x.png"
  exec "sips -z  256 256  #{iFile} --out #{tDir}/icon_256x256.png"
  exec "sips -z  512 512  #{iFile} --out #{tDir}/icon_256x256@2x.png"
  exec "sips -z  512 512  #{iFile} --out #{tDir}/icon_512x512.png"
  exec "sips -z 1024 1024 #{iFile} --out #{tDir}/icon_512x512@2x.png"

  exec "iconutil --convert icns --output #{oFile} #{tDir}"

#-------------------------------------------------------------------------------
j = (dirParts...) ->
  path.join.apply path, dirParts

#-------------------------------------------------------------------------------
cleanDir = (dir) ->
  mkdir "-p", dir
  rm "-rf", "#{dir}/*"

#-------------------------------------------------------------------------------
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#-------------------------------------------------------------------------------
