import { useState } from 'react';
import {
  useIonViewWillEnter,
  IonRefresherContent,
  IonRefresher,
  IonContent,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonGrid,
  IonPage,
} from '@ionic/react';

import { IAlbum, getAlbums } from '../data/album-track';
import Album from '../components/Album';

import './Home.css';

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  useIonViewWillEnter(() => {
    const albums = getAlbums();
    setAlbums(albums);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          {albums.map((album, i) => (
            <Album album={album} key={i}></Album>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
