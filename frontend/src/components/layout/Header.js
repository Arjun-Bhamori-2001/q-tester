import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import {Navbar,Nav,Form,FormControl,Button} from "react-bootstrap"

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {logout} from "../../actions/userActions"



import '../../App.css'

const Header = ({history}) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);


    const logoutHandler = () => {
         dispatch(logout());
         alert.success('Logged out successfully.')
         history.push("/login");
         localStorage.removeItem("tabName")
  }

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                <img src="/images/Q.png" class="logo" />
                </Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Form inline>
                {user&&(
                    <Button variant="outline-info" onClick={logoutHandler}>Logout</Button>
                )}
                </Form>
            </Navbar>
        </Fragment>
    )
}

export default Header
