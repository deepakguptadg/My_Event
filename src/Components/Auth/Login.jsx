import React, { useEffect } from 'react'
import firebaseDB from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../Context/UserData';
const Login = () => {
    const navigate = useNavigate()

    const { googleSignIn } = useUserInfo()
    const LoginSubmit = async (e) => {
        e.preventDefault()
        try {
            await googleSignIn()
                .then((result) => {
                    const user = result.user;
                    console.log('asdfasdfasdfasdfa', user)
                    const { displayName, email, emailVerified, photoURL, uid } = user;
                    const data = {
                        displayName, email, emailVerified, photoURL, uid
                    }
                    firebaseDB.child("users").child(user.uid).set(data, (err) => {
                        if (err) {
                            console.log(err)
                        } else {
                            alert('Sign In Succesfully !')
                        }
                    })
                    navigate('/')
                })
        } catch (error) {
            console.log(error)
        }
    }

    // const LoginSubmit = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(auth, provider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;
    //             console.log('token', token)
    //             localStorage.setItem('token', token)
    //             // The signed-in user info.
    //             const user = result.user;
    //             // ...
    //             console.log('user', user)
    //             const {displayName, email, emailVerified, photoURL, uid} = user;
    //             const data = {
    //                 displayName, email, emailVerified, photoURL, uid
    //             }
    //             firebaseDB.child("users").child(uid).set(data, (err) => {
    //                 if (err) {
    //                     console.log(err)
    //                 } else {
    //                     alert('Sign In Succesfully !')
    //                 }
    //             })
    //             navigate('/')
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = GoogleAuthProvider.credentialFromError(error);
    //             // ...
    //         });
    // }

    return (
        <>
            <div id="login__box" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <div class="login-box">
                    <div class="card card-outline card-primary ">
                        <div class="card-header text-center">
                            <a href="../../index2.html" class="h1"><b>Admin</b>LTE</a>
                        </div>
                        <div class="card-body">
                            <p class="login-box-msg">Sign in to start your session</p>

                            <form>
                                <div class="input-group mb-3">
                                    <input type="email" class="form-control" placeholder="Email" />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" class="form-control" placeholder="Password" />
                                    <div class="input-group-append">
                                        <div class="input-group-text">
                                            <span class="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-8">
                                        <div class="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label for="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <button type="button" class="btn btn-primary btn-block">Sign In</button>
                                    </div>
                                </div>
                            </form>

                            <div class="social-auth-links text-center mt-2 mb-3">
                                <button type='button' class="btn btn-block btn-primary">
                                    <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                                </button>
                                <button type='button' onClick={(e) => LoginSubmit(e)} class="btn btn-block btn-danger">
                                    <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                                </button>
                            </div>

                            <p class="mb-1">
                                <a href="#">I forgot my password</a>
                            </p>
                            <p class="mb-0">
                                <a href="#" class="text-center">Register a new membership</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login