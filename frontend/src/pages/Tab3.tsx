import React from "react";
import Profile from "./Profile";
import "./Tab3.css";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import "./Profile.css";

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
<<<<<<< HEAD
          <IonTitle>Your Profile</IonTitle>
=======
          <IonTitle>Profile</IonTitle>
>>>>>>> bd156f3507352727f119af806efabcc093bc3c21
        </IonToolbar>
      </IonHeader>

      <IonContent
        scrollEvents={true}
        onIonScrollStart={() => {}}
        onIonScroll={() => {}}
        onIonScrollEnd={() => {}}
      >
        <h1 className="ion-text-center">Student Name</h1>

        <IonGrid>
          <IonRow className="ion-margin-start">
            Email: firstname.lastname@uni.ac.uk
          </IonRow>
          <IonRow className="ion-margin-start">
            Interests: Facebook, Machine Learning, Computer Science
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
