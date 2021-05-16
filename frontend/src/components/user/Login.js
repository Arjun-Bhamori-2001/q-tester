import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from '../../actions/userActions'

const Login = ({ history, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);


    useEffect(() => {

        if (isAuthenticated) {
            history.push("/profile")
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 red">

                                <div className="login-box">

                                  
						
								    <div className="login-form-box">


										<h1>Login</h1>
										<form onSubmit={submitHandler}>

											<div className="form-group">
												<label htmlFor="email_field">Email/Phone</label>
												<input 
                                                type="text" 
                                                name="email" 
                                                placeholder="Email or Phone Number" 
                                                id="email_field" 
                                                className="form-control"
                                                onChange={e => setEmail(e.target.value)}
                                                 />
											</div>



                                         <div className="form-group">
												<label htmlFor="password_field">Password</label>
												<input 
                                                type="password" 
                                                name="password" 
                                                placeholder="Password" 
                                                id="password_field" 
                                                className="form-control" 
                                                onChange={e => setPassword(e.target.value)}
                                                />
											</div>


											<div className="button-row">
												<button type="submit" className="next login-btn">Log In</button>
                                                <Link to={"/register"} className="next">create account</Link>

											</div>





										</form>

								</div>

				</div>

			</div>
		</div>
	</div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login