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
        joplin.workspace.selectedNote().then(async (note) => {
          if (note) {
            let url = note.source_url;
            
            // If no source URL exists, check if first line is a URL
            if (!url) {
              const noteContent = await joplin.data.get(['notes', note.id], { fields: ['body'] });
              const firstLine = noteContent.body.split('\n')[0].trim();
              
              // Simple URL regex pattern
              const urlPattern = /^(https?:\/\/[^\s]+)$/;
              if (urlPattern.test(firstLine)) {
                url = firstLine;
                console.log(`Using first line as URL: ${url}`);
                
                // Update the note's source_url
                try {
                  await joplin.data.put(['notes', note.id], null, { 
                    id: note.id,
                    source_url: url
                  });
                  console.log('Note source_url updated successfully');
                } catch (error) {
                  console.error('Error updating note source_url:', error);
                }
              }
            } else {
              console.log(`Source URL: ${url}`);
            }
            
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
          let url = note.source_url;
          
          // If no source URL exists, check if first line is a URL
          if (!url) {
            const noteContent = await joplin.data.get(['notes', note.id], { fields: ['body'] });
            const firstLine = noteContent.body.split('\n')[0].trim();
            
            // Simple URL regex pattern
            const urlPattern = /^(https?:\/\/[^\s]+)$/;
            if (urlPattern.test(firstLine)) {
              url = firstLine;
              console.log(`Using first line as URL for copying: ${url}`);
              
              // Update the note's source_url
              try {
                await joplin.data.put(['notes', note.id], null, { 
                  id: note.id,
                  source_url: url
                });
                console.log('Note source_url updated successfully');
              } catch (error) {
                console.error('Error updating note source_url:', error);
              }
            }
          }
          
          if (url) {
            await joplin.clipboard.writeText(url);
            console.log('URL copied to clipboard!');
          } else {
            await joplin.views.dialogs.showMessageBox('No URL found for this note.');
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
