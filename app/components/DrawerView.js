'use strict'

import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View, Image,Keyboard} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';


import Launch from './Launch';
import Common from './Common';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
     justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    backgroundColor: '#0071BC',

  },
  row:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor:'#3d4650',
    marginTop:15,
  //  borderBottomWidth:1
},

row1:{
   // flexDirection: 'row',
   // justifyContent: 'flex-start',
   flex: 1,
    borderColor:'#3d4650',
    marginTop:1,
  //  borderBottomWidth:1
  },
  homeimage:{
    //width: 260,
    //height:44,
    marginBottom:50,
    marginTop:40,
    //marginLeft:10,
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: '#ffffff',
    padding:10
  },
   text1: {
    fontSize: 20,
    color: '#ffffff',
    padding:0,
   // paddingLeft:30,
    marginTop:-30,
    textAlign: 'center'
    
  },

   text2: {
    fontSize: 18,
    color: '#ffffff',
    padding:0,
   // paddingLeft:30,
    marginTop:10,
    textAlign: 'center'
    
  },
  icon: {
    fontSize: 22,
    color: '#ffffff',
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:10,
  },
});

class DrawerView extends Component {
  constructor (props){
    super(props);
    this.state = {
      closeDrawer: props.closeDrawer,
      logout:props.logout,
      //openDrawer:props.openDrawer
    }
  }
  // static propTypes = {
  //   closeDrawer: PropTypes.func.isRequired
  // };
  //const drawer = this.state.context.drawer;
  // DrawerView.contextTypes = contextTypes;
  // DrawerView.propTypes = propTypes;
  buttonClick(type){
    this.state.closeDrawer();
    if(Common.AccessToken !='')
    {
    Common.GoToScreen(type);
    }

  }

    buttonClickP(type,data){
    this.state.closeDrawer();
    Common.lang=0;
    Common.lat =0;
     Common.locationTitile ='Current Location';
   Common.locationDesc ='';
    if(Common.AccessToken !='')
    {
    Common.GoToScreen(type,data);
    }

  }
  // logout(){
  //   //Common.AccessToken = '';
  //   this.state.closeDrawer();
  //   console.log('logout');
  //   return(<Launch handleChange loginstate={false} initialData={Common.initialScreen}/>);
  // }

    componentDidMount(){

//Keyboard.dismiss();
  }

  render(){
    return (
      <View style={[styles.container]}>
        
        <Button  onPress={() => Common.GoToScreen('t')}>
            <View style={[styles.row,{flexDirection: 'row', justifyContent:'center'}]}>
              <Image source={require('../resources/logo-white.png')} style={styles.homeimage} />
            </View>
            
             
        </Button>

           
         <Text style={styles.text1}>
                 {Common.UserData.DefaultUser} 
              </Text>
 <Text style={styles.text2}>
            Driver: {Common.LOginDriverName}
              </Text>
        
          {this._renderTrips()}
          {this._renderSchedule()}
          {this._renderPayroll()}
          {this._rendermap()}
        
        <Button  onPress={() => this.state.logout()
          
          }  >
            <View style={styles.row}>
              <Icon name={'exit-to-app'} style={styles.icon}   />
              <Text style={styles.text}>
                 {strings('Drawer.Logout')}
              </Text>
              
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'flex-end',}}>
                {/*<Icon name={'chevron-right'} style={[styles.icon, {paddingRight:10}]}   />*/}
              </View>
            </View>
        </Button>
      </View>
    );
  }

  _renderTrips(){
    if (Common.AccessToken !='' && Common.securitySettings != null  && Common.securitySettings.find(x => x.Code === 'S098') != null && Common.securitySettings.find(x => x.Code === 'S098').Value == 1) {
      return(
        <Button  onPress={() => this.buttonClick('tripslist')}>
            <View style={styles.row}>
              <Icon name={'compare-arrows'} style={styles.icon}   />
              <Text style={styles.text}>
                 {strings('Drawer.Trips')}
              </Text>
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'flex-end' }}>
                {/*<Icon name={'chevron-right'} style={[styles.icon, {paddingRight:10}]}   />*/}
              </View>
            </View>
        </Button>
      );
    }
    else {
        return null;
    }
  }
  _renderSchedule(){
    if ( Common.AccessToken !='' &&  Common.securitySettings != null  && Common.securitySettings.find(x => x.Code === 'S099') != null && Common.securitySettings.find(x => x.Code === 'S099').Value == 1) {
      return(
          <Button  onPress={() => this.buttonClick('schedule')}>
            <View style={styles.row}>
              <Icon name={'event-available'} style={styles.icon}   />
              <Text style={styles.text}>
                 {strings('Drawer.Schedule')}
              </Text>
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'flex-end',}}>
                {/*<Icon name={'chevron-right'} style={[styles.icon, {paddingRight:10}]}   />*/}
              </View>
            </View>
          </Button>
      );
    }
    else {
        return null;
    }
  }
  _renderPayroll(){
    if ( Common.AccessToken !='' &&  Common.securitySettings != null  && Common.securitySettings.find(x => x.Code === 'S100') != null && Common.securitySettings.find(x => x.Code === 'S100').Value == 1) {
      return(
        <Button  onPress={() => this.buttonClick('payrollentry')}>
            <View style={styles.row}>
              <Icon name={'note-add'} style={styles.icon}   />
              <Text style={styles.text}>
                 Payroll Entry
              </Text>
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'flex-end',}}>
                {/*<Icon name={'chevron-right'} style={[styles.icon, {paddingRight:10}]}   />*/}
              </View>
            </View>
        </Button>
      );
    }
    else {
        return null;
    }
  }

_rendermap(){
    if ( Common.AccessToken !='' &&  Common.securitySettings != null  && Common.securitySettings.find(x => x.Code === 'S117') != null && Common.securitySettings.find(x => x.Code === 'S117').Value == 1) {
      return(
        <Button  onPress={() => this.buttonClickP('mapscreen',0)}>
            <View style={styles.row}>
              <Icon name={'note-add'} style={styles.icon}   />
              <Text style={styles.text}>
                 Location Map
              </Text>
              <View style={{flex:1, flexDirection: 'row',justifyContent: 'flex-end',}}>
                {/*<Icon name={'chevron-right'} style={[styles.icon, {paddingRight:10}]}   />*/}
              </View>
            </View>
        </Button>
      );
    }
    else {
        return null;
    }
  }


};


module.exports = DrawerView;
