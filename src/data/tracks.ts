import tracks from './tracks.json';

export interface Album {
  name: string;
  tracks: Track[];
}

export interface TrackMedia {
  path: string;
  path30Min: string;
}

export interface Track {
  name: string;
  icon: string;
  media: TrackMedia;
}

export const getTracks = () => JSON.parse(JSON.stringify(tracks));
