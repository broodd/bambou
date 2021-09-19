import { NativeAudio } from '@ionic-native/native-audio';
import { playOutline, pauseOutline } from 'ionicons/icons';
import { useState } from 'react';
import {
  useIonViewWillEnter,
  IonRefresherContent,
  IonRefresher,
  IonContent,
  isPlatform,
  IonGrid,
  IonPage,
  IonFab,
  IonFabButton,
  IonIcon,
  IonProgressBar,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonFooter,
} from '@ionic/react';

import { IAlbum, getAlbums } from '../data/album-track';
import Album from '../components/Album';

import './Home.css';

const audioType = isPlatform('cordova') ? 'native' : 'html5';

interface IAudio {
  index: string;
  name: string;
  asset?: HTMLAudioElement;
}

const Home: React.FC = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [audio, setAudio] = useState<IAudio>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    const albums = getAlbums();
    setAlbums(albums);
  });

  const setIsLoadingWithDelay = (value: boolean, ms = 800) => {
    setTimeout(() => {
      setIsLoading(value);
    }, ms);
  };

  const play = async (index: string, name: string, asset: string) => {
    try {
      if (index === audio?.index) {
        return isPlaying ? pause() : resume();
      }
      await stop();
      setIsLoading(true);

      if (audioType === 'html5') {
        const audioAsset = new Audio(asset);
        await audioAsset.play();

        setAudio({
          index,
          name,
          asset: audioAsset,
        });
        setIsLoadingWithDelay(false);
      } else {
        await NativeAudio.preloadComplex(name, asset, 1, 1, 0);
        await NativeAudio.play(name);

        setAudio({
          index,
          name,
        });
        setIsLoading(false);
      }

      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const pause = () => {
    try {
      if (!audio || !isPlaying) return;

      if (audio.asset) {
        audio.asset.pause();
      } else {
        NativeAudio.stop(audio.name);
      }

      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    }
  };

  const resume = () => {
    try {
      if (!audio || isPlaying) return;

      if (audio.asset) {
        audio.asset.play();
      } else {
        NativeAudio.play(audio.name);
      }

      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stop = async () => {
    try {
      if (!audio) return;

      if (audio.asset) {
        audio.asset.pause();
        audio.asset.src = '';
      } else {
        await NativeAudio.stop(audio.name);
        await NativeAudio.unload(audio.name);
      }

      setAudio(undefined);
      setIsPlaying(false);
    } catch (error) {
      console.log(error);
    }
  };

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonGrid>
          {albums.map((album, i) => (
            <Album
              album={album}
              key={i}
              isPlaying={isPlaying}
              activeIndex={audio?.index}
              onPlay={play}
            ></Album>
          ))}
        </IonGrid>
      </IonContent>

      <IonFooter>
        {isLoading && (
          <IonProgressBar type="indeterminate" color="primary"></IonProgressBar>
        )}
        <IonToolbar>
          <IonButton
            slot="start"
            size="large"
            shape="round"
            fill="outline"
            onClick={() => (isPlaying ? pause() : resume())}
          >
            <IonIcon
              slot="icon-only"
              icon={isPlaying ? pauseOutline : playOutline}
            />
          </IonButton>
          <IonTitle>{audio?.name}</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
