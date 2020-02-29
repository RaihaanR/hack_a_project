import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonButton,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonModal,
  IonImg,
  IonInput
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { getClassName } from "@ionic/react/dist/types/components/utils";

let server = "https://5498e4a8.ngrok.io/";

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const form = <IonInput></IonInput>;

  type Event = {
    //id: number;
    image: string;
    organiser: string;
    name: string;
    location: string;
    description: string;
    time: string;
  };

  var name: string;
  var organiser: string;
  var location: string;
  var time: string;
  var image: string;
  var description: string;

  function addEvent() {
    console.log("whyyy");
    fetch(server + "events", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        organiser: organiser,
        location: location,
        time: time,
        image: image,
        description: description
      })
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hi, Organizers!</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <IonFab vertical="center" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon name="add" />
          </IonFabButton>
        </IonFab>

        <IonCard onClick={() => setShowModal(true)}>
          <IonCardHeader>
            <IonCardSubtitle></IonCardSubtitle>
            <IonCardTitle>Add Your New Event Now!</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonIcon />
            <br />
            <IonIcon />
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle></IonCardSubtitle>
            <IonCardTitle>Follower: 10</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonIcon />
            <br />
            <IonIcon />
          </IonCardContent>
        </IonCard>

        <IonModal isOpen={showModal}>
          <IonCard>
            <h1 className="ion-text-center">New Event</h1>
          </IonCard>
          <IonCard>
            <IonItem>
              <IonLabel>Event Name:</IonLabel>
              <IonInput
                placeholder="Enter Name"
                onIonChange={e => (name = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Date:</IonLabel>
              <IonInput
                placeholder="when is it"
                onIonChange={e => (time = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Organizers: </IonLabel>
              <IonInput
                placeholder="Enter the Organizer Name"
                onIonChange={e => (organiser = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Location: </IonLabel>
              <IonInput
                placeholder="where is this event"
                onIonChange={e => (location = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Description: </IonLabel>
              <IonInput
                placeholder="Describe Your event"
                onIonChange={e => (description = e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event image: </IonLabel>
              <IonInput
                placeholder="Add your Image url"
                onIonChange={e => (image = e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonCard>
          <section>
            {/* <header>Small Size</header>
            <IonButton size="large">Default</IonButton>
            <IonButton size="large">Secondary</IonButton> */}
            <IonFab vertical="center" horizontal="center" slot="fixed">
              <IonFabButton>
                <IonIcon name="share" />
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton>
                  <IonIcon name="logo-vimeo" />
                </IonFabButton>
              </IonFabList>
              <IonFabList side="bottom">
                <IonFabButton>
                  <IonIcon name="logo-facebook" />
                </IonFabButton>
              </IonFabList>
              <IonFabList side="start">
                <IonFabButton>
                  <IonIcon name="logo-instagram" />
                </IonFabButton>
              </IonFabList>
              <IonFabList side="end">
                <IonFabButton>
                  <IonIcon name="logo-twitter" />
                </IonFabButton>
              </IonFabList>
            </IonFab>

            <IonButton
              onClick={() => {
                setShowModal(false);
                addEvent();
              }}
            >
              Cancel
            </IonButton>
            <IonButton
              className="ion-float-right"
              onClick={() => {
                setShowModal(false);
                addEvent();
              }}
            >
              Submit
            </IonButton>
          </section>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
