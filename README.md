# Source URL Opener Plugin for Joplin

A Joplin plugin that provides quick access to note source URLs without having to open the Note Properties dialog.

## Features

1. **Open Source URL** (`Shift+Cmd+U`)
   - Quickly open the source URL of the current note in your default browser
   - Access via Tools menu or keyboard shortcut

2. **Copy Source URL** (`Shift+Cmd+C`)
   - Copy the source URL of the current note to clipboard
   - Access via Tools menu or keyboard shortcut

3. **Mobile App Compatibility**
   - Supports content shared to Joplin mobile app where source URL isn't set properly
   - Falls back to using the first line URL when no source URL property exists

## Usage

1. Select a note that either:
   - Has a source URL property set
   - Contains a URL in the first line (useful for notes created in Joplin mobile app)
2. Then:
   - Press `Shift+Cmd+U` to open the URL in your browser
   - Press `Shift+Cmd+C` to copy the URL to your clipboard
   - Or use the corresponding commands from the Tools menu

## Installation

1. Download the latest release from the releases page
2. Open Joplin and navigate to Tools > Options > Plugins
3. Click "Install from file" and select the downloaded .jpl file

## Building from Source

For information on how to build or publish the plugin, please see [GENERATOR_DOC.md](./GENERATOR_DOC.md)
