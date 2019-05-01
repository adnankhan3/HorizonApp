'use strict'
import React, { Component }  from 'react';
import ReactNative, {StyleSheet, Text, View, Picker, ListView,ToastAndroid} from 'react-native';
import Button from 'react-native-button';
import ListViewSelect from 'react-native-list-view-select';
import ModalPicker from 'react-native-modal-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import Common from '../components/Common';
import ListItem from '../components/ListItem'
import ViewContainer from '../components/ViewContainer'

import { Actions} from 'react-native-router-flux';
import Launch from '../components/Launch';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';
class CheckCallsList extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      trips:[],
      trip: {key:0, label:strings('CheckCallList.Select_Trip') },
      isShowTrips: false,
      visible: false,
    }
    _.bindAll(this, ['showTripPopover', 'setTripItem', 'closePopover']);


  }
  // this.props.component.onRight = () => {
  //   console.warn("call from my onRight function")}
  // }
  addCheckCall(){


    if(this.state.trip !=null && this.state.trip.key !=null && this.state.trip.key !=0)
    {
    Actions.checkcall({trip: this.state.trip});
  }
  else{
    //ToastAndroid.show("Please select Trip.", ToastAndroid.SHORT);
  }
  }
  showTripPopover() {
    this.setState({isShowTrips: true});
  }
  setTripItem(item) {

    
    this.setState({ trip: item });


    //setTimeout(() => {
    this.LoadCheckCalls(item.key);



  //}, 200);

  }
  closePopover() {
    this.setState({isShowTrips: false});
  }
  render() {
    //var Item = Picker.Item;

 if (Common.AccessToken != '')
{




    return(
      <ViewContainer >
        <View style={styles.container}>

          <ModalPicker style={[styles.button]}
              selectTextStyle={styles.buttonText}
                    children={this.buttonText()}
                    data={this.state.trips}
                    initValue={this.state.trip.label}
                    optionTextStyle={styles.rowText}
                    onChange={(option)=>{this.setTripItem(option)}} />

          <ListView style={styles.listView}
              dataSource={this.state.dataSource}
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
else{
  return(<Launch loginstate={false}  />);
}
  }

  // <Button containerStyle={styles.button} style={styles.buttonText} onPress={this.showTripPopover}>
  //           <Text>{this.state.trip.title} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
  //         </Button>
  //         <ListViewSelect style={styles.poplist}
  //           list={this.state.trips}
  //           isVisible={this.state.isShowTrips}
  //           onClick={this.setTripItem}
  //           onClose={this.closePopover}
  //         />
buttonText(){
    return(
      <View style={{flexDirection:'row'}}>
        <Text style={styles.buttonText}>{this.state.trip.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:5}]}   />
      </View>
    );
  }
  componentWillReceiveProps(props){
    console.log(props);
    this.LoadInitialData();
    //var t = {key:0, label:"Select Trip"};
    console.log(this.state.trip);

   // alert('isaaed');
   
 //alert('pecpro');
  

  }
  componentDidMount(){
console.log('');

//alert('didmount');
    if(Common.AccessToken !='')
    {
    this.LoadInitialData();
    
    //console.log(this.props.trip);

Actions.refresh({
      
      
      onRight: () => {
        Common.ccClick = Common.ccClick + 1;
        this.addCheckCall();}

    });
  




    if (this.props.trip) {
      this.setTripItem(this.props.trip)
    }
    }
  }
componentWillMount(){
 // ToastAndroid.show("Adding new check call...", ToastAndroid.SHORT);

  

}

componentWillUnmount() {

//alert('Unmount');

}
  LoadInitialData(){

    
    var API_URL = Common.baseURL + 'v1/GetDriverTrips';
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
        var tripitem = {key:0, label:"Select Trip"};
        data.forEach(function(trip){
          tripitem = {label:strings('CheckCallList.Load_No') + trip.ShipmentText + ', ' + trip.Status
          + '\n' + strings('CheckCallList.Shipper') + trip.Shipper
          + '\n' + strings('CheckCallList.Consignee') + trip.Consignee
          + '\n' + strings('CheckCallList.Tractor') + trip.TractorNumber + ', ' + strings('CheckCallList.Trailer') + trip.TrailerNumber
          ,key:trip.TripId,value:trip.TripId};
          dataBlob.push(tripitem);

            if(trip.Status.toLowerCase() == 'inprogress'){
              me.setState({
                trip:tripitem
              });
            }
          // dataBlob.push({title:'Load #: ' + trip.ShipmentText + ', ' + trip.Status
          //   + '\nShipper: ' + trip.Shipper
          //   + '\nConsignee: ' + trip.Consignee
          //   + '\nTractor: ' + trip.TractorNumber + ', Trailer: ' + trip.TrailerNumber
          //   ,id:trip.TripId});
        });
        me.setState({
          trips: dataBlob,
        });
        this.setTripItem(this.state.trip);
      })
    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }
  LoadCheckCalls(id){
    var API_URL = Common.baseURL + 'v1/GetTripCheckCalls?TripId=' + id;
    var me = this;
    this.setState({
      visible: true,
    });
    console.log('a');
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },

    })
    .then((responseData) => {
      console.log('b');
      setTimeout(() => null,0);
      responseData.json().then(data => {
        console.log('c');
        var dataBlob = [
        ];
        console.log(data);

        console.log(me.state.visible);
        


        data.forEach(function(checkcall){

  var a = strings('Home.CompletedStatus');

  if(checkcall.Status.toLowerCase() == 'pending')
  {
    a = strings('Home.PendingStatus');
  }
         //var a =  {strings("CheckCallsList.Date")};
var strdate = checkcall.strDate;


if(I18n.locale == 'he')
{
  strdate =  checkcall.strDate.substr(3,2) + '-' + checkcall.strDate.substr(0,2) + '-' + checkcall.strDate.substr(6,13)
}

          dataBlob.push({title: strings("CheckCallList.Date") + strdate + '\n' + strings("CheckCallList.Type") + checkcall.CheckCallType + ', ' + a, status:checkcall.Status.toLowerCase(),id:checkcall.CheckCallId != 0 ? checkcall.TempCheckCallId : checkcall.TempCheckCallId, icon:'', iconright:'chevron-right'});

        });
        
        console.log('d');
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        me.setState({
          dataSource: ds.cloneWithRows(dataBlob),
          //visible: false,
        });

        setTimeout(() => {
          console.log('e');
          me.setState({
            visible: false,
          });
        },500);


      })
    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }
  _renderRow(rowData){
    return(
      <Button  onPress={() => this._handleClick(rowData.id)}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  _handleClick(id){
    Common.GoToScreen('checkcalldetails', id);

    Common.ccClick =  Common.ccClick + 1;
  }
  _getRows() {
    var dataBlob = [
      {title:'Load: 012065\nDate: 05-24-2016 10:39 AM\nCurrent Location: CLEVELAND OH 4418\nType: Start Trip, Completed', status:'completed', id:'1', icon:'', iconright:'chevron-right'},
      {title:'Load: 012065\nDate: 05-24-2016 10:39 AM\nType: Picked Up, Completed', status:'completed',id:'2', icon:'', iconright:'chevron-right'},
      {title:'Load: 012065\nDate: 05-25-2016 00:00 AM\nType: Delivered, Completed', status:'completed',id:'3', icon:'', iconright:'chevron-right'},
      {title:'Load: 012065\nDate: 05-25-2016 00:00 AM\nType: Drop Trailer, Completed', status:'completed',id:'4', icon:'', iconright:'chevron-right'},
      {title:'Load: 012065\nDate: 05-25-2016 00:00 AM\nType: End Trip, Pending', status:'pending',id:'5', icon:'', iconright:'chevron-right'},

    ];
    return dataBlob;
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 10,

  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    elevation:20,   
  },
  listView:
  {
    
    
  },
  buttonText: {
    fontSize: 16,
    paddingTop:8,
    paddingBottom:8,
    fontWeight:'300',
    color: '#0071BC',
    //fontFamily:'Museo Sans',
  },
  icon: {
    fontSize: 22,
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:10,
  },
  poplist:{
    backgroundColor:'#c1c1c1',
    paddingTop: 100,
  },
});


module.exports = CheckCallsList;
