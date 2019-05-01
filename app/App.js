'use strict'
import React, { Component }  from 'react';
import DeviceInfo from 'react-native-device-info';
//import codePush from "react-native-code-push";

import Loading from './components/Loading'
import Launch from './components/Launch'
import Login from './screens/Login'
import Register from './screens/Register'
 import Common from './components/Common'
import {Alert} from 'react-native';
import {BackHandler} from 'react-native';
import {setJSExceptionHandler} from 'react-native-exception-handler'
import { NativeModules } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';


import {Platform,AppState} from 'react-native';


 // import RNRestart from 'react-native-restart';

const reporter = (error) => {
  // Logic for reporting to devs
  // Example : Log issues to github issues using github apis.
  console.log(error); // sample
};

let Interval = -1;


 const errorHandler = (e, isFatal) => {
   
  if (isFatal) {
    reporter(e);

  //  alert(e.message);
    Alert.alert(
        'HORIZON GO',
      
        `
        Error: ${(isFatal) ? 'Fatal:' : ''} Unexpected Error Occured ' 
 
        We have reported this to our team ! Please close the app and start again!
        ` + e.message ,
      [{
        text: 'Close App',
        onPress: () => {

////  start email ///
var API_URL = Common.baseURL + 'v1/EmailFatalError';
fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': Common.AccessToken
      },
      body: JSON.stringify({
        ErrorMessage: e.message,
        ErrorName: e.name,
      })
    })

    .then((responseData) => {

      responseData.json().then(data => {

        
        console.log(data)
        if(data.Success){
          console.log(data);
        //  RNRestart.Restart();
         BackHandler.exitApp();
          
        }
        else {
         // RNRestart.Restart();
          BackHandler.exitApp();
        }
      })

    })
    .catch((error) => {
     // console.log('error');
      console.log(error);
      console.log('error');
      BackHandler.exitApp();
    //  RNRestart.Restart();
    });

/// end email 





          
          
      //  setInterval(() => {
       //    RNRestart.Restart();
// }, 2000);
        }
      }]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed 
  }
};
 
setJSExceptionHandler(errorHandler,true);

export default class App extends Component {

  
  constructor(props) {




    super(props);
    this.state = {
      valid:false,
      registered:false,
      visible: true,
      deviceId: DeviceInfo.getUniqueID(),
      Interval:0, 
      connectionInfo: {} 
    };


 //   ShortcutBadger.applyCount(12);
 //   console.log('12');

  }

 


  render() {


    if (this.state.visible) {
      return(
        <Loading/>
      );
    }
    else {
      return this.loadView(this.props.register);
    }
  

  }
  



  componentWillMount() {



    Common.RunTimer();
Common._loadLoginName();


Common._loadLanguageState();

 


//BackgroundTimer.clearInterval(intervalId);

    if (!this.state.valid) {
        return this.validateUser(this.props.register);
    }



  }
  
//BackgroundTimer.clearInterval(intervalId);
 

  loadView(){
    if (!this.state.registered) {
      return(<Register />);
    }
    
    else {
      return(<Launch loginstate={false} />);
      
    }
  }


 


  validateUser(){
    var me = this;

    Common.ValidateUser(this.state.deviceId, function(validated){
      //validated = true;
      me.setState({
        visible: false,
      });
      me.setState({
        registered: Common.isRegistered,
      });
      if (validated) {
        
        
        
        me.setState({
          valid: true,
        });
        


      }
      
  

    });

  


  }
  componentWillUnmount() {
        // stop listening for events
   //     this.notificationListener.remove();
    }

  componentDidMount() {
    try{


/*const polygon = [
    { lat: 3.1336599385978805, lng: 101.31866455078125 },
    { lat: 3.3091633559540123, lng: 101.66198730468757 },
    { lat: 3.091150714460597,  lng: 101.92977905273438 },
    { lat: 3.1336599385978805, lng: 101.31866455078125 } // last point has to be same as first point 
  ];
 
  let point = {
    lat: 3.3091633559540123,
    lng: 101.66198730468757
  };
 
  GeoFencing.containsLocation(point, polygon)
    .then(() => alert('point is within polygon'))
    .catch(() => alert('point is NOT within polygon'))*/


    //  ShortcutBadger.applyCount(4);
      console.log('abc');
 //  codePush.sync({
   //    updateDialog: true,
     // installMode: codePush.InstallMode.IMMEDIATE
      // });


/*
      FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));
        
        FCM.getFCMToken().then(token => {
            console.log(token)

            Common.deviceToken = token;
            // store fcm token in your server
        });
        
        this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
            // optional, do some component related stuff

            console.log(notif);

             this.showLocalNotification(notif);
            



        });
        
        // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
        // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
        // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
        FCM.getInitialNotification().then(notif => {
           //console.log(notif)
        //   Common.GoToScreen("messages");

       
// FCM.removeAllDeliveredNotifications()
              //    FCM.cancelAllLocalNotifications()

        });*/

    }
    catch(error)
    {
      codePush.log(error);
     // alert(error);
//con(error);
    }
  }
}
