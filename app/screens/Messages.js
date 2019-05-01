'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View,ScrollView} from 'react-native';
import Button from 'react-native-button';
import { GiftedChat,Composer } from 'react-native-gifted-chat';
import Spinner from 'react-native-loading-spinner-overlay';
import TimerMixin from 'react-timer-mixin';
import ViewContainer from '../components/ViewContainer'

import Common from '../components/Common'
import Launch from '../components/Launch'
 import I18n from 'react-native-i18n';    


import { strings } from '../locales/i18n';
//import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {messages: [],
      visible: false,
    };
    this.onSend = this.onSend.bind(this);
    this.renderComposer = this.renderComposer.bind(this);
    Common.NewMessages = 3;
  }


 renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputProps={{
          returnKeyType: 'send',
          multiline: false,
          
          placeholder:strings('Messages.Place_Holder'),
          onSubmitEditing: event => {

            if(event.nativeEvent.text.trim() !='')
            {
            props.onSend({ text: event.nativeEvent.text.trim() }, true);

            }
          },
        }}
      />
    );
  }

  onSend(messages = []) {

    if(messages[0].text == '')
    {
      return; 
    }
    var API_URL = Common.baseURL + 'v1/SaveDriverMessage?Id=0';
    var me = this;

    this.setState({
      visible: true,
    });
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },
      body: JSON.stringify({
        Message: messages[0].text
      })
    })
    .then((responseData) => {
      responseData.json().then(data => {

        me.setState({
          visible: false,
        });
        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, messages),
          };
        });
        if(data.Success){
        }
        else {
          //Common.Alert(data.title, data.message);
        }
      })

    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });

  }
  render() {
    return(
      <View style={{flex:1, marginTop: 80, marginBottom:100}}>

        
        <View style={{flex:1}}>
          <GiftedChat
            bottomOffset={0}
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
     
        renderComposer={this.renderComposer}


          />
          </View>
        <Spinner visible={this.state.visible} />

        
      </View>
    );
  }
  loadMessages(){
    var API_URL = Common.baseURL + 'v1/GetDriverMessages';

    var me = this;

    this.setState({
      visible: true,
      data: null
    });
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },

    })
    .then((responseData) => {

      if (responseData.ok == false) {
        me.setState({
          visible: false,
        });
        Common.Alert('Error!', 'Something went Wrong. Please try again later. Thank you!');

      }
      else {
        responseData.json().then(data => {
          var all=  [];
          console.log(data);
          data.forEach(function(item){
            var msg = {
              _id: item.MessageId,
              text: item.Detail,
              createdAt: item.CreatedDate,
              user: {
                _id: item.Id,
                name: item.MessageFrom,
                //avatar: 'http://uat.meltonwebservices.com//content/img/avatar1_small.jpg',
              },
            }
            all.push(msg);
          });

          me.setState({
            visible: false,
            messages: all
          });

        })
      }


    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }

  componentWillReceiveProps(props){
    console.log('text');
    this.loadMessages();
  }
  componentDidMount(){
    var self = this;
  //   this.timer = setInterval(() => {
  //   console.log('I do not leak!');
  // }, 5000);

       //   FCM.removeAllDeliveredNotifications()
         //         FCM.cancelAllLocalNotifications()

    this.loadMessages();
    Common.NewMessages =0;
  }


}

var styles = StyleSheet.create({

});

module.exports = Messages;
