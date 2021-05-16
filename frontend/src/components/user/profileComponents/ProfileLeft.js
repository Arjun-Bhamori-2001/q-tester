import React,{useEffect,Fragment} from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
  Button,
} from "react-bootstrap";
import {Link} from "react-router-dom"
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "../../layout/Loader"
import { DELETE_USER_RESET } from '../../../constants/userConstants'
import Rating from "./Rating";
import {deleteUser,clearErrors} from "../../../actions/userActions"

const ProfileLeft = ({ history}) => {



  
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const {isDeleted,error} = useSelector(state => state.user);

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isDeleted){
       alert.success("Account Deleted")
       history.push("/register")
       dispatch({
        type: DELETE_USER_RESET
    })
    }

  },[dispatch,alert,isDeleted,history])

  function handleClick()
  {
        dispatch(deleteUser());
  }

  return (
    <Fragment>
      {!user?<Loader />:(
          <Fragment>

              <Container fluid className="profile-left-content text-center">
            <Row className="profile-left-row   justify-content-center">
              <Col xs={12} className="profile-image-col profile-left-col ">
                <Image
                  src="images/default_avatar.jpg"
                  className="profile-pic"
                />
              </Col>
        
              <Col xs={12} className="profile-left-col">{user.fName}</Col>
            
              <Col xs={12} className="profile-left-col">
                <Rating value={3} />
              </Col>
          </Row>

          <Row className="profile-left-row ">
            <Col>
            <span style={{float:"left"}}>Profile Strength</span><span style={{float:"right"}}>60%</span>
              <ProgressBar style={{clear:"both"}}
                variant="warning"
                now={60}
                className="custom-profile-progress"
              />
            </Col>
          </Row>

          <Row className="profile-left-row ">
            
              <Col xs={12} className="profile-left-col">
                <span style={{ color: "#008000" }}>
                  <i className="fas fa-briefcase fa-3x"></i>
                </span>
              </Col>
              <Col xs={12} className="profile-left-col">{user.role}</Col>
            
          </Row>

          <Row className="profile-left-row ">
            <Col><Link to="/password/update">
              <Button variant="dark" href="https://www.google.co.in/">
                Update Password
              </Button>
              </Link>
            </Col>
          </Row>


          <Row className="profile-left-row ">
            <Col sm={12} className="profile-left-col">
            
            
            <span style={{ color: "#ff0000" }} onClick={handleClick}>
              <i className="fas fa-trash fa-lg"></i>
              </span>
                
            </Col>
            <Col sm={12} className="profile-left-col">Delete Account</Col>
          </Row>

        </Container>

          </Fragment>
      )}
    </Fragment>
    
  );
};

export default ProfileLeft;
