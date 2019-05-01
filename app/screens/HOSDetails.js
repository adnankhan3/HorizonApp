'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-button';


import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class HOSDetails extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <ViewContainer >
      <View style={styles.body}>

        <View style={{flex:1, flexDirection:'row'}}>

          <Text style={[styles.title]}>
            Load #  <Text style={styles.detail}>02130</Text>

          </Text>
          <Button containerStyle={styles.button} style={styles.buttonText} underlayColor='#5cb85c'
              onPress={() => {
                  Common.GoToScreen('checkcall');
              }}
          >
              Edit
          </Button>
        </View>
        <Text style={styles.title}>
          Driver  <Text style={styles.detail}>Ben Keller</Text>
        </Text>
        <Text style={styles.title}>
          Type  <Text style={styles.detail}>Empty Miles</Text>
        </Text>
        <Text style={styles.title}>
          Location  <Text style={styles.detail}>17269 NC Hwy 71 north,Lumber Bridge,NC,28357</Text>
        </Text>

      </View>
      </ViewContainer>
    );
  }

}

var styles = StyleSheet.create({
  body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
    borderBottomWidth:1,
    padding:10,

  },
  bodycontent:{
    alignItems:'flex-start',
    flex:1,
    flexDirection:'row'
  },
  heading:{
    color: '#7591af',
    fontSize: 25,
    fontWeight: "300",
    padding:3 ,
    flex:1,
    textAlign: 'center',
    borderBottomWidth:1,
    borderColor:'#cccccc',
  },
  title:{
    color: '#274f79',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
  },
  detail:{
    fontSize:16,
    fontWeight: "400",
    color: '#fd5f62',
    textAlign:'justify'
  },
  buttonText: {
    fontSize: 12,
    paddingLeft:6,
    paddingRight:6,
    paddingTop:4,
    paddingBottom:4,
    color: 'white',
    fontWeight:'200'
  },
  button: {
    backgroundColor: '#78CD51',
    borderColor: '#5cb85c',
    borderWidth: 1,
    borderRadius: 4,
    marginRight:10,
    marginLeft:10,
    alignSelf: 'flex-end',
  },
});


module.exports = HOSDetails;
