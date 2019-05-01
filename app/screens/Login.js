'use strict'
import React, { Component }  from 'react';
import {Text, View, TextInput, Alert, TouchableHighlight
  , TouchableOpacity, Image, StyleSheet} from 'react-native';
 import Communications from 'react-native-communications';
import DeviceInfo from 'react-native-device-info';
import Button from "react-native-button";
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Globals from '../Globals'
import ViewContainer from '../components/ViewContainer'
import Spinner from 'react-native-loading-spinner-overlay';

import Launch from '../components/Launch';
import App from '../App';
import Home from '../screens/Home';
import Common from '../components/Common';
import {Platform} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
 import packageJson from '../../package.json'
 import I18n from 'react-native-i18n';    
import ModalPicker from 'react-native-modal-picker';

import { strings } from '../locales/i18n';
 //import { KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'

 //import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'



//import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

 //import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
var login ='';
var logvalue =''
export default class Login extends Component {
  
  constructor(props) {
    super(props);
 //   Common._loadLoginName(function(){

           
   //       });

  
  

    this.state = {
      componentSelected: 'login',
      Username: Common.LoginUserName.toString(),//catonio
      Password: '',//catonio123
      Signin:strings('Login.btn_Sign_In'),
          keyboardType: 'default',
          lang: { key: Common.UserLang.key, label: Common.UserLang.label },
      langlist: [],
      visible: false,
      deviceId: DeviceInfo.getUniqueID()
    };
  }
  render() {

    return this.renderComponent(this.state.componentSelected);

  }

  setTypeItem(item) {


I18n.locale = item.key;
    this.setState({ lang: item });

    
setTimeout(() => {
    this.setState({Signin:strings('Login.btn_Sign_In')});
}, 200);
    //alert(I18n.locale);

    
  }

  onProceedPressed() {

    var API_URL = Common.baseURL + 'v1/login';

    
  //alert(Common.UserData.Token);

   // alert(API_URL );
    Common.logInState = false;

    var me = this;
    this.setState({
      visible: true,
    });
//console.log(Common.UserData.Token);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'APIKey': Common.UserData.Token
      },
      body: JSON.stringify({
        username: this.state.Username,
        password: this.state.Password,
        DeviceId:this.state.deviceId,
        DeviceToken:Common.deviceToken,
        DeviceType:Platform.OS,
        LangCode:I18n.locale
      })
    })

    .then((responseData) => {

      responseData.json().then(data => {

        me.setState({
          visible: false,
        });
        console.log(data)
        if(data.Success){
          console.log(data);
          Common.logInState = true;
          Common.AccessToken = data.Token;
          Common.initialScreen = data.InitialScreen;
          Common.securitySettings = data.Settings;
          Common.trackGps = data.TrackGps;
          Common._saveUserName(this.state.Username.toString());
      //    Common._saveDriverName(this.date.DriverName.toString());

          Common.LOginDriverName = data.DriverName;
          
          Common._saveLanguage(this.state.lang);

          Common.UserLang = this.state.lang;
          
          Common.GetUserLocation();
          
             me.setState({
                componentSelected: 'app'
            });

             Common._loadLoginName();

                 I18n.locale = this.state.lang.key;

                 

               //  alert(I18n.locale);

           //  FCM.removeAllDeliveredNotifications()
           //       FCM.cancelAllLocalNotifications()
           
          
             
            
        }
        else {



setTimeout(() => {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
          }, 200);


        }
      })

    })
    .catch((error) => {
      console.log('error');
      console.log(error);
      console.log('error');
      this.setState({
        visible: false
      });
    });
  }

  componentWillMount(){
//Common._loadLoginName();

//this.state.Username = Common.LoginName;

//alert(Common.LoginName);
this.state.Username = Common.LoginUserName.toString();





  }

  componentDidMount(){
this.state.Username = Common.LoginUserName.toString();
Common.logInState = false;

 var dataBlob = [
          ];

          var d = { key:'en', label:'English' };
            dataBlob.push(d);

          var    d1 = { key:'he', label:'German' };
              dataBlob.push(d1);

              var    d2 = { key:'pl', label:'Polish' };
           //   dataBlob.push(d2);

              this.setState({
            langlist: dataBlob
          });


  }
  componentWillReceiveProps(nextProps){
    console.log('heloooo');
    

  }
 buttonText() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText1}>{this.state.lang.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }
_focusNextField(nextField) {
        this.refs[nextField].focus()
    }


  renderComponent(component){

    if (component === 'login') {
      return(
        <ViewContainer isWindow={true}>

                

          <Image source={require('../resources/frontscreen-logo.png')} style={styles.homeimage} />

          <View style={styles.flowRight}>
            <TextInput underlineColorAndroid='transparent'
              style={styles.input}
              placeholder={strings('Login.UserName')}
              placeholderTextColor='#fff'
                         returnKeyLabel='Next' 
  returnKeyType='done' 
  onSubmitEditing={() => this._focusNextField('2')}

              value={this.state.Username}
              onChange={(event) => this.setState( {Username: event.nativeEvent.text})}
            />

          </View>
          

          <View style={styles.flowRight}>


            <TextInput underlineColorAndroid='transparent'
              style={styles.input} secureTextEntry={true}
              placeholder={strings('Login.Password')}
              placeholderTextColor='#fff'
              ref='2'
                        

              returnKeyLabel='Go' 
  returnKeyType='done' 

  onSubmitEditing={(event) => {
this.onProceedPressed();}}
  
              value={this.state.Password}
              onChange={(event) => this.setState( {Password: event.nativeEvent.text})}
            />

          

          </View>
          <View style={styles.flowLeft}>

<ModalPicker style={[styles.button1]}
            selectTextStyle={styles.buttonText1}
            children={this.buttonText()}
            data={this.state.langlist}
            initValue={this.state.lang.label}
            optionTextStyle={styles.rowText}
            onChange={(option) => { this.setTypeItem(option) }} />
</View>
          <Button   containerStyle={styles.button} style={styles.buttonText} underlayColor='#f67a6e'
              onPress={() => {
                  this.onProceedPressed();

              }}
          >
              {this.state.Signin}
          </Button>
            <Text  style={styles.text} >
             {Common.UserData.DefaultUser} 
          </Text>
          <Text  style={styles.text} >
            Version # {packageJson.version} 
          </Text>
          
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible} />
          </View>

        
                

        </ViewContainer>

      );
    }
    else if (component === 'app') {
      return(<Launch loginstate={true} initialData={Common.initialScreen}/>);
      //return(<App register={true}/>);

    }
  }
}

var styles = StyleSheet.create({

  homeimage:{
   // width: 270,
    //height:80,
    marginBottom:80,
    marginTop:40,
  //  backgroundColor:'tra',
        

  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth:1,
    borderColor:'#fff'
  },

flowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    
    borderColor:'#fff'
  },

  buttonText: {
    fontSize: 12,
    padding:8,
    color: '#0071BC',
    alignSelf: 'center',
 //   fontFamily:'Museo Sans'
  },
  rowText: {
   // color: '#000',
    fontSize: 14,
    padding: 4,
    color:'#0071BC'
  },

 buttonText1: {
    fontSize: 18,
    padding:8,
    color: '#fff',
    alignSelf: 'center',
 //   fontFamily:'Museo Sans'
  },
 button1: {
    flexDirection: 'row',
    backgroundColor: '#0071BC',
    flex: 1,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 30,
    marginBottom: 10,
    marginRight:70,
    marginLeft:70,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    marginRight:70,
    marginLeft:70,
    marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  input: {
    height: 36,
    padding: 4,
    textAlign:'center',
    flex: 4,
    fontSize: 18,
    //borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 4,
    color: '#fff',
    marginBottom: 10,
    
    
  //    border: 0,
 // outline: 0,
  //background: transparent,
  //borderbottom: 1px solid black,
    
},

text:{
  color:'#fff',
}

});
