import { IonCardTitle, IonCol, IonImg } from '@ionic/react';
import React from 'react';

import { ITrack } from '../data/album-track';
import './Track.css';

interface TrackProps {
  track: ITrack;
}

const Track: React.FC<TrackProps> = ({ track }) => {
  return (
    <IonCol size="3" class="track">
      <IonImg src={track.icon} class="track__icon"></IonImg>
      <IonCardTitle>{track.name}</IonCardTitle>
    </IonCol>
  );
};

export default Track;
