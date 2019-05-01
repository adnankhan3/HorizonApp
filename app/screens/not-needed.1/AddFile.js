'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View,Alert,Image} from 'react-native';
import Button from 'react-native-button';

import _ from 'lodash';
import ViewContainer from '../components/ViewContainer'
import Login from './Login';
import Common from '../components/Common';
import SignatureCapture from 'react-native-signature-capture';
var frm;
var CCId;

 class AddSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
visible: false,
img:false,
pic: null
    }

    
  }
  render() {
    console.log(Common.AccessToken);
    if (Common.AccessToken == '') {

      return(<Login />);
    }
    else {
      return(
        <View style={{ flex: 1, flexDirection: "column", padding:10 }}>
                <Text style={{alignItems:"center",justifyContent:"center",color:"red" }}>Signature Here </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={true}
                    viewMode={"portrait"}/>
      

                <View style={{flexDirection:'row',flex:1,  alignSelf:'center'}}>

                    <Button containerStyle={[styles.button,
            {}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.saveSign();

            }}
        >
            Save
        </Button>
   <Button containerStyle={[styles.button,
            {backgroundColor: '#ffba00',
                borderColor: '#ffba00',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.resetSign();

            }}
        >
            Reset
        </Button>
        



                </View>

                <View style={{flexDirection:'row', flex:2, alignSelf:'center'}}>
<Image source={{uri: this.state.pic}} style={{width: 150, height: 110,padding:10}}/>
                    </View>

            </View>
      );
    }

  }

componentWillMount(){
    
    
frm = this;
CCId= this.props.checkcallid;

   
    if(Common.AccessToken !='')
    {
      this.LoadInitialData();
    }
    
  }
  
LoadInitialData(){
    var API_URL = Common.baseURL + 'v1/LoadSignature?Id='+ CCId ;
    var me = this;
    this.setState({
      visible: true,
      pic: null
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
      responseData.json().then(data => {
       frm.setState({
        visible: false
      });

        if(data.Success){
          
if(data.message !='')
{
             this.setState({
      
      pic: data.message
    });
    
}


          
        }
        else {
       //   Alert.alert(data.Title,data.message,
       //   [{text: 'OK'}], { cancelable: false });
          
        }
      })

    })
    .catch((error) => {
      
      this.setState({
        visible: false
      });
    });

  }



 componentDidMount(){
    
    frm = this;
    CCId= this.props.checkcallid;
    
    }



   saveSign() {
        this.refs["sign"].saveImage();
         this.setState({
        img: true
      });
    }

    resetSign() {
        this.refs["sign"].resetImage();

        this.setState({
        img: false
      });
    }

    _onSaveEvent(result) {
       
var API_URL = Common.baseURL + 'v1/SaveLoadSignature';

frm.setState({
        visible: true,
        pic: null
      });
   fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },
    
      body: JSON.stringify({
        checkCallId:CCId
          , BaseCode:result.encoded
          , WebUrl:Common.baseURL
          
      })
    })
    .then((responseData) => {
      responseData.json().then(data => {
       frm.setState({
        visible: false
      });

        if(data.Success){
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });

           frm.setState({
      
      pic: data.type
    });
    frm.refs["sign"].resetImage();
          //Actions.pop();
          //Common.Alert('Success', data.message);
        }
        else {
        //  Alert.alert(data.Title,data.message,
        //  [{text: 'OK'}], { cancelable: false });
          //Common.Alert(data.title, data.message);
        }
      })

    })
    .catch((error) => {
      frm.setState({
        visible: false
      });
    });
       }

    
    _onDragEvent() {
         // This callback will be called when the user enters signature
        console.log("dragged");
    }

}

var styles = StyleSheet.create({

 body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
   // borderBottomWidth:1,
    
    flex: 1,
    flexDirection: "column"
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
module.exports = AddSignature;