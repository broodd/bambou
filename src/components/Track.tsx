import { IonCol, IonImg } from '@ionic/react';
import React from 'react';

import { ITrack } from '../data/album-track';
import './Track.css';

interface TrackProps {
  track: ITrack;
  activeIndex?: string;
  isPlaying: boolean;
  onPlay: (index: string, key: string, asset: string) => void;
}

const Track: React.FC<TrackProps> = ({
  track,
  activeIndex,
  isPlaying,
  onPlay,
}) => {
  return (
    <IonCol
      size="4"
      sizeSm="3"
      sizeLg="2"
      className={`track ${
        track.id === activeIndex
          ? isPlaying
            ? 'active playing'
            : 'active'
          : ''
      }`}
      onClick={() => onPlay(track.id, track.name, track.media.path30Min)}
    >
      <IonImg src={track.icon} class="track__icon"></IonImg>
      <p>{track.name}</p>
    </IonCol>
  );
};

export default Track;
