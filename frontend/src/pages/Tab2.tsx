import React, { useState, useEffect } from 'react';
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

  var nullEvent: Event = { 
    id: -1,
    image: '',
    organiser: 'null', 
    name:'null', 
    location:'null', 
    time: 'null'
  };


  const [modalEvent, setModalEvent] = useState(nullEvent);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvent] = useState([nullEvent]);
 
  function openEvent(e: Event) {
    setModalEvent(e);
    setShowModal(true);    
  }

  let server = "https://5498e4a8.ngrok.io/";

  useEffect(() => {
    fetch(server+"events/")
    .then(res => res.json())
    .then(
      (result) => {const eventList: Event[] = [];(result as Event[]).forEach(element => {
        eventList.push(element as Event);
        console.log(events);
      });
      setEvent(eventList);
    }
    );
  });

  return (
    <IonPage>
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
