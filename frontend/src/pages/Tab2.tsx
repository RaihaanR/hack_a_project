import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { location, time } from 'ionicons/icons';

type Event = {
  id: number;
  image: string;
  organiser: string;
  name: string;
  location: string;
  time: string;
};

const events: Event[] = [
  { 
    id: 1,
    image: 'https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg',
    organiser: 'Imperial College London', 
    name:'Climb Queen\'s Tower', 
    location:'Queen\'s lawn', 
    time: 'Sunday 1st March, 2PM'
  }, 
  { 
    id: 2,
    image: 'https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg',
    organiser: 'Imperial College London', 
    name:'Climb Queen\'s Tower', 
    location:'Queen\'s lawn', 
    time: 'Sunday 1st March, 2PM'
  },
  { 
    id: 3,
    image: 'https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg',
    organiser: 'Imperial College London', 
    name:'Climb Queen\'s Tower', 
    location:'Queen\'s lawn', 
    time: 'Sunday 1st March, 2PM'
  }
];

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
          <IonSearchbar></IonSearchbar>
        </IonHeader>

        <IonCard>
        <IonImg src="https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg" />
          <IonCardHeader>
            <IonCardSubtitle>By Organiser</IonCardSubtitle>
            <IonCardTitle>Event Name</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          <IonIcon icon={location} /> Location &nbsp;
          <IonIcon icon={time} /> Time
          </IonCardContent>
        </IonCard>

        {events.map(event => (
          <IonCard>
          <IonImg src={event.image} />
            <IonCardHeader>
              <IonCardSubtitle>By {event.organiser}</IonCardSubtitle>
              <IonCardTitle>{event.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            <IonIcon icon={location} /> {event.location} <br/>
            <IonIcon icon={time} /> {event.time}
            </IonCardContent>
          </IonCard>
      ))}



      </IonContent>
    </IonPage>
  );
};

export default Tab2;
