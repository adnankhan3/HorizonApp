'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TripDetails from '../screens/TripDetails'
import Common from '../components/Common';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';
class TripInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true
    }
    
  }

  render() {

    // <View>
    //
    //   <Text style={styles.heading}>
    //     Current Trip Information
    //   </Text>
    // </View>
    // <Button containerStyle={styles.button} style={styles.buttonText} underlayColor='#5cb85c'
    //     onPress={() => {
    //         Common.GoToScreen('tripdetails');//, {this.props.data != null ? this.props.data.TripId : '0'}
    //     }}
    // >
    //     MORE DETAILS
    // </Button>
    // {this.props.data != null && this.props.data.Settings != null
    //   ? this.props.data.Settings.find(x => x.Code === 'S056').ShipmentText : ''}


    return(
      <View style={styles.body}>

        {this._renderLoad()}
        
        {this._renderShipper()}
        {this._renderConsignee()}
        {this._renderLastStop()}
        {this._renderNextStop()}
      </View>


    );
  }
  _renderLoad(){
    var settings = this.props.data != null ? this.props.data.Settings : null;
    if (settings != null && settings.find(x => x.Code === 'S091') != null && settings.find(x => x.Code === 'S091').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
          <Text style={[styles.title]}>
            {strings('Home.load_No')}
            {/*{settings != null && settings.find(x => x.Code === 'S056') != null ? settings.find(x => x.Code === 'S056').Value + '': 'Load # '} */}
          </Text>
          <Text style={styles.detail}>{this.props.data != null ? this.props.data.ShipmentText : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }

  

  _renderShipper(){
    var settings = this.props.data != null ? this.props.data.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S090') != null && settings.find(x => x.Code === 'S090').Value == 1) {

      return(
        <Text style={styles.title}>
          {'Shipper:'}  <Text style={styles.detail}>{this.props.data != null ? this.props.data.ShipperName : ''}{'\n'}</Text>
              <Text style={styles.detail}>{this.props.data != null ? this.props.data.ShipperLocation : ''}</Text>
        </Text>
      );
    }
    else {
        return null;
    }
  }
  _renderConsignee(){
    var settings = this.props.data != null ? this.props.data.Settings : null;
    if (settings != null && settings.find(x => x.Code === 'S078') != null && settings.find(x => x.Code === 'S078').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          {strings('Home.Consignee')}
          
           

            
        </Text>

<Text style={styles.detail}>{this.props.data != null ?   this.props.data.ConsigneeName : ''}{'\n'}{this.props.data != null ? this.props.data.ConsigneeLocation : ''}</Text>
              
</View>
      );
    }
    else {
        return null;
    }
  }
  _renderLastStop(){
    var settings = this.props.data != null ? this.props.data.Settings : null;
    if (settings != null && settings.find(x => x.Code === 'S079') != null && settings.find(x => x.Code === 'S079').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}} >
        <Text style={[styles.title]}>

          {strings('Home.LastStop')}
          {/*Last Stop{': '}*/}
          
        </Text>
        <Text style={styles.detail}>{this.props.data != null ? this.props.data.LastStop : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }

  
  _renderNextStop(){
    var settings = this.props.data != null ? this.props.data.Settings : null;
    if (settings != null && settings.find(x => x.Code === 'S080') != null && settings.find(x => x.Code === 'S080').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}} >
        <Text style={[styles.title]}>
          {strings('Home.NextStop')}
        </Text>
        <Text style={styles.detail}>{this.props.data != null ? this.props.data.NextStop : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
}

// <View style={{padding:5, alignItems:'center', flex:1, flexDirection:'row' }}>
//   <Progress.Bar progress={0.7} width={340} height={15} color={'#1f75bf'} style={{alignSelf: 'stretch'}} />
// </View>
var styles = StyleSheet.create({
  body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
   // borderBottomWidth:1,
    padding:10,
    borderWidth:1,
    elevation:30,   
    margin:10,
    borderRadius:6,
    

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
    color: '#808080',
    fontWeight: "400",
 //   fontSize:16,
    padding:2 ,
    width:'23%',
    //fontFamily: "Museo Sans",
    fontSize:16

  },
  detail:{
   // fontSize:26,
    fontWeight: "400",
    
    textAlign:'left',
    marginLeft:20,
    width:'77%',
    color: '#0071BC',
    //fontFamily:'Museo Sans',
    fontSize:16

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

module.exports = TripInfo;
