import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import * as firebase from "firebase/app"; //star means import everything 
import "firebase/auth";
//Pages
import CreateAccount from "./containers/CreateAccount";
import Login from "./containers/Login";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";
//Styles
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); //dont want to display info before ready
  const [userInformation, setUserInformation] = useState({});

  //firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCbEThF1_Y2B1XzRwrf5DJ6jod9RhjrvJI",
    authDomain: "exercise-five-2e926.firebaseapp.com",
    databaseURL: "https://exercise-five-2e926.firebaseio.com",
    projectId: "exercise-five-2e926",
    storageBucket: "exercise-five-2e926.appspot.com",
    messagingSenderId: "1020842283651",
    appId: "1:1020842283651:web:a3158eb924b12eebb7c1b6"
  };
  //ensure app is initialized when it is ready to be
  useEffect(() => {
    //ensure firebase is not initialized more than once
    if (!firebase.apps.length) { //if there is no length, then initialize
      //initialize firebase
      firebase.initializeApp(firebaseConfig);
    }
    //setting auth to be persistent in SESSION storage, not cookies
    //you can also use cookies with firebase but we are using session storage because it is easier to work with 
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function (e) {
        console.log("Instantiating AUTH ERROR");
      });
  }, [firebaseConfig]);

  // Cheack to see if user is logged in
  //user loads page, check their status, set state accordingly
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      //logged in
      if (user) {
        setLoggedIn(true);
        setUserInformation(user);
      }
      //not logged in
      else {
        setLoggedIn(false);
        setUserInformation({});
      }
      setLoading(false);
    })
  }, []);

  //login
  function LoginFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("LOGIN RESPONSE", response);
        setLoggedIn(true);
      })
      .catch(function (error) {
        console.log("LOGIN ERROR", error);
      })
  }

  //logout
  function LogoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setLoggedIn(false)
      })
      .catch(function (error) {
        console.log("LOGOUT ERROR", error);
      })
  }

  //create account
  function CreateAccountFunction(e) {
    e.preventDefault(); //prevents form from submitting as default form
    //console.log("form payload", e);
    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;
    // console.log('email', email);
    // console.log('password', password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response) {
        console.log("VALID ACCOUNT CREATE", response);
        setLoggedIn(true);
      })
      .catch(function (e) {
        console.log("CREATE ACCOUNT ERROR");
      })
  }

  return (
    <div className="App">
      <Header LogoutFunction={LogoutFunction} isLoggedIn={loggedIn} />
      <Router>
        <Route exact path="/">
          {//!loading &&
            !loggedIn ? (<Redirect to="/login" />
            ) : (
                < UserProfile userInformation={userInformation} />)
          }
        </Route>
        <Route exact path="/login">
          {//!loading &&
            !loggedIn ? (<Login LoginFunction={LoginFunction} />
            ) : (
                <Redirect to="/" />)
          }
        </Route>
        <Route exact path="/create-account">
          {//!loading && 
            !loggedIn ? (
            <CreateAccount CreateAccountFunction={CreateAccountFunction} />
          ) : (<Redirect to="/"/>)
          }
        </Route>
      </Router>
    </div>
  );
}

export default App;
