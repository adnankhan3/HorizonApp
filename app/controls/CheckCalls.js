'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Common from '../components/Common'

class CheckCalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true,
    }
  }
  // <View>
  //
  //   <Text style={styles.heading}>
  //     Last 3 Check Calls
  //   </Text>
  // </View>
  render() {
    
    return(
      <View style={styles.body}>

        <View style={{borderBottomWidth:1, borderColor:'#dddddd',}}>
          <Text style={styles.title}>
            Date  <Text style={styles.detail}>05-19-2016 10:40 AM</Text>
          </Text>
          <Text style={styles.title}>
            Type  <Text style={styles.detail}>Start Trip</Text>
          </Text>
        </View>
        <View style={{borderBottomWidth:1, borderColor:'#dddddd',}}>
          <Text style={styles.title}>
            Date  <Text style={styles.detail}>05-19-2016 10:40 AM</Text>
          </Text>
          <Text style={styles.title}>
            Type  <Text style={styles.detail}>Start Trip</Text>
          </Text>
        </View>
        <View style={{borderBottomWidth:1, borderColor:'#dddddd',}}>
          <Text style={styles.title}>
            Date  <Text style={styles.detail}>05-19-2016 10:40 AM</Text>
          </Text>
          <Text style={styles.title}>
            Type  <Text style={styles.detail}>Start Trip</Text>
          </Text>
        </View>

      </View>

    );
  }

}
// <View style={{ alignItems:'center'}}>
//   <Button containerStyle={styles.button} style={styles.buttonText} underlayColor='#f67a6e'  onPress={() => Global.Alert('Hello', 'Hello')}>
//     Show All Check Calls
//   </Button>
// </View>
var styles = StyleSheet.create({
  body:{
    backgroundColor:'#f9f9f9',
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
    padding:4,
    flex:1,
    textAlign: 'center',
    borderBottomWidth:1,
    borderColor:'#cccccc',
  },
  title:{
    color: '#274f79',
    fontWeight: "400",
    fontSize:16,
    padding:3,
    fontFamily:'Museo Sans',
  },
  detail:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'justify',
    fontFamily:'Museo Sans',
  },
  buttonText: {
    fontSize: 14  ,
    padding:8,
    color: 'white',
    fontFamily:'Museo Sans',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0071BC',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 5,
    marginRight:100,
    marginLeft:100,
    marginTop: 10,

    justifyContent: 'center'
  },

});

module.exports = CheckCalls;
