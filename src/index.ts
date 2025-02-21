import joplin from 'api';
import { MenuItemLocation } from 'api/types'

joplin.plugins.register({
  onStart: async function() {
    // eslint-disable-next-line no-console
    console.info('Source URL Opener plugin started!');

    await joplin.commands.register({
      name: 'openSourceUrl',
      label: 'Open Source URL',
      iconName: 'fas fa-external-link-alt',
      execute: async () => {
        joplin.workspace.selectedNote().then((note) => {
          if (note) {
            let url = note.source_url;
            console.log(`Source URL: ${url}`);
            if (url) joplin.commands.execute('openItem', url);
          } else {
            joplin.views.dialogs.showMessageBox("Please select one and only one note.");
          }
        });
      },
    });

    await joplin.commands.register({
      name: 'copySourceUrl',
      label: 'Copy Source URL',
      iconName: 'fas fa-copy',
      execute: async () => {
        const note = await joplin.workspace.selectedNote();
        if (note) {
          const url = note.source_url;
          if (url) {
            await joplin.clipboard.writeText(url);
            console.log('Source URL copied to clipboard!');
          }
        } else {
          await joplin.views.dialogs.showMessageBox('Please select one and only one note.');
        }
      },
    });

    await joplin.views.menuItems.create(
      'Open source URL',
      'openSourceUrl',
      MenuItemLocation.Tools,
      { accelerator: 'Shift+Cmd+U' });

    await joplin.views.menuItems.create(
      'Copy Source URL',
      'copySourceUrl',
      MenuItemLocation.Tools,
      { accelerator: 'Shift+Cmd+C' });
  },
});
