import joplin from 'api';
import { MenuItemLocation } from 'api/types'

joplin.plugins.register({
  onStart: async function() {
    // eslint-disable-next-line no-console
    console.info('Source URL Opener plugin started!');

    async function getOrSetSourceUrl(note: any): Promise<string | null> {
      if (note.source_url) {
        console.log(`Source URL: ${note.source_url}`);
        return note.source_url;
      }

      try {
        const noteContent = await joplin.data.get(['notes', note.id], { fields: ['body'] });
        const firstLine = noteContent.body.split('\n')[0].trim();
        const urlPattern = /^(https?:\/\/[^\s]+)$/;
        if (urlPattern.test(firstLine)) {
          const url = firstLine;
          console.log(`Using first line as URL: ${url}`);
          try {
            await joplin.data.put(['notes', note.id], null, {
              id: note.id,
              source_url: url,
            });
            console.log('Note source_url updated successfully');
          } catch (error) {
            console.error('Error updating note source_url:', error);
          }
          return url;
        }
      } catch (error) {
        console.error('Error fetching note body:', error);
      }

      return null;
    }

    await joplin.commands.register({
      name: 'openSourceUrl',
      label: 'Open Source URL',
      iconName: 'fas fa-external-link-alt',
      execute: async () => {
        const note = await joplin.workspace.selectedNote();
        if (note) {
          const url = await getOrSetSourceUrl(note);
          if (url) {
            await joplin.commands.execute('openItem', url);
          }
        } else {
          await joplin.views.dialogs.showMessageBox('Please select one and only one note.');
        }
      },
    });

    await joplin.commands.register({
      name: 'copySourceUrl',
      label: 'Copy Source URL',
      iconName: 'fas fa-copy',
      execute: async () => {
        const note = await joplin.workspace.selectedNote();
        if (note) {
          const url = await getOrSetSourceUrl(note);
          if (url) {
            await joplin.clipboard.writeText(url);
            console.log('URL copied to clipboard!');
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
