import React,{useState,useEffect,Fragment} from "react";
import { Modal,Button,Table} from 'react-bootstrap';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants'
import Loader from "../../layout/Loader"

const ProfileAsset = ({history}) => {
 
  

  const [devices,setDevices] = useState([]);
  const [deviceShow,setDeviceShow] =  useState(false);
  const [device,setDevice] = useState({});
  const [browsers,setBrowsers] =  useState([]);
  const [browserShow,setBrowserShow] =  useState(false);
  const [browser,setBrowser] = useState({});



  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)

  useEffect(() => {

      if (user) {
          setDevices(user.devices);
          setBrowsers(user.browsers);
          
      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }


  }, [dispatch, alert, error, history, isUpdated])


 const submitHandler = (e) => {
    e.preventDefault();

    const data={
      'devices': devices,
      'browsers': browsers
    }

    dispatch(updateProfile(data))
    localStorage.setItem('tabName', 'assets');
}

  function deviceChange(e)
  {
     const key=e.target.name;
     const value=e.target.value;
     setDevice(prevValue => {
       return {
           ...prevValue,
           [key] : value
       };
     })
  }




  function browserChange(e)
  {
     const key=e.target.name;
     const value=e.target.value;
     setBrowser(prevValue => {
       return {
           ...prevValue,
           [key] : value
       };
     })
  }
  
  

  function handleDevices(index)
  {
    const no = index
    setDevices(prevValue => {
      return prevValue.filter((item,index) => {
         return index!=no;
      })
    })
   
  }

  function handleBrowsers(index)
  {
    const no = index
    setBrowsers(prevValue => {
      return prevValue.filter((item,index) => {
         return index!=no;
      })
    })
    
  }

  return (
    <Fragment>
    {!user ? <Loader />: (
      <Fragment>

    <div className="profile-tab-content">
      <div className="profile-asset-devices">
        <div className="profile-asset-table-headings">
          <h5 className="profile-asset-table-name">Devices</h5>
          <button 
          className="profile-asset-button" 
          type="button" 
          name="button"
          onClick={() => setDeviceShow(true)}
          >
            <i className="fas fa-plus-circle"></i> Add Device
          </button>
        </div>

        <div className="profile-asset-scrollIt">
          <Table className="profile-asset-table">
          <thead>
              <tr className="profile-asset-table-top">
                <th>No</th>
                <th>Brand</th>
                <th>Model</th>
                <th>OS</th>
                <th>RAM</th>
                <th>Screen</th>
                <th>Primary Network</th>
                <th>Secondary Network</th>
                <th>Action</th>
              </tr>
          </thead>
          
            {!devices?<p>No devices</p>:
              <tbody>
                {devices.map((item,index) => (
                <tr className="profile-work-single-row1">
                <td>{index+1}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.os}</td>
                <td>{item.ram}</td>
                <td>{item.screen}</td>
                <td>{item.primaryNetwork}</td>
                <td>{item.secondryNetwork}</td>
                <td>
                  <span style={{ color: "#ff0000" }} onClick={() => handleDevices(index)} >
                  <i className="fas fa-trash fa-lg"></i>
                  </span>
                </td>
              </tr>
                ))}
              </tbody>
            }
            
          </Table>
        </div>
      </div>


     {/* Devices model */}

      <Modal
        show={deviceShow}
        onHide={() => setDeviceShow(false)}
         dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-custom-modal-styling-title">
            Add a device
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

           <input name="brand" value={device.brand} onChange={(e) => deviceChange(e)} placeholder="brand" className="assets-input"/>
            <input name="model" value={device.model} onChange={(e) => deviceChange(e)} placeholder="model" className="assets-input"/>
            <input name="os" value={device.os} onChange={(e) => deviceChange(e)} placeholder="os" className="assets-input"/>
            <input name="ram" value={device.ram} onChange={(e) => deviceChange(e)} placeholder="ram" className="assets-input"/>
            <input name="screen" value={device.screen} onChange={(e) => deviceChange(e)} placeholder="screen" className="assets-input"/>
            <input name="primaryNetwork" value={device.primaryNetwork} onChange={(e) => deviceChange(e)} placeholder="primaryNetwork" className="assets-input"/>
            <input name="secondryNetwork" value={device.secondryNetwork} onChange={(e) => deviceChange(e)} placeholder="secondryNetwork" className="assets-input"/>
            <input name="action" value={device.action} onChange={(e) => deviceChange(e)} placeholder="action" className="assets-input"/>
        
        </Modal.Body>

        <Modal.Footer>
        <Button onClick={() => {

          setDevices(prevValue => {
            return [
              ...prevValue,
              device
            ];
          })
          setDevice({});
          setDeviceShow(false);

        }}>Submit</Button>
        </Modal.Footer>

      </Modal>




      <div className="profile-asset-browsers">
        <div className="profile-asset-table-headings">
          <h5 className="profile-asset-table-name">Browsers</h5>
          <button className="profile-asset-button" type="button" name="button"  onClick={() => setBrowserShow(true)}>
            <i className="fas fa-plus-circle"></i> Add Browser
          </button>
        </div>
        <div className="profile-asset-scrollIt">
          <Table className="profile-asset-table">
          <thead>
            <tr className="profile-asset-table-top">
              <th>No</th>
              <th>Browser</th>
              <th>Version</th>
              <th>OS</th>
              <th>OS Version</th>
              <th>Action</th>
            </tr>
          </thead>
          {!browsers?<p>No Browser</p>:
              <tbody>
                {browsers.map((item,index) => (
              
                <tr className="profile-work-single-row1">
                <td>{index+1}</td>
                <td>{item.browser}</td>
                <td>{item.version}</td>
                <td>{item.os}</td>
                <td>{item.osVersion}</td>
                <td>
                <span style={{ color: "#ff0000" }} onClick={() => handleBrowsers(index)} >
                  <i className="fas fa-trash fa-lg"></i>
                  </span>
                </td>
                </tr>
                ))}
              </tbody>
            }
          </Table>
        </div>
      </div>


      {/* Browsers model */}


     

      <Modal
        show={browserShow}
        onHide={() => setBrowserShow(false)}
         dialogClassName="modal-50w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-custom-modal-styling-title">
            Add a Browser
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

           <input name="browser" value={browser.browser} onChange={(e) => browserChange(e)} placeholder="browser" className="assets-input"/>
            <input name="version" value={browser.version} onChange={(e) => browserChange(e)} placeholder="version" className="assets-input"/>
            <input name="os" value={browser.os} onChange={(e) => browserChange(e)} placeholder="os" className="assets-input"/>
            <input name="osVersion" value={browser.osVersion} onChange={(e) => browserChange(e)} placeholder="osVersion" className="assets-input"/>
            <input name="action" value={browser.action} onChange={(e) => browserChange(e)} placeholder="action" className="assets-input"/>
        
        </Modal.Body>

        <Modal.Footer>
        <Button onClick={() => {

          setBrowsers(prevValue => {
            return [
              ...prevValue,
              browser
            ];
          })
          setBrowser({});
          setBrowserShow(false);

        }}>Submit</Button>
        </Modal.Footer>

      </Modal>


      <Button type="submit" size="lg" className="btn btn-primary profile-btn" name="button" onClick={submitHandler}>
              Submit
      </Button>
    </div>
    </Fragment>
    )}
    </Fragment>
  );
};

export default ProfileAsset;
