'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, Alert,ScrollView} from 'react-native';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions} from 'react-native-router-flux';
import ViewContainer from '../components/ViewContainer';
import Common from '../components/Common';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';

class CheckCallDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:true,
      data: null,
      strDate:'',
      strCheckCallDate:''
    }
  }
  render() {

    return(
      <ViewContainer >
        <View style={styles.body}>

<View style={{flex:1, flexDirection:'row'}}>
        <Text style={[styles.title]}>
          {strings('CheckCallDetails.Load_No')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.ShimentText : ''}</Text>
        </View>

          <View style={{flex:1, flexDirection:'row' }}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Schedule_Date')}
        </Text>



        <Text style={styles.detail}>{this.state.strDate != null ? this.state.strDate : ''}</Text>
        </View>

            <View style={{flex:1, flexDirection:'row' }}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.PickupNo')}
        </Text>



        <Text style={styles.detail}>{this.state.data != null ? this.state.data.PickupRefNo : ''}</Text>
        </View>



           

          <View style={{flex:1, flexDirection:'row' }}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.PickupCustomer')}
        </Text>



        <Text style={styles.detail}>{this.state.data != null ? this.state.data.Shipper : ''}</Text>
        </View>

         


   
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Tractor_No')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.TractorNumber : ''}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Trailer_No')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.TrailerNumber : ''}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Check_Call_Date')}
        </Text>
        <Text style={styles.detail}>{this.state.strCheckCallDate != null ? this.state.strCheckCallDate : ''}</Text>
        </View>
        
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Type')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.CheckCallType : ''}</Text>
        </View>
       {/* <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Previous_Location')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.PrevLocation : ''}</Text>
        </View>*/}
        <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.Current_Location')}
        </Text>
        <Text style={styles.detail}>{this.state.data != null ? this.state.data.CurrentLocation : ''}</Text>
        </View>
        <View style={{flex:1, flexDirection:'row'}}>
         
        <Text style={styles.title}>
          {strings('CheckCallDetails.Miles_Type')}
        </Text>
<Text style={styles.detail}>{this.state.data != null && this.state.data.MilesTypeDetail !=null && this.state.data.MilesTypeDetail.toUpperCase() =="EMPTY" ? strings('Home.Empty_MIles') : strings('Home.Loaded_Miles')}</Text>
        
        </View>

  <View style={{flex:1, flexDirection:'row' }}>
        <Text style={styles.title}>
          {strings('CheckCallDetails.PickupDetail')}
        </Text>



        <Text style={styles.detail}>{this.state.data != null ? this.state.data.PickupDetail : ''}</Text>
        </View>
 


        </View>



         <View style={{flexDirection:'row', flex:1, marginTop:10}}  >
          {this.renderComplete()}
          {/*{this.renderEmptyTrailer()}*/}
          <Button containerStyle={[styles.button,
              {}]}
              style={[styles.buttonText]} underlayColor='#f67a6e'
              onPress={() => {
                  this.editCheckCall();

              }}
          >
              {strings('CheckCallDetails.btn_Edit')}
          </Button>

        </View>
      
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} />
        </View>
      </ViewContainer>
    );
  }
  componentWillMount() {
      this.LoadData(this.props.data);
  }
componentWillUnmount() {



}
  renderEmptyTrailer(){
    if (this.state.data != null && this.state.data.AllowComplete == 1) {
      return(
        
        
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
            
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.dropTrailer();

            }}
        >
            
        </Button>
        
      );
     
    }

  }
  renderComplete(){
    if (this.state.data != null && this.state.data.AllowComplete == 1) {
      return(
        
        <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.completeCheckCall();

            }}
        >
            {strings('CheckCallDetails.btn_Complete')}
        </Button>
       /* <Button containerStyle={[styles.button,
            {backgroundColor: '#0071BC',
            
                borderColor: '#0071BC',}]}
            style={[styles.buttonText]} underlayColor='#f67a6e'
            onPress={() => {
                this.dropTrailer();

            }}
        >
            DROP EMPTY TRAILER
        </Button>*/
        
      );
     
    }

  }
  LoadData(id) {
    console.log(id);
    var API_URL = Common.baseURL + 'v1/GetCheckCallById?Id=' + id;

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
        Common.Alert('Error!', strings('CheckCallDetails.Error'));

      }
      else {
        responseData.json().then(data => {

          console.log(data);
          me.setState({
            visible: false,
            data: data
          });

var fdate = me.state.data !=null && me.state.data.strDate !=null ? me.state.data.strDate:'';
var edate = me.state.data !=null && me.state.data.strCheckCallDate !=null ? me.state.data.strCheckCallDate:'';

if(I18n.locale == 'he' &&  fdate !='' )
{
  fdate =  me.state.data.strDate.substr(3,2) + '-' + me.state.data.strDate.substr(0,2) + '-' + me.state.data.strDate.substr(6,13)


}
if(I18n.locale == 'he' &&  edate !='' )
{
  edate =  me.state.data.strCheckCallDate.substr(3,2) + '-' + me.state.data.strCheckCallDate.substr(0,2) + '-' + me.state.data.strCheckCallDate.substr(6,13)


}

me.setState({
            strDate: fdate,
            strCheckCallDate: edate
          });



          //console.log(this.state.hosdata);

        })
      }


    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }
  editCheckCall(){
    Common.GoToScreen('checkcalledit', this.state.data.TempCheckCallId);
    Common.ccClick =  Common.ccClick + 1;
  }
  completeCheckCall(){
    Alert.alert(strings('Home.Confirmation'),strings('Home.Mark_Check_Call_Msg'),
    [
      {text: 'YES', onPress: () => {
        var me = this;
        var id = this.state.data != null ? (this.state.data.CheckCallId != 0 ? this.state.data.TempCheckCallId : this.state.data.TempCheckCallId) + '' : '';
        var API_URL = Common.baseURL + 'v1/MarkCheckCall?Id=' + id  + '&LangCode=' + I18n.locale;
        me.setState({
          visible: true,
        });

        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          console.log(responseData);
          responseData.json().then(data => {

            if(data.Success)
            {
setTimeout(() => {
                 Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
}, 200);
            me.setState({
              visible: false,
            });
            
       //     Actions.pop();

       Actions.popTo('checkcalllist');

setTimeout(() => {
Actions.refresh({key:'checkcalllist'});

}, 10);

          }
          else
          {
            setTimeout(() => {
               Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });

          }, 200);

            me.setState({
              visible: false,
            });
            
      //      Actions.pop();

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
    Alert.alert(strings('Home.Confirmation'),strings('Home.Drop_Empty_Trailer_Msg'),
    [
      {text: 'YES', onPress: () => {

           var me = this;
        var id = this.state.data != null ? (this.state.data.CheckCallId != 0 ? this.state.data.TempCheckCallId : this.state.data.TempCheckCallId) + '' : '';
        var API_URL = Common.baseURL + 'v1/MarkDropEmptyTrailer?Id=' + id  + '&LangCode=' + I18n.locale;;
        me.setState({
          visible: true,
        });

        
     //   this.props.loading(true);
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'accesstoken': Common.AccessToken
          },
        })
        .then((responseData) => {
          console.log(responseData);
          responseData.json().then(data => {

            if(data.Success){

              Alert.alert(data.Title,data.message,
                [{text: 'OK'}], { cancelable: false });

                 me.setState({
              visible: false,
            });
            
            Actions.pop();
           // this.props.loading(false);
            //Common.Alert('Success', data.message);
        //    this.props.handler();

          }
          else{
              Alert.alert(data.Title,data.message,
                [{text: 'OK'}], { cancelable: false });
                 me.setState({
              visible: false,
            });
            
            
       //     this.props.loading(false);
            //Common.Alert('Success', data.message);
          //  this.props.handler();

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
}

var styles = StyleSheet.create({
  body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
    borderBottomWidth:1,
    padding:10,
    margin:10,
elevation:30, borderRadius:8,
flex:1
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
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    width:'38%',
    //fontFamily:'Museo Sans',
  },
  detail:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'left',
    width:'62%',
    //fontFamily:'Museo Sans',
  },

  buttonText: {
    fontSize: 18,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:4,
    paddingBottom:4,
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
    marginRight:10,
    marginLeft:10,
    marginTop:10
  },
});


module.exports = CheckCallDetails;
