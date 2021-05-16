import React,{useState} from "react";
import { Tab, Tabs } from "react-bootstrap";
import ProfileAsset from "./ProfileAsset";
import ProfilePersonal from "./ProfilePersonal";
import ProfileSkill from "./ProfileSkill";
import ProfileWork from "./ProfileWork";
import {Link,Route} from "react-router-dom"

const ProfileRight = () => {

  const [tab,setTab] = useState(localStorage.getItem('tabName')?localStorage.getItem('tabName'):"personal");


  return (
    <div className="profile-right-body">
      <Tabs defaultActiveKey={tab} id="uncontrolled-tab-example" >
        <Tab eventKey="personal" title="Personal" >
        <Route render={({ history }) => <ProfilePersonal history={history} />} />
        </Tab>

        <Tab eventKey="assets" title="Assets">
        <Route render={({ history }) => <ProfileAsset history={history} />} />
        </Tab>

        <Tab eventKey="skills" title="Skills">
        <Route render={({ history }) => <ProfileSkill history={history} />} />
        </Tab>

        <Tab eventKey="work-history" title="Work history">
        <Route render={({ history }) => <ProfileWork history={history} />} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProfileRight;
