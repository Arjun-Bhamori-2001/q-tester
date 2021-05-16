// import { Button } from "bootstrap";
import React,{useState,useEffect} from "react";
import { Col, Form, Row,Button } from "react-bootstrap";
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../../actions/userActions'

const ProfileSkill = () => {

  const domainKnowledgeList = ["Automobile","BFSI","E-Commerce","Embeded","Health Care","Telecom"]
  const [domainKnowledge,setDomainKnowledge] = useState([])

  const testingList = ["API Testing","Automation Testing","Game Testing","Localisation Testing","Manual Testing","Performance Testing","Security Testing(Sc)","Usability Testing(UX)"]
  const [typeOfTesting,setTypeOfTesting] = useState([])

  
  const toolsList = ["Appium","Git","Jemeter","Load Runner","QTP","Robotium","Sahi","Selenium"]
  const [testingTools,setTestingTools] = useState([])

  const applicationsList = ["Android","Desktop","iOS","Web"]
  const [applicationsTested,setApplicationsTested] = useState([])


  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading: authLoading} = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)
  
  
  useEffect(() => {

    if (authLoading === false&&user) {
       
      //  console.log(user.domainKnowledge)
        setDomainKnowledge(user.domainKnowledge)
        setTypeOfTesting(user.typeOfTesting)
        setTestingTools(user.testingTools)
        setApplicationsTested(user.applicationsTested)
        
        user.domainKnowledge.map(item => {
          document.getElementById(item).checked = true;
        })
        
        user.typeOfTesting.map(item => {
          document.getElementById(item).checked = true;
        })
    
        user.testingTools.map(item => {
          document.getElementById(item).checked = true;
        })
    
        user.applicationsTested.map(item => {
          document.getElementById(item).checked = true;
        })
    
    }

    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }
 
}, [dispatch, alert, error,authLoading,user])


  

  function handleDomain(e)
  {
    const check = e.target.checked;
    const name = e.target.name;
    if(check === true){
           setDomainKnowledge(prevValue => {
             return [
               ...prevValue,
                name
             ];
           })
      }
    else{
          setDomainKnowledge(prevValue => {
            return prevValue.filter(item =>  item!=name )
          })
    }
    
  }



  function handleToolsTesting(e)
  {
    const check = e.target.checked;
    const name = e.target.name;
    if(check === true){
           setTestingTools(prevValue => {
             return [
               ...prevValue,
                name
             ];
           })
      }
    else{
          setTestingTools(prevValue => {
            return prevValue.filter(item =>  item!=name )
          })
    }
   
    
  }



  
  function  handleTypeOfTesting (e)
  {
   
    const check = e.target.checked;
    const name = e.target.name;
    if(check === true){
           setTypeOfTesting(prevValue => {
             return [
               ...prevValue,
                name
             ];
           })
      }
    else{
          setTypeOfTesting(prevValue => {
            return prevValue.filter(item =>  item!=name )
          })
    }
    
  }




  function  handleApplications(e)
  {
   
    const check = e.target.checked;
    const name = e.target.name;
    if(check === true){
          setApplicationsTested(prevValue => {
             return [
               ...prevValue,
                name
             ];
           })
      }
    else{
         setApplicationsTested(prevValue => {
            return prevValue.filter(item =>  item!=name )
          })
    }
    
  }
  

  function handleSubmit(e){
    e.preventDefault();
    const data={
      'domainKnowledge': domainKnowledge,
      'typeOfTesting': typeOfTesting,
      'testingTools': testingTools,
      'applicationsTested': applicationsTested
    }
    dispatch(updateProfile(data))
    localStorage.setItem('tabName', 'skills');
  }



  return (
    <div className="profile-tab-content profile-asset-body">
      <h5 className="profile-skill-heading">Domain Knowledge</h5>
      <Row className="profile-skill-section">

          {domainKnowledgeList.map(item => {
            return (
              <Col className="profile-skill-checkbox-main" xs={6} md={4}>
                <Form.Check>
                  <input
                    type="checkbox"
                    className="form-check-input profile-skill-checkbox-input"
                    name={item}
                    id={item}
                    onChange={(e) => handleDomain(e)}
              
                  />
                  <label className="form-check-label">{item}</label>
                </Form.Check>
              </Col>
            );
          })}
        
      </Row>

      <h5 className="profile-skill-heading">Type of Testing</h5>
      <Row className="profile-skill-section">

      {testingList.map(item => {
            return (
              <Col className="profile-skill-checkbox-main" xs={6} md={4}>
                <Form.Check>
                  <input
                    type="checkbox"
                    className="form-check-input profile-skill-checkbox-input"
                    name={item}
                    id={item}
                    onChange={(e) => handleTypeOfTesting(e)}
                  />
                  <label className="form-check-label">{item}</label>
                </Form.Check>
              </Col>
            );
          })}
       
      </Row>

      <h5 className="profile-skill-heading">Testing Tools Used</h5>
      <Row className="profile-skill-section">

           {toolsList.map(item => {
              return (
                <Col className="profile-skill-checkbox-main" xs={6} md={4}>
                  <Form.Check>
                    <input
                      type="checkbox"
                      className="form-check-input profile-skill-checkbox-input"
                      name={item}
                      id={item}
                      onChange={(e) => handleToolsTesting(e)}
                    />
                    <label className="form-check-label">{item}</label>
                  </Form.Check>
                </Col>
              );
            })}
    
      </Row>

      <h5 className="profile-skill-heading">Applications Tested</h5>
      <Row className="profile-skill-section">


        
      {applicationsList.map(item => {
              return (
                <Col className="profile-skill-checkbox-main" xs={6} md={4}>
                  <Form.Check>
                    <input
                      type="checkbox"
                      className="form-check-input profile-skill-checkbox-input"
                      name={item}
                      id={item}
                      onChange={(e) => handleApplications(e)}
                      // checked={applicationsTested.find(item) ? true: false}
                    />
                    <label className="form-check-label">{item}</label>
                  </Form.Check>
                </Col>
              );
            })}


      </Row>

      <Button type="submit" size="lg" className="btn btn-primary profile-btn" name="button" onClick={handleSubmit}>
              Submit
      </Button>
    </div>
  );
};

export default ProfileSkill;
