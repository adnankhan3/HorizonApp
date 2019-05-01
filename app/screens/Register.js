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
import Common from '../components/Common'
import Launch from '../components/Launch'
import App from '../App'
import Login from './Login'
 import I18n from 'react-native-i18n';    
import ModalPicker from 'react-native-modal-picker';

import { strings } from '../locales/i18n';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSelected: 'register',
      UniqueId: '212EBA93',//212EBA97
      APIKey: 'C45B8414-55A2-47F8-9486-B69096D71661',//919fd301-17de-4c7d-a7f0-3C45B8414-55A2-47F8-9486-B69096D716600d0b03979dd
      btnRegister:strings('Register.btn_Register'),
          keyboardType: 'default',
          lang: { key: Common.UserLang.key, label: Common.UserLang.label },
      langlist: [],

      //security 
      //C45B8414-55A2-47F8-9486-B69096D71660
      //212EBB98
      visible: false,
      deviceId: DeviceInfo.getUniqueID()
    };

    
  }
  render() {

    return this.renderComponent(this.state.componentSelected);

  }


componentDidMount(){


 var dataBlob = [
          ];

          var d = { key:'en', label:'English' };
            dataBlob.push(d);

          var    d1 = { key:'he', label:'German' };
              dataBlob.push(d1);

              var    d2 = { key:'pl', label:'Polish' };
          //    dataBlob.push(d2);

              this.setState({
            langlist: dataBlob
          });


  }

setTypeItem(item) {


I18n.locale = item.key;
    this.setState({ lang: item });

    
setTimeout(() => {
    this.setState({btnRegister:strings('Register.btn_Register')});
}, 200);
    //alert(I18n.locale);

    
  }

  onProceedPressed() {
    this.setState({
      visible: true,
    });
    var me = this;
    var API_URL = Common.globalURL + 'V1/VerifyDevice';


    // var params = {
    //   deviceuniqueid: this.state.deviceId,
    //   apikey: this.state.APIKey,
    //   uniqueid: this.state.UniqueId
    // };
    // var formData = new FormData();
    //
    // for (var k in params) {
    //     formData.append(k, params[k]);
    // }

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'//'application/x-www-form-urlencoded; charset=UTF-8',
      },
      //body: formData
      body: JSON.stringify({
        deviceuniqueid: this.state.deviceId,
        apikey: this.state.APIKey,
        uniqueid: this.state.UniqueId
      })
    })

    .then((responseData) => {
      responseData.json().then(data => {
        me.setState({
          visible: false,
        });
        if(data.Success){

          
          Common._saveState(data);
          Common._saveLanguage(this.state.lang);
          Common._saveUserName('');
          //Common._saveLanguage(Common.AppLangCode);
          
          Common.UserLang = this.state.lang;
          Common._loadInitialState(function(){

            me.setState({
                componentSelected: 'login'
            });
          });

        I18n.locale = this.state.lang.key;


        }
        else {

       //   alert(data.message);
          //Common.Alert(data.title, data.message);
        }
      })

    })
    .catch((error) => {
      this.setState({
        visible: false
      });
      console.log(error);
   //   alert(error);
    });
  }
buttonText() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText1}>{this.state.lang.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }
  renderComponent(component){

    if (component === 'register') {
      return(
        <ViewContainer isWindow={true}>
          <Image source={require('../resources/frontscreen-logo.png')} style={styles.homeimage} />
          <View style={styles.flowRight}>

            <TextInput underlineColorAndroid='transparent'
              style={styles.input}
              placeholder='Unique Id'
              placeholderTextColor='#fff'
              value={this.state.UniqueId}
              onChange={(event) => this.setState( {UniqueId: event.nativeEvent.text})}
            />
          </View>
          <View style={styles.flowRight}>
            <TextInput underlineColorAndroid='transparent'
              style={styles.input}
              placeholder='API Key'
              placeholderTextColor='#fff'
              value={this.state.APIKey}
              onChange={(event) => this.setState( {APIKey: event.nativeEvent.text})}
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

          <Button containerStyle={styles.button} style={styles.buttonText} underlayColor='#f67a6e'
              onPress={() => {
                  this.onProceedPressed();

              }}
          >
              {this.state.btnRegister}
          </Button>
          <View style={{ flex: 1 }}>
            <Spinner visible={this.state.visible} />
          </View>
        </ViewContainer>

      );
    }
    else if (component === 'login') {
      return(<Login/>);
      //return(<App register={true}/>);

    }
    else if (component === 'app') {
      return(<Launch/>);
      //return(<App register={true}/>);

    }
  }
}

var styles = StyleSheet.create({

  homeimage:{
   // width: 270,
   // height:80,
    marginBottom:80,
    marginTop:40
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth:1,
    borderColor:'#fff'
  },
  buttonText: {
    fontSize: 12,
    padding:8,
    color: '#0071BC',
    //fontFamily:'Museo Sans',
    alignSelf: 'center',
    
  },
  flowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    
    borderColor:'#fff'
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
    borderColor: '#fff',
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
  },

});

module.exports = Register;
