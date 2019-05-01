'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image, Alert,Modal,PixelRatio,TouchableHighlight,TextInput} from 'react-native';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TripDetails from '../screens/TripDetails'
import Common from '../components/Common'


import Login from '../screens/Login'
import ModalPicker from 'react-native-modal-picker';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
const FilePickerManager = require('NativeModules').FilePickerManager;

import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
//import Upload from 'react-native-background-upload'



const supportedOrientationsPickerValues = [
  ['portrait'],
  ['landscape'],
  ['landscape-left'],
  ['portrait', 'landscape-right'],
  ['portrait', 'landscape'],
  [],
];
class CheckCallInfo extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      visible:true,
      modalVisible: false,  
      commentModalVisible:false,
      Trailers:[],
      loadTrailers:false, 
      disablecomment:false, 
      seltrailer:{key:0, label:"Select Trailer",value:0}
    
    };
    //    _.bindAll(this, ['AttachTrailer']);
//this.AttachTrailer();
  }


 AttachTrailer()
{
   var dataBlob = [
          ];


    if (this.props.homedata !=null && this.state.loadTrailers == false ) {

var trlrlist = this.props.homedata.TrailerList !=null ? this.props.homedata.TrailerList:null;


if(trlrlist !=null  )
{
        trlrlist.forEach(function(trlr){
            dataBlob.push({label: trlr.label 
              
              ,key:trlr.Key,value:trlr.Key}); 

              
          });

      this.setState({
            Trailers: dataBlob,
            seltrailer:dataBlob[0],
            loadTrailers:true
           // seltrailer: this.props.trailerdata[0]
          });

}

          
          
    }
   

     
 //   }, 500);
}


  render() {

 if(this.props.data != null)
      {
    return(

     
      <View style={styles.body1}>

<Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this._setModalVisible(false)}
            supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
            onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
            >
            <View style={[styles.modalBackgroundStyle]}>
             <View style={[styles.innerContainerTransparentStyle]}> 
                <View style={{padding:20}}>
                  


                  <ModalPicker style={[styles.modalPickerbutton]}
                  selectTextStyle={styles.buttonTextModalPick}
                    children={this.buttonText()}
                    data={this.state.Trailers}
                    initValue={this.state.seltrailer !=null ? this.state.seltrailer.label:''}
                    optionTextStyle={styles.rowText}
                    
                     onChange={(option)=>{this.setTrailer(option)}} />



                </View>
                <View style={{flexDirection:'row', padding:10, alignSelf:'center'}}>
                  <Button containerStyle={[styles.modalAddButton]}
                  onPress={this._UpdateTrailer.bind(this) }
                    
                    style={styles.modalAddButtonText}>
                    
                    {strings('Home.btn_Save')}
                  </Button>
                  <Button containerStyle={[styles.modalCancelButton]}
                    onPress={this._setModalVisible.bind(this, false) }
                    style={styles.modalCancelButtonText}>
                    {strings('Home.btn_Cancel')}
                  </Button>
                </View>
              </View>
            </View>
          </Modal>

<Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.commentModalVisible}
            onRequestClose={() => this._setCommentModalVisible(false)}
            supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
            onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
            >
            <View style={[styles.modalBackgroundStyle2]}>
             <View style={[styles.innerContainerTransparentStyle2]}> 


<View style={{flexDirection:'row', padding:1,alignSelf: 'flex-end'}}>
                 
                  <Button containerStyle={[styles.modalCancelButton]}
                    onPress={this._setCommentModalVisible.bind(this, false) }
                     >
                    <Icon name={'close'} size={22} marginRight={5} color="#2a3542"  />
                  </Button>
                </View>

                <View style={{padding:20,paddingTop:1}}>
                  <Text style={styles.comment}>
    {this.props.comment}
                    </Text>




                </View>
                
              </View>
            </View>
          </Modal>



<View style={styles.body}>


        {this._renderScheduleDate()}
        
        {this._renderTractor()}
        {this._renderTrailer()}
        
        
          {this._renderType()}
          {this._renderStatus()}
        
        {this._renderPreviousLocation()}
        <View style={{flex:1, flexDirection:'row'}}>
        {this._renderCurrentLocation()}
        </View>

        
          {this._renderMilesType()}
          {this._renderMiles()}
          
        
              
                
          {this._renderRate()}
          {this._renderPickupNo()}

                   
</View>
            
        <View style={{flexDirection:'row', marginTop:20}}>
          {this._renderComplete()}
         
          {this._renderEdit()}
          {this._renderComment()}
          


        </View>
  <View style={{flexDirection:'row', marginTop:10}}>
          
          
          
  {this._renderDropTrailer()}
          {this._renderEmptyDropTrailer()}
         {this. _renderLoadedDropTrailer()}

        </View>
        <View style={{flexDirection:'row', paddingTop:10}}>
         
{this._renderSignature()}

{this._renderShowDocs()}

</View>
          </View>
    
      

    );

      }
      else{
         return(

     
      <View style={styles.body}>
        </View>

         );
      }
      
  }
componentDidMount(){
    
 
    this.AttachTrailer();
  }


componentWillMount(){
//this. AttachTrailer();  
  }
 componentWillReceiveProps(props){
    console.log('test');
 //  this. AttachTrailer();  
  }
_setModalVisible = (visible) => {
    this.setState({modalVisible: visible});

  };


_setCommentModalVisible = (visible) => {
    this.setState({commentModalVisible: visible});

  };


  buttonText() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonTextModalPick}> {this.state.seltrailer !=null ? this.state.seltrailer.label:''}</Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }


 setTrailer(item) {
    this.setState({seltrailer: item});
  }
  _renderScheduleDate(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;

    if (settings != null  && settings.find(x => x.Code === 'S089') != null && settings.find(x => x.Code === 'S089').Value == 1) {
      return(

        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          {'Schedule Date: '}  
        </Text>
<Text style={styles.detail}>{this.props.data != null  ? this.props.data.strDate.toUpperCase() : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
  _renderType(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;

    if (settings != null  && settings.find(x => x.Code === 'S081') != null && settings.find(x => x.Code === 'S081').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          
          {strings('Home.Type')}
        </Text>

        <Text style={styles.detail}>{this.props.data != null && this.props.data.CheckCallType ? this.props.data.CheckCallType.toUpperCase() : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
  _renderStatus(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S082') != null && settings.find(x => x.Code === 'S082').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          {strings('Home.Status')}
        </Text>
        <Text style={styles.detail}>{this.props.data != null &&  this.props.data.Status !=null && this.props.data.Status.toUpperCase() == 'COMPLETED'  ? strings('Home.CompletedStatus') : strings('Home.PendingStatus')}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
  _renderPreviousLocation(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S083') != null && settings.find(x => x.Code === 'S083').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('Home.Previous_Location')} 
        </Text>
        <Text style={styles.detail}>{this.props.data != null && this.props.data.PrevLocation !=null ? this.props.data.PrevLocation.toUpperCase() : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
  _renderCurrentLocation(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;

 
    if (settings != null  && settings.find(x => x.Code === 'S084') != null && settings.find(x => x.Code === 'S084').Value == 1) {
      return(
 <Button onPress={() => {
                this.ShowMap(); 

            }}>
          
       
        <Text style={styles.title}>
          {strings('Home.Current_Location')} 

                 
                 </Text>
                 <Text style={styles.detail} >{this.props.data != null && this.props.data.Location !=null ? this.props.data.Location.toUpperCase() : ''}</Text>
                 </Button>

      );
    }
    else {
        return null;
    }
  }





  _renderMilesType(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S085') != null && settings.find(x => x.Code === 'S085').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
         {strings('Home.Miles_Type')} 
        </Text>
        <Text style={styles.detail}>{this.props.data != null && this.props.data.MilesTypeDetail !=null && this.props.data.MilesTypeDetail.toUpperCase() == 'EMPTY' ? strings('Home.Empty_MIles') :  strings('Home.Loaded_Miles')}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
  _renderMiles(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S086') != null && settings.find(x => x.Code === 'S086').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('Home.Miles')} 
        </Text>
         <Text style={styles.detail}>{this.props.data != null ? this.props.data.Miles : ''}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }
_renderPickupNo(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = false;

    if(this.props.data != null && this.props.data.RefTitle !=null && this.props.data.RefTitle !='')
    {
blnshow = true;
    }

    if ((settings != null  && settings.find(x => x.Code === 'S115') != null && settings.find(x => x.Code === 'S115').Value == 1) && blnshow == true  ) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          {/*{this.props.data != null ? this.props.data.RefTitle + '' : ''} */}
          {strings('Home.Pickup_No')} 
        </Text>
        <Text style={styles.detail}>{this.props.data != null && this.props.data.RefNo !=null ? this.props.data.RefNo.toUpperCase() : '12345'}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }

_renderRate(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S113') != null && settings.find(x => x.Code === 'S113').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('Home.Rate')} 
        </Text>
        <Text style={styles.detail}>{this.props.homedata != null ? this.props.homedata.TotalCharges : '0'}</Text>
        </View>
      );
    }
    else {
        return null;
    }
  }

  _renderTractor(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    
    if (settings != null  && settings.find(x => x.Code === 'S076') != null && settings.find(x => x.Code === 'S076').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
           
          {strings('Home.Tractor')}
        </Text>

        <Text style={styles.detail}>{this.props.homedata != null && this.props.homedata.TractorNumber !=null ? this.props.homedata.TractorNumber.toUpperCase() : ''}</Text>
</View>
        
    
        
      );
    }
    else {
        return null;
    }
  }
  _renderTrailer(){



var blnshow = true;
if( this.props.data !=null &&  this.props.data.ShowDropTrailer === 0 )
{
  blnshow = false;
}
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null  && settings.find(x => x.Code === 'S077') != null && settings.find(x => x.Code === 'S077').Value == 1) {
      return(
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('Home.Trailer')}
         
          
        </Text>
      
      <Text style={styles.detailtrailer}>{this.props.homedata != null && this.props.homedata.TrailerNumber && blnshow == true ? ' '+ this.props.homedata.TrailerNumber.toUpperCase() : ''}</Text>
        <Button onPress={() => this._handleClick()} >
            <Icon name={'edit'} size={22} marginRight={5} color="#2a3542"  />
          </Button>
          </View>
      );
    }
    else {
        return null;
    }
  }

_handleClick()
{
  this.AttachTrailer();
  this._setModalVisible(true);
              
}

  _renderComplete(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    if (settings != null) {
      //console.log(settings.find(x => x.Code === 'S093'))
    }
    //console.log(settings.find(x => x.Code === 'S093'));
    if (settings != null  && settings.find(x => x.Code === 'S093') != null && settings.find(x => x.Code === 'S093').Value == 1) {
      return(
        <Button    containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.completeCheckCall();

            }}
        >
            {/*{settings.find(x => x.Code === 'S087').Value.toUpperCase()}*/}
            {strings('Home.btn_Complete')}
        </Button>
      );
    }
    else {
        return null;
    }
  }





_renderFile(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
   
    
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S114') != null && settings.find(x => x.Code === 'S114').Value == 1    ) {

   //   if ( 1 > 0    ) {
      return(

        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'

            onPress={this.AddFile.bind(this)}
           
        >
        {strings('Home.btn_Attach_Doc')}
            
        </Button>
      );
    }
    else {
        return null;
    }
  }



_renderComment(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = true;
    if(this.props.data !=null &&  this.props.comment !=null && this.props.comment !=''  )
    {
      blnshow = false;
    }
    
    //console.log(this.props.homedata);
    if ( this.props.data !=null   ) {
      return(
        <Button disabled={blnshow}  containerStyle={[styles.button,
        
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.ShowComment(); 

            }}
        >
            {strings('Home.btn_Comment')}
        </Button>
      );
    }
    else {
        return null;
    }
  }


_renderShowDocs(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = false;
    if(this.props.data !=null &&  this.props.data.CheckCallTypeId == 16 && this.props.data.CustomerType == '2'   )
    {
      blnshow = true;
    }
    
    //console.log(this.props.homedata);
    if ( 1 > 0  ) {
      return(
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.AddDocs(); 

            }}
        >
            {'View Docs/Pics'}
        </Button>
      );
    }
    else {
        return null;
    }
  }


 _renderSignature(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = false;
    if(this.props.data !=null &&  this.props.data.CheckCallTypeId == 16 && this.props.data.CustomerType == '2'   )
    {
      blnshow = true;
    }
    
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S110') != null && settings.find(x => x.Code === 'S110').Value == 1  && blnshow == true  ) {
      return(
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.AddSignature(); 

            }}
        >
            {strings('Home.btn_Signature')}
        </Button>
      );
    }
    else {
        return null;
    }
  }

 _renderLoadedDropTrailer(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = false;
    if(this.props.data !=null &&  this.props.data.CheckCallTypeId == 16 && this.props.data.CustomerType == '2' && this.props.data.LastCheckCallTypeId !=9  )
    {
      blnshow = true;
    }
    
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S108') != null && settings.find(x => x.Code === 'S108').Value == 1  && blnshow == true  ) {
      return(
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.dropLoadedTrailer(); 

            }}
        >
            {/*{settings.find(x => x.Code === 'S109').Value.toUpperCase()}*/}
            {strings('Home.btn_Drop_Loaded_Trailer').toUpperCase()}
        </Button>
      );
    }
    else {
        return null;
    }
  }


 _renderEmptyDropTrailer(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    var blnshow = false;
    if(this.props.data !=null &&  this.props.data.CheckCallTypeId == 3 && this.props.data.CustomerType == '1' && this.props.data.LastCheckCallTypeId !=22  )
    {
      blnshow = true;
    }
    
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S106') != null && settings.find(x => x.Code === 'S106').Value == 1  && blnshow == true  ) {
      return(
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.dropEmptyTrailer(); 

            }}
        >
            {/*{settings.find(x => x.Code === 'S107').Value.toUpperCase()}*/}

            {strings('Home.btn_Drop_Empty_Trailer').toUpperCase()}
        </Button>
      );
    }
    else {
        return null;
    }
  }




  _renderDropTrailer(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S095') != null && settings.find(x => x.Code === 'S095').Value == 1) {
      return(
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.dropTrailer();

            }}
        >
            {/*{settings.find(x => x.Code === 'S092').Value.toUpperCase()}*/}
            {strings('Home.btn_Drop_Trailer').toUpperCase()}
        </Button>
      );
    }
    else {
        return null;
    }
  }
  _renderEdit(){
    var settings = this.props.homedata != null ? this.props.homedata.Settings : null;
    //console.log(this.props.homedata);
    if (settings != null  && settings.find(x => x.Code === 'S094') != null && settings.find(x => x.Code === 'S094').Value == 1) {
      return(
        <Button  containerStyle={[styles.button,
            {}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.editCheckCall();

            }}
        >
        {strings('Home.btn_Edit')}
            {/*{settings.find(x => x.Code === 'S088').Value.toUpperCase()}*/}
        </Button>
      );
    }
    else {
        return null;
    }
  }
  completeCheckCall(){

        
    
    Alert.alert(strings('Home.Confirmation') ,strings('Home.Mark_Check_Call_Msg'),
    [
      {text: 'YES', onPress: () => {
        var API_URL = Common.baseURL + 'v1/MarkCheckCall?Id=' + this.props.data.TempCheckCallId  + '&LangCode=' + I18n.locale; ;


        var me = this;
        this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          //console.log(responseData);
          responseData.json().then(data => {
             if(data.Success)
            {
            

        //     Alert.alert(data.Title,data.message,
       //   [{text: 'OK'}], { cancelable: false });
           
           this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

        }
        else {
            
setTimeout(() => {

          Alert.alert(data.Title,strings('Home.Mark_Check_Call_Success_Msg'),
          [{text: 'OK'}], { cancelable: false });

}, 200);

          if(data.redirect !=null &&  data.redirect == "login")
          {
          Common.AccessToken ='';    
        //  Common.GoToScreen('logout');
          }

          this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

          
           
           
        }

          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visible: false
          });
        });
      }},
      {text: 'NO', onPress: () => {

      }},
    ]);

  }



 _UpdateTrailer(){
 

    
     Alert.alert(strings('Home.Confirmation'),strings('Home.Update_Trailer_Message'),
    [
      {text: 'YES', onPress: () => {
        var API_URL = Common.baseURL + 'v1/UpdateTripTrailer' ;

        var me = this;
        this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },

          body: JSON.stringify({
        
        TrailerId:this.state.seltrailer.key,TripId:this.props.homedata.TripId,LangCode:I18n.locale
        
      
      })


        })
        .then((responseData) => {
          
          responseData.json().then(data => {

            if(data.Success){
              this.setState({modalVisible: false});
             //   Alert.alert(data.Title,data.message,
            //    [{text: 'OK'}], { cancelable: false });


            this.props.loading(false);
            
            this.props.handler();

          }
          
           else {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
           
             if(data.redirect !=null &&  data.redirect == "login")
          {
          Common.AccessToken ='';    
        //  Common.GoToScreen('logout');
          }


           this.props.loading(false);
            
            this.props.handler();
        } 

            

          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visible: false
          });
        });
      }},
      {text: 'NO', onPress: () => {

      }},
    ]);
   

 }


dropEmptyTrailer(){
    Alert.alert(strings('Home.Confirmation'),strings('Home.Drop_Empty_Trailer_Msg'),
    [
      {text: 'YES', onPress: () => {
        var API_URL = Common.baseURL + 'v1/MarkDropEmptyTrailer?Id=' + this.props.data.TempCheckCallId  + '&LangCode=' + I18n.locale;;

        var me = this;
        this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          //console.log(responseData);
          responseData.json().then(data => {
            if(data.Success)
            {
            

        //     Alert.alert(data.Title,data.message,
      //    [{text: 'OK'}], { cancelable: false });
           
           this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

        }
        else {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
           if(data.redirect !=null &&  data.redirect == "login")
          {
          Common.AccessToken ='';    
        //  Common.GoToScreen('logout');
          }
           
           this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();
        }



          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visible: false
          });
        });
      }},
      {text: 'NO', onPress: () => {

      }},
    ]);

  }


  dropLoadedTrailer(){
    Alert.alert(strings('Home.Confirmation'),strings('Home.Drop_Loaded_Trailer_Msg'),
    [
      {text: 'YES', onPress: () => {
        var API_URL = Common.baseURL + 'v1/MarkDropLoadedTrailer?Id=' + this.props.data.TempCheckCallId + '&LangCode=' + I18n.locale;;

        var me = this;
        this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          //console.log(responseData);
          responseData.json().then(data => {
            if(data.Success)
            {
            

        //     Alert.alert(data.Title,data.message,
       //   [{text: 'OK'}], { cancelable: false });
           
           this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

        }
        else {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
           if(data.redirect !=null &&  data.redirect == "login")
          {
          Common.AccessToken ='';    
        //  Common.GoToScreen('logout');
          }
           
           this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();
        }



          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visible: false
          });
        });
      }},
      {text: 'NO', onPress: () => {

      }},
    ]);

  }



  dropTrailer(){
    Alert.alert(strings('Home.Confirmation'),strings('Home.Drop_Trailer_Msg'),
    [
      {text: 'YES', onPress: () => {
        var API_URL = Common.baseURL + 'v1/MarkDropTrailer?Id=' + this.props.data.TempCheckCallId + '&LangCode=' + I18n.locale;;

        var me = this;
        this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          //console.log(responseData);
          responseData.json().then(data => {
            this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

          })
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            visible: false
          });
        });
      }},
      {text: 'NO', onPress: () => {

      }},
    ]);

  }
  editCheckCall(){

    Common.GoToScreen('checkcalledithome', this.props.data.TempCheckCallId);
  }


 ShowComment(){

    
this._setCommentModalVisible(true);


  }



 AddDocs(){

    Common.GoToScreen('adddochome', this.props.homedata.ShipmentId);



  }


  AddSignature(){

    Common.GoToScreen('addsignaturehome', this.props.homedata.ShipmentId);



  }

  ShowMap(){

Common.lang = 0;
  Common.lat =0;
     Common.locationTitile ='Home Location';
   Common.locationDesc ='';
  if(this.props.data != null)
  {
    Common.lang = this.props.data.Lng;
    Common.lat = this.props.data.Lat;

      
   Common.locationDesc = this.props.data.Location;
  }

  
 //   Common.GoToScreen('mapscreen', 1);



  }



  


  SaveDocument_Old(uri,ex)
  {

    var API_URL = Common.webURL + 'Account/SaveDocument' ;

    var filetype = 'image/jpeg';

    filetype = Common.GetFileType(ex);
    
    this.props.loading(true);
    
    const image = {
      uri: uri,
      type: filetype,
      name: 'file' + '-' + this.props.homedata.ShipmentId + '.' + ex
    }
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    ex = '.' + ex;
    imgBody.append('ShipmentId',this.props.homedata.ShipmentId);
    imgBody.append('file', image);
    imgBody.append('ext', ex);
    
    
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
          [{text: 'OK',onPress:() => {} }], { cancelable: false });
        }, 200);
        
    

          this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();
        
    }).catch(error => {
      console.error(error);
      this.setState({
            visible: false
          });

          this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

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
    
    this.props.loading(true);
    
      const image = {
      uri: uri,
      type: filetype,
      name: 'file' + '-' + this.props.homedata.ShipmentId + '.' + ex
    }
    // Instantiate a FormData() object
    const imgBody = new FormData();
    // append the image to the object with the title 'image'
    ex = '.' + ex;
    imgBody.append('ShipmentId',this.props.homedata.ShipmentId);
    imgBody.append('file', image);
    imgBody.append('ext', ex);
    
    
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
          [{text: 'OK',onPress:() => {} }], { cancelable: false });
        }, 200);
        
    

          this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();
        
    }).catch(error => {
      console.error(error);
      this.setState({
            visible: false
          });

          this.props.loading(false);
            //Common.Alert('Success', data.message);
            this.props.handler();

            setTimeout(() => {
      Alert.alert('Horizon GO',error.message,
          [{text: 'OK',onPress:() => {} }], { cancelable: false });
        }, 200);



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

 Alert.alert(strings('Home.Confirmation'),strings('Home.Msg_Save_Document'),
    [
      {text: 'YES', onPress: (

      ) => {this.SaveDocument(res.uri,ext)}
    },
    {text: 'NO', onPress: () => {

      }},
    
    
    ])

}

  





      ///

    }


}, 300)

  }





  );}

  







   AddFile_2(){

 //   Common.GoToScreen('addfilehome', this.props.homedata.ShipmentId);

 
  const options = {
      title: 'File Picker',
      chooseFileButtonTitle: 'Choose File...'
    };
FilePickerManager.showFilePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled file picker');
  }
  else if (response.error) {
    console.log('FilePickerManager Error: ', response.error);
  }
  else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  }
  else {
   // this.setState({
   //   file: response
    //});
var path1 ='';
var ext = 'png';
    
if(response !=null &&  response.path !=null && response.uri !=null )
{
     path1 = response.path;

     var words = path1.split('.');
  var count = words.length;

  if(count > 0)
  {

    
ext =   words[count - 1];


  }

 Alert.alert('Confirmation','Are you sure you want to Save Document?',
    [
      {text: 'YES', onPress: (

      ) => {this.SaveDocument(response.uri,ext)}
    },
    {text: 'NO', onPress: () => {

      }},
    
    
    ])

}

  }
});



  }
}

var styles = StyleSheet.create({
  body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
    //borderBottomWidth:1,
    padding:10,
borderWidth:1,
    elevation:20,   
    margin:10,
    borderRadius:6,
  },
   body1:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
    //borderBottomWidth:1,
    

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
    fontFamily:'Museo Sans',
  },

 title2:{
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    width:'45%',
    //fontFamily:'Museo Sans',
  },

  title:{
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    width:'40%',
    //fontFamily:'Museo Sans',
  },
  detail:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'justify',
    width:'60%',
    //fontFamily:'Museo Sans',
  },

comment:{
    fontSize:16,
  //  fontWeight: "400",
    color: '#0071BC',
    textAlign:'left',
    
    //fontFamily:'Museo Sans',
  },

detail2:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'justify',
    width:'55%',
   // fontFamily:'Museo Sans',
  },
detailtrailer:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'justify',
    width:'45%',
    //fontFamily:'Museo Sans',
  },

detailunderline:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'justify',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#6666ff",
    width:'60%',
    height:50,
    
    //fontFamily:'Museo Sans',

  },

  buttonText: {
    fontSize: 16,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:8,
    paddingBottom:8,
    color: '#fff',
    fontWeight:'200',
    //fontFamily:'Museo Sans',
    textAlign:'center',
  },
  button: {
    backgroundColor: '#0071BC',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 4,
    marginRight:5,
    marginLeft:5,

    marginTop:10,
    
  },

  modalPickerbutton: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  modalBackgroundStyle2: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

modalBackgroundStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainerTransparentStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

   innerContainerTransparentStyle2: {
    backgroundColor: '#fff',
    borderRadius:20
  },
  modalCancelButton: {
    flexDirection: 'row',
    borderColor: '#fbfbfb',
    borderWidth: 1,
    height:35,
    borderRadius: 4,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  modalCancelButtonText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'white',
    fontWeight: '200'
  },

  modalCancelButtonText2: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'red',
    fontWeight: '200'
  },
  modalAddButtonText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#333333',
    fontWeight: '200'
  },
  fileInfo: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
	margin: 5,
	padding: 5
  },
  modalAddButton: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    height:35,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonTextModalPick: {
   fontSize: 14,
   color:'#0367aa',
   padding: 15,
  
 },

});

module.exports = CheckCallInfo;
