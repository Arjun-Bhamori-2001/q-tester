import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const Login = ({ history, location }) => {

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully')

            history.push('/profile')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, history, isUpdated])

    const submitHandler = (e) => {
        e.preventDefault();
        const data={
            'oldPassword': oldPassword,
            'password': password
        }
        dispatch(updatePassword(data))
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Update Password'} />

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12 red">

                                <div className="login-box">

                                  
						
								    <div className="login-form-box">


										<h1>Update Password</h1>
										<form onSubmit={submitHandler}>

											<div className="form-group">
												<label htmlFor="old_field">Old Password</label>
												<input 
                                                type="password" 
                                                name="oldPassword" 
                                                id="old_field" 
                                                className="update-password"
                                                onChange={e => setOldPassword(e.target.value)}
                                                 />
											</div>



                                         <div className="form-group">
												<label htmlFor="password_field">Password</label>
												<input 
                                                type="password" 
                                                name="password" 
                                                id="password_field" 
                                                className="update-password" 
                                                onChange={e => setPassword(e.target.value)}
                                                />
											</div>


											<div className="button-row">
												<button type="submit" className="next login-btn">Update</button>

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