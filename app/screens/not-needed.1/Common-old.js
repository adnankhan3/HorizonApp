'use strict'
import React, { Component }  from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux'
import Launch from './Launch'

class Common {
  //static baseURL = 'http://149.56.178.167:9001/api';
  //static baseURL = 'http://192.168.2.6:3000/api';
  static baseURL = 'http://localhost:3000/api';
  static noImage = 'http://www.pledgeperks.com/app/no-image.png';
  static Alert(title, val){
      Alert.alert(title,val);
  }

  static GoToScreen(screen){
    switch(screen){
      case 'category':
        Actions.category();
        break;
      case 'neighborhood':
        Actions.neighborhood();
        break;
      case 'merchant':
        Actions.merchant();
        break;
      case 'fundraiser':
        Actions.fundraiser();
        break;
      case 'terms':
        Actions.terms();
        break;
      case 'logout':
        return (<Launch />);
        break;
    }

  }

  static GetOffers(by, id){
    Actions.offerlist({by:by, id:id});

  }

  static GetOfferDetails(id){
    Actions.offerdetail({id:id});

  }

  static getBusinessImageURL(data){
    var url = Common.noImage;
    if (data != null && data.logo != null && data.logo != 'NA') {
      url = data.logo;
    }
    return url;
  }
  static renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    console.log('test');
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }

  static ValidateUser(deviceid, callback)
  {
return callback(false);
    var getBy = '/Devices/authenticate';
    var API_URL = Common.baseURL + getBy ;
   fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: deviceid,
        password: ''
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log('data');
      console.log(responseData);
      if (responseData.error) {
        Common.Alert(responseData.error.statusText, responseData.error.message);
        return callback(false);
      }
      else {
        return callback(true);
      }
    })
    .catch((error) => {
      console.log('Error occured');
      console.warn(error);
      return false;
    });
  }
};

module.exports = Common;
