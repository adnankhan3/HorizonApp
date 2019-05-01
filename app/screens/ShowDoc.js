'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View,Alert,Image,ListView,TouchableHighlight,TouchableOpacity  } from 'react-native';
import Button from 'react-native-button';

import _ from 'lodash';
import { Actions, Reducer, Scene, Router, ActionConst, Modal, Switch } from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer'
import Login from './Login';
import Spinner from 'react-native-loading-spinner-overlay';
import Common from '../components/Common';
import ListItemDoc from '../components/ListItemDoc'
import { strings } from '../locales/i18n';
const supportedOrientationsPickerValues = [
  ['portrait'],
  ['landscape'],
  ['landscape-left'],
  ['portrait', 'landscape-right'],
  ['portrait', 'landscape'],
  [],
];
//import SignatureCapture from 'react-native-signature-capture';



var styles = StyleSheet.create({
  row: {
    flex:1,
    //flexDirection: 'row',
    justifyContent: 'center',
   // alignItems: 'center',
    padding: 1,
     borderWidth:1,
    elevation:4,   
    margin:1,
    borderRadius:2,
    minHeight:100,

  backgroundColor:'#fff',
    borderColor:'#fff',
    


  },
  pendingRow:{
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  
  text: {
    flex: 1,
    fontSize: 16,
    color: '#0071BC',
    //fontFamily: "Museo Sans",
  },
  leftImage: {
    width: 50,
    height:70,
    marginRight:10
  },
  

img: {
 //   flex: 1,
    position: 'absolute',
  top: 80,
  left: 1,
  bottom: 5,
  right: 1,
    //fontFamily: "Museo Sans",
  },
img1: {
 //   flex: 1,
    position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
    //fontFamily: "Museo Sans",
  },

});

class ShowDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path :'',
      imgId:0
    }
  }
  render(){
    return(
      
      <View style={[styles.row]}>
          
<TouchableOpacity   delayLongPress={1000}

style={styles.img1}
                resizeMode="contain"
onLongPress ={() => this._handleClick(this.state.imgId)}
 >

          <Image
              source={{ uri: this.state.path }}
              style={styles.img}
                resizeMode="contain"

            />
          </TouchableOpacity  >
      </View>
      

    );
  }

DeleteDocs(id)
{
  var API_URL = Common.baseURL + 'v1/DeleteDriverDocs?Id=' + id;

  //  alert(API_URL);
    var me = this;

    me.setState({
          visible: true,
        });
    //this.setState({
      //visible: true,
    //});
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },

    })
    .then((responseData) => {
      responseData.json().then(data => {
        me.setState({
          visible: false,
        });
        


        if(data.Success)
        {
            setTimeout(() => {
      Alert.alert(data.Title,data.message,
          [{text: 'OK',onPress:() => {
            
//Actions.pop({refresh: {checkcallid: data.id} });

        //    Actions.popTo('adddochome');

setTimeout(()=> {Actions.refresh()}, 500);
 Actions.pop();

//Actions.pop({refresh: {refresh:Math.random()}});



          //  Actions.pop();
        //    Common.GoToScreen('adddochome', data.id);
          } }], { cancelable: false });



        }, 200);


        }



      //  this.setTripItem(this.state.trip);
      })
    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
}

  
 _handleClick(id){


 Alert.alert(strings('Home.Confirmation'),'Are you sure to delete document?',
    [
      {text: 'YES', onPress: (

      ) => {this.DeleteDocs(id)}
    },
    {text: 'NO', onPress: () => {

      }},
    
    
    ])



    
  }



  componentWillMount(){
    
    


   
    if(Common.AccessToken !='')
    {
      
      this.setState({
          path: this.props.img.title,
          imgId:this.props.img.Id,
          //visible: false,
        });

    }
    
  }


};

module.exports = ShowDoc;
