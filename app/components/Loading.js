'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import ViewContainer from './ViewContainer'
import Spinner from 'react-native-loading-spinner-overlay';

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true,
    }
  }
  render() {
    return(
      <ViewContainer isWindow={true}>
        <Image source={require('../resources/frontscreen-logo.png')} style={styles.homeimage} />
        <Spinner visible={this.state.visible} />
      </ViewContainer>

    );
  }

}

var styles = StyleSheet.create({

  homeimage:{
    width: 270,
    height:80,
    marginTop:100
  },

});

module.exports = Loading;
