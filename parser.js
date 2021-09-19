const data = {};

data.data.data_set
  .map((a) => ({
    id: a.uuid,
    name: a.display_name,
    priority: a.priority,
    tracks: a.tracks
      .map((t) => {
        const icon = JSON.parse(t.icon);
        return {
          id: t.uuid,
          name: t.display_name,
          icon: icon.url + '/' + icon.name + '.' + icon.ext,
          priority: t.priority,
          media: {
            path: t.media.path,
            path30Min: t.web_media.path,
          },
        };
      })
      .sort((a, b) => a.priority - b.priority),
  }))
  .sort((a, b) => a.priority - b.priority);
