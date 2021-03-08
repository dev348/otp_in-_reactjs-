import React, { Component } from 'react';
import firebase from './firebase';

export class App extends Component {
  componentDidMount () {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container",
    {
       size:"invisible",
       
    });
}

onClick() {
    const phoneNumber = '+91' + document.querySelector('input').value;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then(confirmResult => { 
      window.confirmationResult = confirmResult;
      // console.log(confirmationResult);
      console.log("OTP is sent");
      // success
       var code = prompt('Please enter your verification number', '');

    if(code === null) return;

    window.confirmationResult.confirm(code).then(function (result) {
        console.log('Authentication success', result.user);

        document.querySelector('label').textContent +=  "Authentication success"+result.user.phoneNumber;
        

    })
    .catch(error => {
      console.error('Authentication failure', error);
    });

   
    
       
        
    });
}


  render() {
    return (
      <div>
        <label></label>
       <h1> Enter the Phone Number</h1> <input></input>
        <button id="recaptcha-container" onClick={this.onClick}>
          click here
        </button>
       
      </div>
    )
  }
}

export default App
