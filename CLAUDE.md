# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Joplin plugin that provides quick access to note source URLs without having to open the Note Properties dialog. The plugin adds commands to open or copy source URLs directly from the Tools menu or via keyboard shortcuts. It also enhances the mobile app experience by automatically setting the source URL when using the first line URL.

## Key Features

- Open Source URL command (Shift+Cmd+U): Opens the source URL of the current note in the default browser
- Copy Source URL command (Shift+Cmd+C): Copies the source URL to the clipboard
- Automatic source URL setting: If no source URL is set, the plugin uses the first line URL and sets it as the source URL

## Development Commands

```bash
# Build the plugin (creates .jpl file in root and files in /dist)
npm run dist

# Update the plugin version (bumps patch version in package.json and manifest.json)
npm run updateVersion

# Update the plugin framework
npm run update
```

## Architecture

The plugin is built using TypeScript and the Joplin plugin API. Key files:

- `/src/index.ts`: Main plugin code that registers commands and event handlers
- `/src/manifest.json`: Plugin metadata (name, version, description, etc.)
- `/plugin.config.json`: Configuration for additional script compilation

The plugin follows a simple architecture:

1. It registers two main commands: `openSourceUrl` and `copySourceUrl`
2. Both commands use a shared `getOrSetSourceUrl` function that:
   - Returns the note's source URL if it exists
   - Otherwise, checks if the first line contains a URL
   - If it does, sets that URL as the note's source URL and returns it
3. The commands are added to the Joplin Tools menu with keyboard shortcuts

## Working with the Plugin API

The plugin uses these key Joplin API features:

- `joplin.plugins.register()`: Main entry point for plugin registration
- `joplin.commands.register()`: Creates commands that can be executed by users
- `joplin.views.menuItems.create()`: Adds items to the Joplin UI menus
- `joplin.workspace.selectedNote()`: Gets the currently selected note
- `joplin.data.get()` and `joplin.data.put()`: Access and modify note data
- `joplin.commands.execute()`: Execute Joplin commands (e.g., `openItem`)
- `joplin.clipboard.writeText()`: Interact with the system clipboard

## Building and Publishing

The plugin uses webpack for building. The build process creates files in the `/dist` directory and a .jpl file at the root. To publish:

1. Run `npm run dist` to build the plugin
2. The plugin can be published to npm with `npm publish`
3. It will be automatically added to the Joplin plugin repository if:
   - Package name starts with "joplin-plugin-"
   - Package keywords include "joplin-plugin"
   - The `/publish` directory contains the .jpl and .json files