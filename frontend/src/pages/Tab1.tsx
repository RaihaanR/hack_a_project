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

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const form = <IonInput></IonInput>;

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

        <IonModal isOpen={showModal}>
          <IonCard>
            <h1 className="ion-text-center">New Event</h1>
          </IonCard>
          <IonCard>
            <IonItem>
              <IonLabel>Event Name:</IonLabel>
              <IonInput placeholder="Enter Name"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Date:</IonLabel>
              <IonInput placeholder="when is it"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Location: </IonLabel>
              <IonInput placeholder="where is this event"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Event Description: </IonLabel>
              <IonInput placeholder="Describe Your event"></IonInput>
            </IonItem>
          </IonCard>
          <IonButton onClick={() => setShowModal(false)}>Submit</IonButton>
          <IonButton onClick={() => setShowModal(false)}>Cancle</IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
