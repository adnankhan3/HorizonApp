'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View,Alert,Image} from 'react-native';
import Button from 'react-native-button';

import _ from 'lodash';
import ViewContainer from '../components/ViewContainer'
import Login from './Login';
import Common from '../components/Common';
//import SignatureCapture from 'react-native-signature-capture';
//import MapView from 'react-native-maps';


var frm;
var watchID =-10;

 class LocationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
visible: false,
longitude:Common.lang,
latitude:Common.lat

    }

    
  }
  render() {
    console.log(Common.AccessToken);
    if (Common.AccessToken == '') {

      return(<Login />);
    }
    else {
      return(
        
        null
                
      )
  }


  }       
/*
                 <MapView
style={styles.map}
    region={{
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      
    }}
   onRegionChange={this.onRegionChange.bind(this)}
     showsUserLocation={true}
     followUserLocation={true}
>
    <MapView.Marker
      coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
      
    
    />
  </MapView>
    */
               

          
      //);
//    }

 // }

 /* onRegionChange = (region) => { this.setState({
          latitude:region.latitude,
          longitude: region.longitude

       })}


 onRegionChange22(region) {
    console.warn('onRegionChange')
    

 this.setState({
          latitude:region.latitude,
          longitude: region.longitude

       })

       */

 // }
componentWillMount(){
    

   
    
  }
  
LoadInitialData(){

if(this.props.opt == 1)
{
 this.setState({
          latitude:Common.lat,
          longitude: Common.lang

       })

       
}
else{
    if(Common.AccessToken !='')
    {
          navigator.geolocation.getCurrentPosition(
      (position) => {
       console.log(position);
       this.setState({
          latitude:position.coords.latitude,
          longitude: position.coords.longitude

       })
    //    this.setState({currentRegion: {
      //    latitude: position.coords.latitude,
        //  longitude: position.coords.longitude,
          //latitudeDelta: 0.00922,
          //longitudeDelta: 0.00421,
       // }});

        
      },
      (error) => alert(error.message),
    //  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

this.watchID = navigator.geolocation.watchPosition((position1) => {


  this.setState({
          latitude:position1.coords.latitude,
          longitude: position1.coords.longitude

       })
         
      });



    }

    }
   

  }

componentDidMount() {
  

 if(Common.AccessToken !='')
    {
      this.LoadInitialData();
    }
  

}


componentWillUnmount() {
  if(this.watchID != -10)
{
      navigator.geolocation.clearWatch(this.watchID);
}
       // navigator.geolocation.clearWatch(this.watchID);

  }


 }
var styles = StyleSheet.create({

 container:{
 //   position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderColor:'red',

  },
   map: {
 //   position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    bottom: 0,
    height:'85%',
  //  flex: 1,

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
    color: '#fd5f62' ,
    textAlign:'justify'
  },
  
  

signature: {
        flex: 1,
      //  flexDirection:'row',
        borderColor: '#000033',
        
        borderWidth: 1,
       paddingBottom:10,
       paddingTop:250,
       paddingLeft:10,
       paddingRight:10,
         
        
                  

    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    },
 buttonText: {
    fontSize: 12,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:8,
    paddingBottom:8,
    color: 'white',
    fontWeight:'200'
  },
     button: {
    backgroundColor: '#78CD51',
    borderColor: '#78CD51',
    borderWidth: 1,
    borderRadius: 4,
    marginRight:10,
    marginLeft:10,
    height:35,
  },





});
module.exports = LocationMap;