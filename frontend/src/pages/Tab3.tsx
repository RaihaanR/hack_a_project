import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import "./Tab3.css";

import {
  IonSearchbar,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import "./Profile.css";
import { location, time } from "ionicons/icons";

type Event = {
  id: number;
  image: string;
  organiser: string;
  name: string;
  location: string;
  description: string;
  time: string;
};

const Tab3: React.FC = () => {
  var nullEvent: Event = {
    id: -1,
    image: "",
    organiser: "null",
    name: "null",
    location: "null",
    description: "null",
    time: "null"
  };

  const [modalEvent, setModalEvent] = useState(nullEvent);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvent] = useState([nullEvent]);

  function openEvent(e: Event) {
    setModalEvent(e);
    setShowModal(true);
  }

  // useEffect(() => {
  //   fetchUserEvents();
  //   console.log(id);
  // }, []);

  const [item, setItem] = useState([]);
  let username = "DoCSoc";
  // const fetchUserEvents = async () => {
  //   const data = await fetch(`https://5498e4a8.ngrok.io/events/users/get?username=${username}/events`);
  //   //`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`

  //   const events= await data.json();
  //   console.log(events);
  // };

  useEffect(() => {
    fetch("https://5498e4a8.ngrok.io/users/DoCSoc/events")
      .then(res => res.json())
      .then(result => {
        const eventList: Event[] = [];
        (result as Event[]).forEach(element => {
          eventList.push(element);
          console.log(events);
        });
        setEvent(eventList);
      });
  }, [events.length]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DoCSoc</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Student Name</IonTitle>
          </IonToolbar>
        </IonHeader>

        <h1 className="ion-text-center">Going</h1>

        {/* <IonGrid>
          <IonRow className="ion-margin-start">
            Email: firstname.lastname@uni.ac.uk
          </IonRow>
          <IonRow className="ion-margin-start">Interests: Facebook</IonRow>
        </IonGrid> */}
        <IonSearchbar showCancelButton="always"></IonSearchbar>

        {events.map(event => (
          <IonCard>
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

export default Tab3;
