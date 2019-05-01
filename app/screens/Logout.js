'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-button';


import ViewContainer from '../components/ViewContainer'
import Login from './Login';
import Common from '../components/Common';

export default class Logout extends Component {
  constructor(props) {
    super(props);
    Common.AccessToken = '';
  }
  render() {
    console.log(Common.AccessToken);
    if (Common.AccessToken == '') {

      return(<Login />);
    }
    else {
      return(
        <ViewContainer >

        </ViewContainer>
      );
    }

  }

}

var styles = StyleSheet.create({

});
