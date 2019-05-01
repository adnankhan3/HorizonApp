'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View,Alert,Image,ListView,TouchableHighlight,TouchableOpacity  } from 'react-native';
import Button from 'react-native-button';

import _ from 'lodash';
import { Actions} from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer'
import Login from './Login';
import Spinner from 'react-native-loading-spinner-overlay';
import Common from '../components/Common';
import ListItemDoc from '../components/ListItemDoc'
import { strings } from '../locales/i18n';
//import Upload from 'react-native-background-upload'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
const supportedOrientationsPickerValues = [
  ['portrait'],
  ['landscape'],
  ['landscape-left'],
  ['portrait', 'landscape-right'],
  ['portrait', 'landscape'],
  [],
];
//import SignatureCapture from 'react-native-signature-capture';



var frm;
var CCId;

 class AddFile extends Component {
  constructor(props) {
    super(props);
     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      dataSource2: ds2.cloneWithRows([]),
      docs:[],
      doc: {key:0, label:'' },
      
      visible: false,
    }
    
  }
  render() {
    console.log(Common.AccessToken);
    if (Common.AccessToken == '') {

      return(<Login />);
    }
    else {
      return(
        <ViewContainer >
        <View style={styles.container}>

 <ListView style={{width:'45%'}}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => {return this._renderRow(rowData)}}
              automaticallyAdjustContentInsets={false}
              renderSeparator={Common.renderSeperator}
              scrollEnabled={false}
              enableEmptySections={true}
            />
          

          <ListView style={{width:'45%'}}
              dataSource={this.state.dataSource2}
              renderRow={(rowData) => {return this._renderRow(rowData)}}
              automaticallyAdjustContentInsets={false}
              renderSeparator={Common.renderSeperator}
              scrollEnabled={false}
              enableEmptySections={true}
            />
            
        </View>
         <Spinner visible={this.state.visible} />  
      </ViewContainer>
      );
    }

  }
_renderRow(rowData){
    return(
      <View  >
      <TouchableOpacity   delayLongPress={1000}

      onLongPress ={() => this._handleClick(rowData.Id)}
      onPress ={() => this._handleView(rowData) }
   >
        <ListItemDoc data={rowData} />

        </TouchableOpacity  >

        </View>
      
    );
  }


_handleView(data){


 

Common.GoToScreen('showdochome', data);
    
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
          me.LoadInitialData();
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


AddFile(){

 //   Common.GoToScreen('addfilehome', this.props.homedata.ShipmentId);

 
DocumentPicker.show({
      filetype: [DocumentPickerUtil.images(),DocumentPickerUtil.pdf()],
    },

    (error,res) => {
      // Android

      setTimeout(() => {

if(error == null)
{

      
      console.log(
         res.uri,
         res.type, // mime type
         res.fileName,
         res.fileSize
      );

  

var path1 ='';
var ext = 'png';


    
if(res !=null &&  res.fileName !=null && res.uri !=null )
{

  
     path1 = res.fileName;

     var words = path1.split('.');
  var count = words.length;

  if(count > 0)
  {

    
ext =   words[count - 1];


  }

 Alert.alert(strings('Home.Confirmation'),strings('Home.Msg_Save_Document')  ,
    [
      {text: 'YES', onPress: (

      ) => {this.SaveDocument(res.uri,ext)}
    },
    {text: 'NO', onPress: () => {

      }},
    
    
    ])

}

  

    }


}, 300)

  }





  );}




SaveDocument_Old(uri,ex)
  {

    var API_URL = Common.webURL + 'Account/SaveDocument' ;

    var filetype = 'image/jpeg';

    filetype = Common.GetFileType(ex);
    
    var me = this;
    //this.props.loading(true);
    
      const image = {
      uri: uri,
      type: filetype,
      name: 'file' + '-' + this.props.checkcallid + '.' + ex
    }
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    ex = '.' + ex;
    imgBody.append('ShipmentId',this.props.checkcallid);
    imgBody.append('file', image);
    imgBody.append('ext', ex);
    
    this.setState({
          visible: true,
        });
  //  imgBody.append('image', image);
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      //  'Content-Type': 'multipart/form-data',
        'accesstoken': Common.AccessToken
      },
      body: imgBody
    })
    .then((res) =>   

     res.json()

    ).then(results => {
  //.then((res) =>   res.json()).then(results => {

   
setTimeout(() => {
      Alert.alert(results.Title,results.message,
          [{text: 'OK',onPress:() => {
            this.LoadInitialData();

          } }], { cancelable: false });
        }, 200);
        
    me.setState({
          visible: false,
        });

         
        
    }).catch(error => {
      console.error(error);
      this.setState({
            visible: false
          });

         

            setTimeout(() => {
      Alert.alert('Horizon GO',error.message,
          [{text: 'OK',onPress:() => {} }], { cancelable: false });
        }, 200);



    });
  }



SaveDocument(uri,ex)
  {

    var API_URL = Common.webURL + 'Account/SaveDocument' ;

    var filetype = 'image/jpeg';

    filetype = Common.GetFileType(ex);
    
    var me = this;
    //this.props.loading(true);
    
      const image = {
      uri: uri,
      type: filetype,
      name: 'file' + '-' + this.props.checkcallid + '.' + ex
    }
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    ex = '.' + ex;
    imgBody.append('ShipmentId',this.props.checkcallid);
    imgBody.append('file', image);
    imgBody.append('ext', ex);
    
    this.setState({
          visible: true,
        });
  //  imgBody.append('image', image);
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      //  'Content-Type': 'multipart/form-data',
        'accesstoken': Common.AccessToken
      },
      body: imgBody
    })
    .then((res) =>   

     res.json()

    ).then(results => {
  //.then((res) =>   res.json()).then(results => {

   
setTimeout(() => {
      Alert.alert(results.Title,results.message,
          [{text: 'OK',onPress:() => {
            this.LoadInitialData();

          } }], { cancelable: false });
        }, 200);
        
    me.setState({
          visible: false,
        });

         
        
    }).catch(error => {
      console.error(error);
      this.setState({
            visible: false
          });

         

            setTimeout(() => {
      Alert.alert('Horizon GO',error.message,
          [{text: 'OK',onPress:() => {} }], { cancelable: false });
        }, 200);



    });
  }

componentDidMount()
{

Actions.refresh({
      
      
      onRight: () => {
        
       // alert('click');
        this.AddFile();
      }

    });
  

}
componentWillMount(){
    
    
frm = this;
CCId= this.props.checkcallid;

   
    if(Common.AccessToken !='')
    {
      this.LoadInitialData();
    }
    
  }
  
  componentWillReceiveProps(props){
    
    this.LoadInitialData();
    //var t = {key:0, label:"Select Trip"};
    

   // alert('isaaed');
   
 //alert('pecpro');
  

  }


LoadInitialData(){

    
    var API_URL = Common.baseURL + 'v1/LoadDriverDocs?Id=' + this.props.checkcallid;

    
    var me = this;
    //this.setState({
      //visible: true,
    //});
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
        me.setState({
          visible: false,
        });
        var dataBlob = [
        ];

        var dataBlob2 = [
        ];
        var tripitem = {Id:0, title:""};
        var fst = false;
        data.forEach(function(trip){
          tripitem = {title: Common.webURL + trip.DocPath
          ,Id:trip.DocId};

          if(fst == false)
          {
          dataBlob.push(tripitem);
          fst = true;
        }
        else{
          dataBlob2.push(tripitem);
          fst = false;
        }

          
        

        });
       /* me.setState({
          docs: dataBlob,
        });*/


     var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     var ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        me.setState({
          dataSource: ds.cloneWithRows(dataBlob),
          dataSource2: ds2.cloneWithRows(dataBlob2),
          //visible: false,
        });



      //  this.setTripItem(this.state.trip);
      })
    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }


  





 

}

var styles = StyleSheet.create({
 container: {
    marginTop: 10,
    marginBottom:20,
    flex:1,
    flexDirection:'row'

  },
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
    fontWeight:'200',
    fontFamily:'Museo Sans',
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
module.exports = AddFile;