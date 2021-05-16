import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {loadUser,clearErrors} from "./actions/userActions" 




import Home from './components/Home'

// Auth or User imports
import Login from './components/user/Login'
import Register from './components/user/Register'
import Profile from "./components/user/Profile"
import UpdatePassword from "./components/user/UpdatePassword"
import Header from "./components/layout/Header"









function App() {


  const dispatch = useDispatch();
  const {isDeleted} = useSelector(state => state.user)

  useEffect(() => {

    dispatch(loadUser())
    
}, [dispatch,isDeleted])

  return (
    <Router>
      <div >
          <Route render={({ history }) => <Header history={history} />} />
          <Route path="/" component={Home} exact />
      

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/profile" component={Profile} />
          <Route path="/password/update" component={UpdatePassword} />

      </div>
    </Router>
  );
}

export default App;
