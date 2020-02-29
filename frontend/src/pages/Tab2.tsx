import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonCard, IonIcon, IonLabel, IonButton, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonImg, IonModal, IonSegment, IonSegmentButton } from '@ionic/react';
import './Tab2.css';
import { location, time, person } from 'ionicons/icons';

type Event = {
  id: number;
  image: string;
  organiser: string;
  name: string;
  location: string;
  description: string;
  time: string;
};

const Tab2: React.FC = () => {

  var nullEvent: Event = { 
    id: -1,
    image: '',
    organiser: 'null', 
    name:'null', 
    location:'null', 
    description:'null', 
    time: 'null'
  };


  const [search, setSearch] = useState("");

  const [modalEvent, setModalEvent] = useState(nullEvent);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvent] = useState([nullEvent]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [going, setGoing] = useState("null");
 
  function openEvent(e: Event) {
    getGoing(e.id)
    setModalEvent(e);
    setShowModal(true);    
  }

  function filter() {
    console.log(search);
    if (search === "") {
      setFilteredEvents(events);
    } else {
      const eventList: Event[] = [];
        events.forEach(event => {
          if (event.name.toLowerCase().startsWith(search.toLowerCase())) {
            eventList.push(event);
          }
          console.log(events);
        });
        if (eventList.length > 0) {
          setFilteredEvents(eventList);
        } else {
          setFilteredEvents(events);
        }
    }
  }

  let server = "https://5498e4a8.ngrok.io/";

  function getGoing(id: number) {
    console.log(id);
    fetch(server+"events/" + id + "/getUsers/")
    .then(res => res.text().then(v => setGoing(v)))
  }
  

  useEffect(() => {
    fetch(server+"events/")
    .then(res => res.json())
    .then(
      (result) => {
        const eventList: Event[] = [];
        (result as Event[]).forEach(element => {
          eventList.push(element);
        });
        setEvent(eventList);
        setFilteredEvents(events);
      }
    );
  }, [events.length]);

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

        <IonSearchbar inputmode="search" onIonClear={() => {setSearch(""); setFilteredEvents(events)}} onIonChange={e => {setSearch(e.detail.value!); filter()}}></IonSearchbar>

        <IonModal isOpen={showModal}>
        <IonCard>
          <IonImg src={modalEvent.image} />
            <IonCardHeader>
              <IonCardSubtitle>By {modalEvent.organiser}</IonCardSubtitle>
              <IonCardTitle>{modalEvent.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
            {modalEvent.description}
            </IonCardContent>

            <IonCardContent>
            <IonIcon icon={location} /> {modalEvent.location} <br/>
            <IonIcon icon={time} /> {modalEvent.time} <br/>
            <IonIcon icon={person} /> {going}
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

  
        {filteredEvents.map(event => (
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
