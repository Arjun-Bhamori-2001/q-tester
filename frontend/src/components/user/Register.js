import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import ProgressBar from "../layout/ProgressBar";
import csc from "country-state-city"

import VisibilityIcon from '@material-ui/icons/Visibility';


const Register = ({ history }) => {

  const countriesList=csc.getAllCountries()
  const languageList = ["Hindi","English","French","German","Spanish","Chinese","Arabic"]

  const dispatch = useDispatch();
  const alert = useAlert();

  
  const {user, isAuthenticated, error} = useSelector((state) => state.auth);

  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(user){
      history.push("/profile")
    }
      

  }, [dispatch, alert, error, history,isAuthenticated]);

  const [num, setNum] = useState(1);
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Male");
  const [skypeId, setSkypeId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCode, setPhoneCode] = useState("91");
  const [country, setCountry] = useState("India");
  const [stateList,setStateList] = useState(csc.getStatesOfCountry("IN"))
  const [state, setState] = useState("Uttar Pradesh");
  const [cityList,setCityList] = useState(csc.getCitiesOfState("IN","UP"));
  const [city, setCity] = useState("Varanasi");
  const [metropolis, setMetropolis] = useState("");
  const [briefUser, setBriefUser] = useState("");
  const [isAvailable, setIsAvailable] = useState("No");
  const [languagues, setLanguagues] = useState([]);
  const [pastype,setPastype] =  useState("password");
  const [companyName,setCompanyName] =  useState("");



  function handleSubmit(e){
    e.preventDefault();

    const data ={
      'fName': fName,
      'lName': lName,
      'email': email,
      'password': password,
      'birthDate':birthDate,
      'gender': gender,
      'skypeId': skypeId,
      'phoneNumber': phoneNumber,
      'country': country,
      'state': state,
      'city': city,
      'metropolis': metropolis,
      'briefUser': briefUser,
      'isAvailable': isAvailable,
      'languagues': languagues
    }
    dispatch(register(data));

  }

  function handleCountry(e){
    
    const tmp=e.target.value;
    setCountry(tmp)

    countriesList.map(item => {
      if(item.name === tmp){
        setPhoneCode(item.phonecode)
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


  function  handleLanguage(e)
  {
    const check = e.target.checked;
    const name = e.target.name;
    if(check === true){
           setLanguagues(prevValue => {
             return [
               ...prevValue,
                name
             ];
           })
      }
    else{
          setLanguagues(prevValue => {
            return prevValue.filter(item =>  item!=name )
          })
    }
   
  }

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className="container-fluid" style={{padding : "0"}}>
        <div className="row">
          <div className="col-xl-12">
            <div className="multistep-container">
              <div className="mutistep-form-area">
                <div
                  className="form-box"
                  style={{ display: num != 1 ? "none" : "table" }}
                >
                  {/* <ProgressBar title="Sign up" b1="active" b2="" b3="" /> */}
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="fName_field">First Name</label>
                      <input
                        type="text"
                        name="fName"
                        id="fName_field"
                        value={fName}
                        onChange={(e) => setfName(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="lName_field">Last Name</label>
                      <input
                        type="text"
                        name="lName"
                        id="lName_field"
                        value={lName}
                        onChange={(e) => setlName(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email_field">Email</label>
                      <input
                        type="text"
                        name="email"
                        id="email_field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="form-group" >
                      <label htmlFor="password_field">Password</label>
                      <input
                        type={pastype}
                        name="password"
                        id="password_field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control "
                        required
                      />
                      
                        <VisibilityIcon onClick={(e) => {
                          e.preventDefault();
                          if(pastype==="password"){
                            setPastype("text");
                          }
                          else{
                            setPastype("password");
                          }
                        }}
                        className="password-icon"
                        />
                      
                    </div>


                    <div className="button-row">
                      <input
                        type="button"
                        value="Next"
                        className="next"
                        onClick={() => setNum(2)}
                      />
                    </div>
                  </form>
                </div>

                <div
                  className="form-box"
                  style={{ display: num != 2 ? "none" : "table" }}
                >
                  {/* <ProgressBar
                    title="Personal Information"
                    b1="active"
                    b2="active"
                    b3=""
                  /> */}
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="Birth_Date_field">Birth Date</label>
                      <input
                        type="date"
                        name="birthDate"
                        id="Birth_Date_field"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>


                    <div className="form-group">
                      <label htmlFor="gender_Field">Gender</label>
                      <select
                        className="custom-select myinput"
                        name="gender"
                        id="gender_Field"
                        value={gender}
                        className="form-control"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>


                    <div className="form-group">
                      <label htmlFor="skypeId_field">skypeId</label>
                      <input
                        type="text"
                        name="skypeId"
                        id="skypeId_field"
                        value={skypeId}
                        onChange={(e) => setSkypeId(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>


                     <div className="form-group">
                     
                    <label htmlFor="country_field">Country</label>
                        <select
                            id="country_field"
                            className="form-control"
                            value={country}
                            onChange={handleCountry}
                            required
                        >

                            {countriesList.map(item => {
                                return (<option key={item.name} value={item.name} >
                                    {item.name}
                                </option>);
                            })}

                        </select>
                    </div> 
   

                    
                    <div className="form-group">
                    <label htmlFor="state_field">State</label>
                        <select
                            id="state_field"
                            className="form-control"
                            value={state}
                            onChange={handleState}
                            required
                        >
                            {stateList.map(item => {
                               
                                return (<option key={item.name} value={item.name}>
                                    {item.name}
                                </option>);
                            })}
                        </select>
                    </div>


                    <div className="form-group">
                    <label htmlFor="city_field">City</label>
                        <select
                            id="city_field"
                            className="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        >
                            {cityList.map(item => {
                          
                                return (<option key={item.name} value={item.name}>
                                    {item.name}
                                </option>);
                            })}
                        </select>
                    </div>




                    
                    <div className="form-group">
                      <label htmlFor="phoneNo_field">Phone Number</label>
                      <div>
                        <div className="side-box">{phoneCode}</div>
                        <input
                          type="text"
                          name="phoneNo"
                          id="phoneNo_field"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="form-control small-input"
                          required
                        />
                      </div>
                    </div>



                    <div className="form-group">
                      <label htmlFor="metropolis_field">Metropolis</label>
                      <input
                        type="text"
                        name="metropolis"
                        id="metropolis_field"
                        value={metropolis}
                        onChange={(e) => setMetropolis(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>

                    <hr />

                    

                    <div className="button-row">
                      <input
                        type="button"
                        value="Previous"
                        className="previous"
                        onClick={() => setNum(1)}
                      />
                      <input
                        type="button"
                        value="Next"
                        className="next"
                        onClick={() => setNum(3)}
                      />
                    </div>
                  </form>
                </div>

                <div
                  className="form-box"
                  style={{ display: num != 3 ? "none" : "table" }}
                >
                  {/* <ProgressBar
                    title="Technical background"
                    b1="active"
                    b2="active"
                    b3="active"
                  /> */}
                  <form onSubmit={handleSubmit} >
                     <div className="form-group">
                      <label htmlFor="{briefUser_field">About you</label>
                      <input
                        type="text"
                        name="briefUser"
                        id="briefUser_field"
                        value={briefUser}
                        onChange={(e) => setBriefUser(e.target.value)}
                        className="form-control"
                      />
                    </div>


                   
                   


                    <div className="form-group">
                      <label htmlFor="sAvailable_field">
                      Are u currently an active member of any other
                      crowdsourcing testing.
                      </label>
                      <select
                        className="custom-select myinput"
                        name="isAvailable"
                        id="sAvailable_field"
                        value={isAvailable}
                        className="form-control"
                        onChange={(e) => setIsAvailable(e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                   
                   
                    {isAvailable === "Yes"&&(

                      <div className="form-group" >
                      <label htmlFor="companyName_field">Where</label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName_field"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="form-control "
                        required
                      />
                      </div>

                    )}


                  <div className="form-group">
                  <label htmlFor="language_field">
                    Languages
                  </label>
                  <div>
                      {languageList.map(item => {
                          return (
                            <div className="language">
                                <input
                                  type="checkbox"
                                  name={item}
                                  onChange={(e) => handleLanguage(e)}
                                />
                                <label>{item}</label>
                            </div>
                          );
                      })}
                    </div>
                  </div>
                    



                    <div className="button-row">
                      <input
                        type="button"
                        value="Previous"
                        className="previous"
                        onClick={() => setNum(2)}
                      />
                      <input type="submit" value="Submit" className="submit" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;