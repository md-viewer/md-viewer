md-viewer - a desktop Markdown viewer app built on Electron
================================================================================


installation
================================================================================

Currently, you'll need to build md-viewer yourself; luckily, this should
be pretty easy.

* clone this repo
* run `npm install` to install dependencies
* run `npm run build` to build the execute

The executable will be in the `dist` directory.  Note that a "build" version
is also available in the `build` directory, to make it easier to test a
development version while you have a stable version installed at the same time,
on your boxen.


usage
================================================================================

On OS X, md-viewer associates itself with Markdown files (extension `.md`), so
you should be able to open a Markdown file by double-clicking.

You can zoom in/out on the document, and the file will be watched and the markdown
view updated, when the file changes.


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
