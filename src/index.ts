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

    await joplin.views.menuItems.create(
      'Open source URL',
      'openSourceUrl',
      MenuItemLocation.Tools,
      { accelerator: 'Shift+Cmd+U' });
  },
});
