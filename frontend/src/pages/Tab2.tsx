import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonIcon,
  IonLabel,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonModal,
  IonSegment,
  IonSegmentButton
} from "@ionic/react";
import "./Tab2.css";
import { location, time, person } from "ionicons/icons";

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
    image: "https://shilohplainfield.org/images/Blank-photo-small.png",
    organiser: "",
    name: "",
    location: "",
    description: "",
    time: ""
  };

  const userId = 0;

  const [search, setSearch] = useState("");

  const [modalEvent, setModalEvent] = useState(nullEvent);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvent] = useState([nullEvent]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [whosGoing, setWhosGoing] = useState("null");
  const [userIsGoing, setIsGoing] = useState("");
 
  function openEvent(e: Event) {
    getWhosGoing(e.id);
    getIsGoing(e.id);
    setModalEvent(e);
    setShowModal(true);
  }


  function userIsGoingToEvent(e: number) {
    fetch(server + "usersGoing", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId.toString(),
        event_id: e.toString(),
      })
    })

  }

  function userNotGoingToEvent(e: number) {
    fetch(server + "usersNotGoing/", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId.toString(),
        event_id: e.toString(),
      })
    })

  }

  function updateEventStatus(v: string, e: number) {
    setIsGoing(v);
    if (v === "yes") {
      userIsGoingToEvent(e);
    } else {
      userNotGoingToEvent(e);
    }
  }

  function getIsGoing(id: number) {
    fetch(server+"events/" + id + "/" + userId)
    .then(res => res.text().then(v => setIsGoing(v)))
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

  function getWhosGoing(id: number) {
    fetch(server+"events/" + id + "/getUsers/")
    .then(res => res.text().then(v => setWhosGoing(v)))
  }

  useEffect(() => {
    fetch(server + "events/")
      .then(res => res.json())
      .then(result => {
        const eventList: Event[] = [];
        (result as Event[]).forEach(element => {
          eventList.push(element);
        });
        setEvent(eventList);
        setFilteredEvents(events);
      });
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

        <IonSearchbar
          inputmode="search"
          onIonClear={() => {
            setSearch("");
            setFilteredEvents(events);
          }}
          onIonChange={e => {
            setSearch(e.detail.value!);
            filter();
          }}
        ></IonSearchbar>

        <IonModal isOpen={showModal}>
          <IonCard>
            <IonImg src={modalEvent.image} />
            <IonCardHeader>
              <IonCardSubtitle>By {modalEvent.organiser}</IonCardSubtitle>
              <IonCardTitle>{modalEvent.name}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>{modalEvent.description}</IonCardContent>

            <IonCardContent>
            <IonIcon icon={location} /> {modalEvent.location} <br/>
            <IonIcon icon={time} /> {modalEvent.time} <br/>
            <IonIcon icon={person} /> {whosGoing}
            </IonCardContent>

            <IonCardContent>
              <IonSegment value={userIsGoing} onIonChange={e => updateEventStatus(e.detail.value!, modalEvent.id)}>
                <IonSegmentButton value="yes">
                  <IonLabel>Going</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value="no">
                  <IonLabel>Not Going</IonLabel>
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
              <IonIcon icon={location} /> {event.location} <br />
              <IonIcon icon={time} /> {event.time}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
