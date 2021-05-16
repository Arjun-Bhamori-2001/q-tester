import React, { useState, useEffect,Fragment } from "react";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants'
import Loader from "../../layout/Loader"


//import langmap from "langmap";

import csc from "country-state-city";

const ProfilePersonal = ({history}) => {

  const countriesList=csc.getAllCountries()

  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [experience, setExperience] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [stateList,setStateList] = useState(csc.getStatesOfCountry("IN"))
  const [state, setState] = useState("Uttar Pradesh");
  const [cityList,setCityList] = useState(csc.getCitiesOfState("IN","UP"));
  const [city, setCity] = useState("");
  const [skypeId, setSkypeId] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");


  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)
  
  
  useEffect(() => {

    if (user) {
        setfName(user.fName);
        setlName(user.lName);
        setEmail(user.email);
        setGender(user.gender);
        setPhoneNumber(user.phoneNumber);
        setCountry(user.country);
        setState(user.state);
        setCity(user.city);
        setSkypeId(user.skypeId);
        setRole(user.role);
        setLinkedinProfile(user.linkedinProfile);
        setAge(user.age);
        setExperience(user.experience)
    }

    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }


}, [dispatch, alert, error, history, isUpdated])


  function handleCountry(e){
    
    const tmp=e.target.value;
    setCountry(tmp)

    countriesList.map(item => {
      if(item.name === tmp){
        setStateList(csc.getStatesOfCountry(item.isoCode))
      }
    })

  }


  function handleState(e){
    const tmp=e.target.value;
    setState(tmp)

    stateList.map(item => {
      if(item.name === tmp){
        setCityList(csc.getCitiesOfState(item.countryCode,item.isoCode))
      }
    })

  }

  function submitHandler(e)
  {
    e.preventDefault();

    const data={
      'fName': fName,
      'lName': lName,
      'email': email,
      'gender': gender,
      'skypeId': skypeId,
      'phoneNumber': phoneNumber,
      'country': country,
      'state': state,
      'city': city,
      'linkedinProfile': linkedinProfile,
      'role': role,
      'age': age,
      'experience': experience
    }
    dispatch(updateProfile(data));
    localStorage.setItem('tabName', 'personal');
   
  }


  return (
    <Fragment>
    {!user?<Loader />:(
      <Fragment>
         
      <Form className="profile-tab-content">
      <Row>
        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            className="profile-personal-form-inputs"
            type="text"
            placeholder="First Name"
            value={fName}
            onChange={(e) => setfName(e.target.value)}
          />
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            className="profile-personal-form-inputs"
            type="text"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setlName(e.target.value)}
          />
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Row>
            <Col>
              <Form.Label>Age</Form.Label>
              <Form.Control
                className="profile-personal-form-inputs"
                type="number"
                min="1"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                className="profile-personal-form-inputs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Col>
          </Row>
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Email ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email ID"
            className="profile-personal-form-inputs"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Role"
            className="profile-personal-form-inputs"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </Col>
{/* 
        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Spoken Language</Form.Label>
          <Form.Control
            type="text"
            placeholder="Spoken Language"
            className="profile-personal-form-inputs"
            value={spokenLanguages}
            onChange={(e) => setSpokenLanguages(e.target.value)}
          />
        </Col> */}

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Experience"
            className="profile-personal-form-inputs"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            length="10"
            placeholder="Phone Number"
            className="profile-personal-form-inputs"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>Country</Form.Label>
          <Form.Control
            as="select"
            className="profile-personal-form-inputs"
            value={country}
            onChange={(e) => handleCountry(e)}
          >
            
                {countriesList.map(item => {
                  return (<option key={item.name} value={item.name} >
                      {item.name}
                  </option>);
                })}

          </Form.Control>
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>State</Form.Label>
          <Form.Control
            as="select"
            placeholder="State"
            className="profile-personal-form-inputs"
            value={state}
            onChange={(e) => handleState(e)}
          >
             {stateList.map(item => {               
                return (<option key={item.name} value={item.name}>
                    {item.name}
                </option>);
            })}
          </Form.Control>
        </Col>

        <Col xs={6} lg={4} className="profile-personal-form-sections">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            placeholder="City"
            className="profile-personal-form-inputs"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            {cityList.map(item => {
                  return (<option key={item.name} value={item.name}>
                    {item.name}
                </option>);
            })}
          </Form.Control>
        </Col>

        <Col xs={12} lg={6} className="profile-personal-form-sections">
          <Form.Label>SkypeID</Form.Label>
          <Form.Control
            type="text"
            placeholder="SkypeID"
            className="profile-personal-form-inputs"
            value={skypeId}
            onChange={(e) => setSkypeId(e.target.value)}
          />
        </Col>

        <Col xs={12} lg={6} className="profile-personal-form-sections">
          <Form.Label>LinkedIn Profile</Form.Label>
          <Form.Control
            type="text"
            placeholder="LinkedIn Profile"
            className="profile-personal-form-inputs"
            value={linkedinProfile}
            onChange={(e) => setLinkedinProfile(e.target.value)}
          />
        </Col>
      </Row>

      <Button type="submit" size="lg" className="btn btn-primary" name="button" onClick={submitHandler}>
        Submit
      </Button>
    </Form>

      </Fragment>
    )}
    
    </Fragment>
  );
};

export default ProfilePersonal;