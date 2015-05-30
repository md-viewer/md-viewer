md-viewer - a desktop Markdown viewer app built on Electron
================================================================================

usage
================================================================================

On OS X, md-viewer associates itself with Markdown files (files with the `.md`
extension), so you should be able to open a Markdown file with an "Open With..."
kind of menu option.  To set md-viewer to be the default application used with
Markdown files on a Mac, see these instructions on
[how to change default apps on the Mac](http://www.imore.com/how-change-default-apps-os-x).

You change the text size via menu and shortcut, the exact same way you
"zoom" pages in the Chrome web browser.  The file you are viewing will
be watched, and the view will be updated when the file changes.

The markdown is rendered into HTML with the
[marked package](https://www.npmjs.com/package/marked).  The following options
are used to render the markdown:

    gfm:          true
    tables:       true
    breaks:       false
    pedantic:     false
    sanitize:     true
    smartLists:   true
    smartypants:  false


install
================================================================================

You can download a pre-built binary from the distribution repos; each repo
manages at platform-specific version, and the binaries are available as archives
in the repo's releases page.  For each released version, you can download
either a `.zip` or `.tar.gz` archive.

* mac - https://github.com/md-viewer/md-viewer-dist-darwin-x64/releases


building
================================================================================

* clone this repo
* run `npm install` to install dependencies
* run `npm run build` to build the execute

A "build" version of the executable is available in the `build` directory,
to make it easier to test a development version while you have a stable version
installed at the same time, on your boxen.

To build a distribution, you will need to have the relevant `md-viewer-dist-...`
repo checked out along-side this one.


hacking
================================================================================

This project uses [cake](http://coffeescript.org/#cake) as it's
build tool.  To rebuild the project continuously, use the command

```bash
npm run watch
```

Other `cake` commands are available (assuming you are using npm v2) with
the command

```bash
npm run cake -- <command here>
```

Run `npm run cake` to see the other commands available in the `Cakefile`.


license
================================================================================

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

<http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


--------------------------------------------------------------------------------

<img width="256" src="www/images/md-viewer.png">
