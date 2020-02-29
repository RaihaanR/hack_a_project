import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonCard, IonItem, IonIcon, IonLabel, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonImg, IonModal, IonSegment, IonSegmentButton } from '@ionic/react';
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

const Tab2: React.FC = () => {
  var events: Event[] = [{ 
        id: -1,
        image: '',
        organiser: 'null', 
        name:'null', 
        location:'null', 
        time: 'null'
      }]
  // var events: Event[] = [
  //   { 
  //     id: 1,
  //     image: 'https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg',
  //     organiser: 'Imperial College London', 
  //     name:'Climb Queen\'s Tower', 
  //     location:'Queen\'s lawn', 
  //     time: 'Sunday 1st March, 2PM'
  //   }, 
  //   { 
  //     id: 2,
  //     image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F90845043%2F133544235468%2F1%2Foriginal.20200204-155442?w=1080&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C22%2C1920%2C960&s=7ba1215a5d3099cd2b2682b685deb9b8',
  //     organiser: 'DoCSoc', 
  //     name:'Revel', 
  //     location:"Quaglino's", 
  //     time: 'Monday 2nd March, 7:30PM'
  //   },
  //   { 
  //     id: 3,
  //     image: 'https://www.imperial.ac.uk/news/image/mainnews2012/40761.jpg',
  //     organiser: 'Imperial College London', 
  //     name:'Climb Queen\'s Tower', 
  //     location:'Queen\'s lawn', 
  //     time: 'Sunday 1st March, 2PM'
  //   }
  // ];
  const [showModal, setShowModal] = useState(false);
  var modalEvent: Event = events[0];

  function openEvent(e: Event) {
    modalEvent = e;
    setShowModal(true);    
  }

  let server = "https://5498e4a8.ngrok.io/";

  function getEvents() {
    fetch(server+"events/")
    .then(res => res.json())
    .then(
      (result) => (result as Event[]).forEach(element => {
        console.log(element.name);
        events.push(element as Event);
        console.log(events);
      })
    );
  }

  return (
    <IonPage>
      {getEvents()}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSearchbar></IonSearchbar>

        <IonModal isOpen={showModal}>
        <IonCard>
          <IonImg src={modalEvent.image} />
            <IonCardHeader>
              <IonCardSubtitle>By {modalEvent.organiser}</IonCardSubtitle>
              <IonCardTitle>{modalEvent.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </IonCardContent>

            <IonCardContent>
            <IonIcon icon={location} /> {modalEvent.location} <br/>
            <IonIcon icon={time} /> {modalEvent.time}
            </IonCardContent>

            <IonCardContent>
              <IonSegment value="no" onIonChange={e => console.log('Segment selected', e.detail.value)}>
                <IonSegmentButton value="going">
                  <IonLabel>Going</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no">
                  <IonLabel>No</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </IonCardContent>
          </IonCard>

          <IonButton onClick={() => setShowModal(false)}>Done</IonButton>
        </IonModal>

  
        {events.map(event => (
          <IonCard onClick={() => openEvent(event)}>
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
