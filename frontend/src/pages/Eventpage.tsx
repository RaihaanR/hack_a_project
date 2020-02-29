import React from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonImg
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Eventpage.css";

const ContentExample: React.FC = () => (
  <IonContent
    scrollEvents={true}
    onIonScrollStart={() => {}}
    onIonScroll={() => {}}
    onIonScrollEnd={() => {}}
  >
    <h1>Main Content</h1>

    <div slot="fixed">
      <h1>Fixed Content</h1>
    </div>
  </IonContent>
);

const Event: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>An Event Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">an Event page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonFooter className="ion-no-border">
          <IonToolbar>
            <IonTitle>Footer - No Border</IonTitle>
          </IonToolbar>
        </IonFooter>

        <ExploreContainer name="Event page" />
      </IonContent>
    </IonPage>
  );
};

export default Event;
