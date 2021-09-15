const data = {};

data.data.data_set.map((a) => ({
  name: a.display_name,
  tracks: a.tracks.map((t) => {
    const icon = JSON.parse(t.icon);
    return {
      name: t.display_name,
      icon: icon.url + '/' + icon.name + '.' + icon.ext,
      media: {
        path: t.media.path,
        path30Min: t.web_media.path,
      },
    };
  }),
}));
