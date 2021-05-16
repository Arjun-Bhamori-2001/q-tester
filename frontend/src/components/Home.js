import React, { Fragment, useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'


import { useDispatch, useSelector } from 'react-redux'
import {logout} from "../actions/userActions"

import MetaData from './layout/MetaData'




const Home = ({history}) => {

    const dispatch = useDispatch()

    const alert = useAlert()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    function handleClick(){
        dispatch(logout())
        alert.success("Logged out")
    }


    return (
        <Fragment>
          <MetaData title="Home Page"/>
          <div  className="box">
               
          </div>
        </Fragment>
    )
}

export default Home
