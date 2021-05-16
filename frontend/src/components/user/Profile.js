import React, { Fragment, useState, useEffect } from "react";

import { useAlert } from "react-alert";
import { useDispatch,useSelector } from "react-redux";
import {Link,Route} from "react-router-dom"
import {logout} from "../../actions/userActions"
import Loader from "../layout/Loader"
import {Col,Row,Container} from "react-bootstrap";
import ProfileLeft from "./profileComponents/ProfileLeft"
import ProfileRight from "./profileComponents/ProfileRight"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { updateProfile, loadUser, clearErrors } from '../../actions/userActions'

const Profile = ({ history }) => {

  const alert = useAlert();
  const dispatch = useDispatch();
    
  
  const {  isUpdated } = useSelector(state => state.user)

  const { user, error, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

   useEffect(() =>{
    if(isAuthenticated === false && !user){
      history.push("/login")
    }
    if(isUpdated){
      alert.success("Updated Successfully")
      dispatch(loadUser());

        // history.push('/profile')

        dispatch({
            type: UPDATE_PROFILE_RESET
        })
      
    }

  
   },[user,isUpdated])

  

  return (
    <Fragment>
      
            <Container fluid className="profile-body">
            <Row>
              <Col md={3} className="profile-left">
              <Route render={({ history }) => <ProfileLeft history={history} />} />
              </Col>

              <Col md={9}>
              <Route render={({ history }) => <ProfileRight history={history} />} />
              </Col>
            </Row>
          </Container>
      
    </Fragment>
  );
};

export default Profile;