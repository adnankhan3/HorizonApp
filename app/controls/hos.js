'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';
//import { AnimatedCircularProgress } from 'react-native-circular-progress';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Common from '../components/Common'
import PercentageCircle from 'react-native-percentage-circle';
import { strings } from '../locales/i18n';
class hos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true,
    }
  }
  // <View>
  //
  //   <Text style={styles.heading}>
  //     Hours of Service
  //   </Text>
  // </View>

  render() {

    if(this.props.data !=null)
    {
    return(
      <View style={styles.body}>

        <View style={{padding:5, alignItems:'center', flex:1, flexDirection:'row' }}>





          <View style={{padding:10}}>

    <PercentageCircle bgcolor={"#0071BC"} borderWidth={16} radius={70} percent={this.props.data != null ? this.props.data.DailyDutyPer : 0} color={"#94f368"}>

      <Text style={styles.points}>
                  {this.props.data != null ? this.props.data.strOnDutyHrs : ''} 
                </Text>
      </PercentageCircle>  
<Text style={styles.hostext}>{strings('Home.On_Duty')} </Text>
              </View>


              <View style={{padding:10}}>

    <PercentageCircle bgcolor={"#0071BC"} borderWidth={16} radius={70} percent={this.props.data != null ? this.props.data.DriverPer : 0} color={"#94f368"}>

      <Text style={styles.points}>
                  {this.props.data != null ? this.props.data.strDriverTimeHrsUsed : ''} 
                </Text>
      </PercentageCircle>  
<Text style={styles.hostext}>{strings('Home.Driving')} </Text>
              </View>


      </View>


        
      </View>

    );

  }
  else{
    return(
      <View style={styles.body}>
         </View>

    );

  }
  }

}

var styles = StyleSheet.create({
  body:{
    backgroundColor:'#ffffff',
    borderColor:'#dddddd',
    borderBottomWidth:1,
    padding:10,
    alignItems:'center',
    margin:10,
    marginTop:0,
    

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
    fontSize:16,
    fontWeight:'bold',
    padding:3,
  },
  detail:{
    fontSize:16,
    fontWeight:'normal',
    color: '#da191d',
    textAlign:'justify'
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 45,
    left: 10,
    width: 90,
    textAlign: 'center',
    color: '#0071BC',
    //fontFamily:'Museo Sans',
    fontSize: 20,
    fontWeight: "200"
  },
  hostext: {
    backgroundColor: 'transparent',

    textAlign: 'center',
    color: '#0071BC',
    fontSize: 20,
    fontWeight: "300",
    //fontFamily:'Museo Sans',
  },
});

module.exports = hos;
