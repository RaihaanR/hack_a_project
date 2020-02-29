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
  IonIcon,
  IonText,
  IonSlides,
  IonSlide,
  IonChip,
  IonLabel
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import "./Profile.css";
import { location, time, people } from "ionicons/icons";

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
    image: "https://shilohplainfield.org/images/Blank-photo-small.png",
    organiser: "",
    name: "",
    location: "",
    description: "",
    time: ""
  };

  const [search, setSearch] = useState("");
  const [modalEvent, setModalEvent] = useState(nullEvent);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvent] = useState([nullEvent]);
  const [filteredEvents, setFilteredEvents] = useState(events);

  function openEvent(e: Event) {
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
    // fetch("https://5498e4a8.ngrok.io/events/")
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
            <IonTitle size="large">{username}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonText>
          <h1>&nbsp;&nbsp;&nbsp;Going</h1>
        </IonText>
     
        <IonSlides>
          {events.map(event => (
            <IonSlide>
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
          </IonSlide>
          ))}
        </IonSlides>

        <IonText>
          <h1>&nbsp;&nbsp;&nbsp;Profile</h1>
        </IonText>

        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Username</IonCardSubtitle>
            <IonCardTitle>{username}</IonCardTitle>
            <br/>
            <IonCardSubtitle>Name</IonCardSubtitle>
            <IonCardTitle>John Wick</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonIcon icon={location} /> London, UK <br />
            <IonIcon icon={people} /> Following 23 people
          </IonCardContent>
        </IonCard>


        {/* <IonChip>
          <IonIcon name="pin" color="primary" />
          <IonLabel>Icon Chip</IonLabel>
          <IonIcon name="close" />
        </IonChip> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
