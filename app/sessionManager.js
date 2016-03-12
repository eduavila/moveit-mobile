'use strict';

import React, { AsyncStorage } from 'react-native';
import URLBuilder from './urlBuilder';

const CURRENT_USER_STORAGE_KEY = 'currentUser';

var SessionManager = {
  login: function(user) {
    return new Promise(function(resolve, reject) {
      fetch(URLBuilder.loginURL(), {
        method: 'post',
        body: JSON.stringify({user: user}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          reject(new Error(JSON.parse(response._bodyText).error)); //FixIt - Shoudn't be using the quasi private method
        }
      })
      .then(response => {
        var user = {
          name: response.user.name,
          email: response.user.email,
          avatar: response.user.gravatar_url
        }
        console.log(user);
        AsyncStorage
        .setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user))
        .then((value) => resolve(value));
      })
      .catch(error => reject(error));
    });
  },

  getCurrentUser: function() {
    return new Promise(function(resolve, reject) {
      AsyncStorage.getItem(CURRENT_USER_STORAGE_KEY)
      .then((value) => {
        if(value === null) reject(Error('No user logged in!'));
        resolve(JSON.parse(value));
      });
    });
  }
};

module.exports = SessionManager;
