import { IonCardTitle, IonCol, IonRow } from '@ionic/react';

import { IAlbum } from '../data/album-track';
import Track from './Track';

import './Album.css';

interface AlbumProps {
  album: IAlbum;
  activeIndex?: string;
  isPlaying: boolean;
  onPlay: (index: string, key: string, asset: string) => void;
}

const Album: React.FC<AlbumProps> = ({
  album,
  activeIndex,
  isPlaying,
  onPlay,
}) => {
  return (
    <IonRow class="album">
      <IonCol size="12">
        <IonCardTitle class="album__title">{album.name}</IonCardTitle>
      </IonCol>
      {album.tracks.map((track, i) => (
        <Track
          track={track}
          key={i}
          onPlay={onPlay}
          isPlaying={isPlaying}
          activeIndex={activeIndex}
        ></Track>
      ))}
    </IonRow>
  );
};

export default Album;
