import albumTrackJson from './album-track.json';

export interface IAlbum {
  name: string;
  tracks: ITrack[];
}

export interface ITrack {
  name: string;
  icon: string;
  media: TrackMedia;
}

export interface TrackMedia {
  path: string;
  path30Min: string;
}

const albums: IAlbum[] = JSON.parse(JSON.stringify(albumTrackJson));

export const getAlbums = (): IAlbum[] => albums;
