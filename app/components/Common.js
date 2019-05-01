'use strict'
import React, { Component }  from 'react';
import {StyleSheet, View, Alert, AsyncStorage,AppState} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
//import BadgeNumberAndroid from 'react-native-shortcut-badger'
import BackgroundTimer from 'react-native-background-timer';
import { NativeModules } from 'react-native';
import I18n from 'react-native-i18n';
import { PermissionsAndroid } from 'react-native';

//const ShortcutBadger = NativeModules.ShortcutBadger;
//const ShortcutBadger = NativeModules.ShortcutBadger;
export default class Common {
  static globalURL = 'http://globalapi.meltonwebservices.com/';
  //static baseURL = 'http://192.168.2.6:3000/api';
  static baseURL = 'http://localhost:3000/api';
  static webURL = 'http://localhost:8729';
  static noImage = 'http://www.pledgeperks.com/app/no-image.png';
  static isRegistered = false;
  static STORAGE_KEY = '@AsyncStorage:key';
  static STORAGE_UserName = '@UserName:key';
  static STORAGE_DriverName = '@DriverName:key';
  static STORAGE_Lang = '@Lang:key';
  static logInState = false; 
  
  static UserData = null;
  static UserLang = null;
  static deviceToken = ''; 
  static initialScreen = 'home';
  static securitySettings = {};
  static NewMessages = 0;
  static watchID =0;
  static ccClick =0;
  static LoginUserName ='';
  static LOginDriverName ='';
  static AppLangCode ={ key: 'en', label: "English" };
  static AppLang ='English';
  static Timer =60000;
  static CheckTimer =60000;
  static TimerInterval =-100;
  static locationTitile ='Current Location';
  static locationDesc ='';
  static GPSHistory =0;
  static lang =0;
  static lat =0;
  static trackGps = false;
  static longitude ='';
  static latitude ='';
  static getInitial(val){
    console.log('val = ' + val + ' - ' + Common.initialScreen)
    if (Common.initialScreen == val) {
      return true;
    }
    else {
        return false;
    }
  }
  //  Alert(title, val){
  //     Alert.alert(title,val);
  // }
   static Alert(title, message){
     Alert.alert(title,message);
 }
  static GoToScreen(screen, data){

    switch(screen){
      case 'tripdetails':
        Actions.tripdetails();
        break;
      case 'triplistdetails':
        Actions.triplistdetails({data:data});
        break;
      case 'checkcalldetails':
        Actions.checkcalldetails({data:data});
        break;
      case 'checkcalllist_triplist':
        Actions.checkcalllist_triplist({trip:data});
        break;
      case 'checkcall':
        Actions.checkcall({checkcallid:data});
        break;
      case 'checkcalledithome':
        Actions.checkcalledithome({checkcallid:data});
        break;
        

        case 'addsignaturehome':
        Actions.addsignaturehome({checkcallid:data});
        break;
        case 'adddochome':
        Actions.adddochome({checkcallid:data});
        break;

        case 'showdochome':
        Actions.showdochome({img:data});
        break;

      case 'checkcalledit':
        Actions.checkcalledit({checkcallid:data});
        break;
      case 'checkcalldetailshome':
        Actions.checkcalldetailshome({data:data});
        break;
      case 'tripslist':
        Actions.trips();
        break;
      case 'availabilities':
        Actions.availabilities();
        break;
      case 'availability':
        Actions.availability();
        break;
        case 'messages':
        Actions.tab3_1();
        break;
      case 'schedule':
        Actions.schedule();
        break;
      case 'payrollentry':
        Actions.payrollentry();
        break;
        
        case 'mapscreen':
        Actions.mapscreen({opt:data});
        break;
      
      case 'logout':
       // Common.InvokeLogout();
         break;
    }

  }

  static GetOffers(by, id){
    Actions.offerlist({by:by, id:id});

  }

  static GetOfferDetails(id){
    Actions.offerdetail({id:id});

  }

  static getBusinessImageURL(data){
    var url = Common.noImage;
    if (data != null && data.logo != null && data.logo != 'NA') {
      url = data.logo;
    }
    return url;
  }
  static renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {

    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }




  ///////////////////////////




///////////  start logoff ////



//// end logoff ////



static GetUserLocation()
  {

    
    if(navigator.geolocation){
      
     // alert('location');

Common.GetCurrentLocation();
  
  }
  
  else{
    alert('error');


Common.LogLocationError("Problem while getting Geo Location");

//Common.Timer = 30000;
  }
 



  }


static GetCurrentLocation()
{

  try{

    
   var nav =      navigator.geolocation.getCurrentPosition(
     
      (position) => {

Common.longitude = position.coords.longitude;
Common.latitude = position.coords.latitude;

Common.SaveLocation(position.coords.latitude,position.coords.longitude);

      },
      (error) => {

        
         var str = 'android - ' ;
          if(typeof error == 'string'){
            str += error;
          }
          else if(typeof error == 'object'){
            str += error.message + ' , code: ' + error.code;
          }

          
          Common.LogLocationError(str);
          
    
      },
    //  navigatorOptions
     { enableHighAccuracy: false, timeout: 120000, maximumAge: 10000 },
 //   {enableHighAccuracy:false,maximumAge:10000, timeout:60000},

      // { maximumAge: 30000 },
    );

  }

  catch(error)
  {
    
    Common.LogLocationError(error);
 //   Common.Timer = 30000;
    
  }
}


static LogLocationError(err)
{

err = err + '-'+  Common.Timer;
  
var API_URL = Common.baseURL + 'v1/LogLocationError';
fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': Common.AccessToken
      },
      body: JSON.stringify({
        ErrorMessage: err  ,
        DeviceId: DeviceInfo.getUniqueID()
      })
    })

    .then((responseData) => {

      responseData.json().then(data => {

      
        console.log(data)
        if(data.Success){
          console.log(data);
      //   Common.GetUserLocation();

try{
  
          Common.CheckTimer = data.TimeInterval;

          if( Common.Timer != Common.CheckTimer )
{

  

  Common.Timer = Common.CheckTimer;

  

  if(Common.TimerInterval !=-100)
  {
BackgroundTimer.clearInterval(Common.TimerInterval);

Common.RunTimer();
  }

}

//alert(' time interval' + Common.CheckTimer + ' - ' + Common.Timer );
          

}
catch(e2)
{

Common.CheckTimer = 900000;

//alert('error time interval');

}


        }
        else {
     //    Alert.alert(data.Title,data.message,
       //    [{text: 'OK'}], { cancelable: false });

    //   alert(DeviceInfo.getUniqueID());
        }
      })

    })
    .catch((error) => {
      console.log('error');
      console.log(error);
      console.log('error');
    
    });


 const tintervalId1 = BackgroundTimer.setTimeout(() => {
 

 if(Common.AccessToken !=null && Common.AccessToken !='') 
 {
  
              Common.GetUserLocation();


             }
             }, 60000)


}


static CallDriverGPS()
{
  var str ='inactive';
if(AppState.currentState !=null)
{
 str = AppState.currentState;
}
//if(!str.match(/active|foreground/)  && (Common.AccessToken !=null && Common.AccessToken !='') )


if( Common.Timer != Common.CheckTimer )
{

  BackgroundTimer.clearInterval(Common.TimerInterval)
  


alert(Common.Timer + ' - ' +Common.CheckTimer );

  Common.Timer = Common.CheckTimer;

  

 Common.RunTimer2();
}

else{


if(Common.AccessToken !=null && Common.AccessToken !='') 
{
             Common.GetUserLocation();
//Common.LogLocationError('test log ' + intervalId);


BackgroundTimer.clearInterval(Common.TimerInterval)
  


alert(Common.Timer + ' - ' +Common.CheckTimer );

  Common.Timer = Common.CheckTimer;

  

 Common.RunTimer2();

             }


}


}





static  RunTimer2()
  {

    
    Common.TimerInterval = BackgroundTimer.setInterval(()=> {Common.CallDriverGPS();}, Common.Timer);
  }



static  RunTimer()
  {

//var ShortcutBadger = NativeModules.ShortcutBadger;
console.log('common');

//ShortcutBadger.removeCount();
//BadgeNumberAndroid.setNumber(5);
    Common.TimerInterval = BackgroundTimer.setInterval(() => {


//console.log(ShortcutBadger);
    //   ShortcutBadger.applyCount(3);
    //   console.log(ShortcutBadger);

      var str ='inactive';
if(AppState.currentState !=null)
{
 str = AppState.currentState;
}
//if(!str.match(/active|foreground/)  && (Common.AccessToken !=null && Common.AccessToken !='') )




if(Common.AccessToken !=null && Common.AccessToken !='' && Common.trackGps == true ) 
{
              Common.GetUserLocation();


}

             }, Common.Timer)

}
  

static SaveLocation(latd,lngd)
{

Common.GPSHistory = Common.GPSHistory + 1;

var history = false;
  if(Common.GPSHistory == 3)
  {
    history = true;
  }
var API_URL = Common.baseURL + 'v1/SaveDriverGPS';

//alert(API_URL);

fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': Common.AccessToken
      },
      body: JSON.stringify({
        lat: latd,
        lng: lngd,
        IsHistory:history
      })
    })

    .then((responseData) => {

      responseData.json().then(data => {

      
        console.log(data)
        if(data.Success){
          console.log(data);

          Common.CheckTimer = data.TimeInterval;
       //   alert('success ' + latd + '-' + lngd);

;
if( Common.Timer != Common.CheckTimer )
{

  Common.Timer = data.TimeInterval;

if(Common.TimerInterval != -100)
{
  BackgroundTimer.clearInterval(Common.TimerInterval)
  
  Common.RunTimer();
}
}

         
        }
        else {
     //    Alert.alert(data.Title,data.message,
       //    [{text: 'OK'}], { cancelable: false });
   //    alert(data.message + ' - '  + latd + '-' + lngd);
        }
      })

    })
    .catch((error) => {
      console.log('error');
      console.log(error);
      console.log('error');
     // alert(error);
    
    });


if(history == true)
{
Common.GPSHistory = 0;

}


}


  //////////////////////////////

  static GetFileType(ext) 
  {
     var filetype = 'image/jpeg';
    if(ext == 'gif')
    {
      filetype = 'image/gif';
    }

    if(ext == 'ico')
    {
      filetype = 'image/x-icon';
    }

    else if(ext == 'png')
    {
      filetype = 'image/gif';
    }
    else if(ext == 'txt')
    {
      filetype = 'text/plain';
    }
    else if(ext == 'pdf')
    {
      filetype = 'application/pdf';

    }

    else if(ext == 'doc')
    {
      filetype = 'application/msword';

    }
    return filetype;
  }

  static ValidateUser(deviceid, callback){
    //AsyncStorage.removeItem(Common.STORAGE_KEY);
    Common._loadInitialState(function(){
      if (Common.UserData != null) {
        Common.isRegistered = true;
      }
   //   Common._loadLoginName();
      //Common.isRegistered = true;
      return callback(false);
    });

    // var getBy = '/Devices/authenticate';
    // var API_URL = Common.baseURL + getBy ;
    //  fetch(API_URL, {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       username: deviceid,
    //       password: ''
    //     })
    //   })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log('data');
    //     console.log(responseData);
    //     if (responseData.error) {
    //       Common.Alert(responseData.error.statusText, responseData.error.message);
    //       return callback(false);
    //     }
    //     else {
    //       return callback(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log('Error occured');
    //     console.warn(error);
    //     return false;
    //   });
  }




static async _loadLoginName() {
   



try {
      await AsyncStorage.getItem(Common.STORAGE_UserName, (err, result) => {
        
        if (result !=null) {
            Common.LoginUserName = result.toString();
            
              
        }

        
        return Common.LoginUserName;
      });
    } catch (error) {
      console.log(error);
      return '';
    }




  }



static async _loadDriverName() {
   



try {
      await AsyncStorage.getItem(Common.STORAGE_DriverName, (err, result) => {
        
        if (result !=null) {
            Common.LOginDriverName = result.toString();
            
              
        }

        
        return Common.LOginDriverName;
      });
    } catch (error) {
      console.log(error);
      return '';
    }




  }



static async _loadLanguageState() {
    try {
      await AsyncStorage.getItem(Common.STORAGE_Lang, (err, result) => {

        

        if(result == null)
        {
Common.UserLang= { key: 'en', label: "English" };
I18n.locale = 'en' ;
        }
        else{
        Common.UserLang = JSON.parse(result);

        I18n.locale = Common.UserLang.key ;

      }
      
      

        
        if (Common.UserLang) {
  
        }

        
      //  return callback();
      });
    } catch (error) {
      console.log(error);

     Common.UserLang= { key: 'en', label: "English" };
 //     return callback();
    }

  }



  static async _loadInitialState(callback) {
    try {
      await AsyncStorage.getItem(Common.STORAGE_KEY, (err, result) => {
        Common.UserData = JSON.parse(result);
        if (Common.UserData) {
            Common.baseURL = Common.UserData.APILink;
if(Common.UserData.Weblink !=null)
{

            Common.webURL = Common.UserData.Weblink;

}
        }

        Common.AccessToken = '';
        return callback();
      });
    } catch (error) {
      console.log(error);
      return callback();
    }

  }
static async _saveUserName(data) {
    try {

      await AsyncStorage.setItem(Common.STORAGE_UserName, data.toString());

      
    } catch (error) {
      console.log(error);
    }

  }

static async _saveDriverName(data) {
    try {

      await AsyncStorage.setItem(Common.STORAGE_DriverName, data.toString());

      
    } catch (error) {
      console.log(error);
    }

  }


static async _saveLanguage(data) {
    try {



      await AsyncStorage.setItem(Common.STORAGE_Lang, JSON.stringify(data));

      
    } catch (error) {
      console.log(error);
    }

  }


  static async _saveState(data) {
    try {

      
      await AsyncStorage.setItem(Common.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }

  }
};
