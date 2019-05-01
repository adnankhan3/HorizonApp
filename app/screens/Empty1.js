'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-button';


import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class Empty extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <ViewContainer >

      </ViewContainer>
    );
  }

}

var styles = StyleSheet.create({

});


module.exports = Empty;
