'use strict'
import React, { Component }  from 'react';
import {StyleSheet,Modal,  Text, View, Alert, TextInput, ListView, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions} from 'react-native-router-flux';
//import DropDown, {Select, Option, OptionList} from 'react-native-selectme';
import DateTimePicker from 'react-native-modal-datetime-picker'
import ListViewSelect from 'react-native-list-view-select';
import ModalPicker from 'react-native-modal-picker';
import _ from 'lodash';
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

const supportedOrientationsPickerValues = [
  ['portrait'],
  ['landscape'],
  ['landscape-left'],
  ['portrait', 'landscape-right'],
  ['portrait', 'landscape'],
  [],
];
class CheckCall extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      trips:[],
      stops:[],
      stop:{key:'0', label:"Select Stop"},
      trip: {key:'0', label:"Select Trip"},
      isShowTrips: false,
      isPayrollDate:false,
      payrollDate: "Select Date",
      isArivalTime:false,
      arivalTime:"Select Time",
      isDepartureTime:false,
      departureTime:"Select Time",
      destination: '',

      payrollData:{},
      visible: false,
      showScreen:false,
      showStops:false
    };
    // _.bindAll(this, ['showTripsPopover', 'setTripItem', 'closePopover']);
    _.bindAll(this, ['setTripItem']);
  }
  _showPayrollDate = () => this.setState({ isPayrollDate: true });
  _hidePayrollDate = () => this.setState({ isPayrollDate: false });
  _handlePayrollDatePicked = (date) => {
    this.setState({payrollDate : date.toLocaleDateString()});
    this._hidePayrollDate();
  }
  _showArivalTime = () => this.setState({ isArivalTime: true });
  _hideArivalTime = () => this.setState({ isArivalTime: false });
  _handleArivalTimePicked = (date) => {
    this.setState({arivalTime : date.toLocaleTimeString().replace(/:\d+ /, ' ')}); //date.getHours() + ':' + date.getMinutes()
    this._hideArivalTime();
  }
  _showDepartureTime = () => this.setState({ isDepartureTime: true });
  _hideDepartureTime = () => this.setState({ isDepartureTime: false });
  _handleDepartureTimePicked = (date) => {
    this.setState({departureTime : date.toLocaleTimeString().replace(/:\d+ /, ' ')}); //date.getHours() + ':' + date.getMinutes()
    this._hideDepartureTime();
  }
  // showTripsPopover() {
  //   this.setState({isShowTrips: true});
  // }
  // setTripItem(item) {
  //   this.setState({ trip: item });
  //   this.LoadPayrollData(item.id);
  // }
  setTripItem(item) {
    console.log(item);
    this.setState({ trip: item });
    this.loadStopsData(item.key);
    //
  }
  setStopItem(item) {
    console.log(item);
    this.setState({ stop: item });
    this.LoadPayrollData(item.key);
  }
  closePopover() {
    this.setState({isShowTrips: false});
  }
  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };
  render() {

    return(
      <ViewContainer>

        <View style={styles.container}>
          
          
          <ModalPicker style={[styles.button]}
              selectTextStyle={styles.buttonText}
                    children={this.buttonText()}
                    data={this.state.trips}
                    initValue={this.state.trip.label}
                    optionTextStyle={styles.rowText}
                    onChange={(option)=>{this.setTripItem(option)}} />
        </View>
        {this._renderStops()}
        {this._renderScreen()}

        <Spinner visible={this.state.visible} />
      </ViewContainer>
    );
  }
  // <Button containerStyle={styles.button} style={styles.buttonText} onPress={this.showTripsPopover}>
  //           <Text>{this.state.trip.title} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
  //         </Button>
  // <ListViewSelect style={styles.poplist}
  //           list={this.state.trips}
  //           isVisible={this.state.isShowTrips}
  //           onClick={this.setTripItem}
  //           onClose={this.closePopover}
  //         />
  buttonText(){
    return(
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.buttonText}>{this.state.trip.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:5}]}   />
      </View>
    );
  }
  buttonTextStop(){
    return(
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.buttonText}>{this.state.stop.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:5}]}   />
      </View>
    );
  }
  componentDidMount(){
    this.LoadInitialData();
  }
  LoadInitialData(){
    var API_URL = Common.baseURL + 'v1/GetDriverTrips?Type=2';
      var me = this;
      this.setState({
        visible: true,
      });
    setTimeout(function(){
      
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
          data.forEach(function(trip){
            // dataBlob.push({title:'Load #: ' + trip.ShipmentText + ', ' + trip.Status
            //   + '\nShipper: ' + trip.Shipper
            //   + '\nConsignee: ' + trip.Consignee
            //   + '\nTractor: ' + trip.TractorNumber + ', Trailer: ' + trip.TrailerNumber
            //   ,id:trip.TripId});
            dataBlob.push({label:'Load #: ' + trip.ShipmentText + ', ' + trip.Status
              + '\nShipper: ' + trip.Shipper
              + '\nConsignee: ' + trip.Consignee
              + '\nTractor: ' + trip.TractorNumber + ', Trailer: ' + trip.TrailerNumber
              ,key:trip.TripId,value:trip.TripId});
          });
          me.setState({
            trips: dataBlob,

          });
          if (dataBlob.length > 0) {
            console.log(me.state.trips[0]);
            me.setState({
              trip: me.state.trips[0]
            });
            me.loadStopsData(me.state.trips[0].key);
            //me.LoadPayrollData(me.state.trips[0].key);
          }
        })
      })
      .catch((error) => {
        this.setState({
          visible: false
        });
      });
    }, 500);
    
  }
  loadStopsData(id){
    var API_URL = Common.baseURL + 'v1/GetTripStops?Id=' + id + '&Type=1';

    
    var me = this;
    this.setState({
      visible: true,
    });
    setTimeout(function(){
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

          var dataBlob = [
          ];
          me.setState({
            visible: false,
            stops: [],
            stop:{key:'0', label:"Select Stop"},
            showStops:false,
            showScreen:false,
          });

          console.log(data);
          data.forEach(function(stop){
            dataBlob.push({label:'Date : ' + stop.Date 
              + '\nLocation: ' + stop.Location
              ,key:stop.StopId,value:stop.StopId});
          });
          me.setState({
            stops: dataBlob,
            showStops:true,
          });
        })
      })
      .catch((error) => {
        this.setState({
          visible: false
        });
      });
    }, 500);
    
  }
  LoadPayrollData(id){
    
    var API_URL = Common.baseURL + 'v1/GetDriverPayroll?Id=' + id;
    var me = this;
    this.setState({
      visible: true,
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

        var dataBlob = [
        ];
        me.setState({
          visible: false,
          payrollData: data,
          showScreen:true,
          departureTime: data.DepartureTime,
          arivalTime: data.ArrivalTime,
          payrollDate: data.PayRollDate
        });
        // me.loadStopsData(id);
        // console.log(data);

        // me.setState({
        //   payrollDate: data.CheckCallDate == null ? data.Date : data.CheckCallDate,
        //   type: {id: data.CheckCallTypeId, title: data.CheckCallType},
        //   waitTime: data.WaitTime + '',
        //   street:data.street,
        //   city: data.City,
        //   state: {id: data.StateId, title: data.StateCode},
        //   zip: data.Zip,
        //
        // });
      })
    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }
  _renderStops(){
    if (this.state.showStops == true) {
    return(
      <View>
        <ModalPicker style={[styles.button]}
              selectTextStyle={styles.buttonText}
                    children={this.buttonTextStop()}
                    data={this.state.stops}
                    initValue={this.state.stop.label}
                    optionTextStyle={styles.rowText}
                    onChange={(option)=>{this.setStopItem(option)}} 
                    />
      </View>
    );
    }
  }
  _renderScreen(){

    if (this.state.showScreen == true) {
      return(
        <View>
          
          <View style={styles.body}>
            <Text style={styles.title}>
              Truck # <Text style={styles.detail}>{this.state.payrollData.TractorNumber}</Text>
            </Text>
            <Text style={styles.title}>
              Destination: <Text style={styles.detail}>{this.state.payrollData.Destination}</Text>
            </Text>

          </View>
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showPayrollDate}>
            <Text>{this.state.payrollDate} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'date'}
            isVisible={this.state.isPayrollDate}
            onConfirm={this._handlePayrollDatePicked}
            onCancel={this._hidePayrollDate}
          />
          <Text style={styles.labels}>Arrival Time</Text>
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showArivalTime}>
            <Text>{this.state.arivalTime} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isArivalTime}
            onConfirm={this._handleArivalTimePicked}
            onCancel={this._hideArivalTime}
          />
          <Text style={styles.labels}>Departure Time</Text>
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showDepartureTime}>
            <Text>{this.state.departureTime} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isDepartureTime}
            onConfirm={this._handleDepartureTimePicked}
            onCancel={this._hideDepartureTime}
          />
          <Text style={styles.labels}>Begining Mileage</Text>
          <TextInput
            style={styles.input}
            placeholder='Begining Mileage'
            value={this.state.payrollData.SMiles + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.SMiles = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Ending Mileage</Text>
          <TextInput
            style={styles.input}
            placeholder='Ending Mileage'
            value={this.state.payrollData.EMiles + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.EMiles = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>
            Total Mileage:  <Text style={styles.detail}>{parseInt(this.state.payrollData.EMiles == '' ? '0' : this.state.payrollData.EMiles) - parseInt(this.state.payrollData.SMiles == '' ? '0' : this.state.payrollData.SMiles)}</Text>
          </Text>
          <Text style={styles.labels}>Hours Unloading</Text>
          <TextInput
            style={styles.input}
            placeholder='Hours Unloading'
            value={this.state.payrollData.HrsUnload + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.HrsUnload = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Demurrage Time/Explain</Text>
          <TextInput
            style={styles.input}
            placeholder='Demurrage Time/Explain'
            value={this.state.payrollData.Demurrage + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.Demurrage = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Loads/Unloads</Text>
          <TextInput
            style={styles.input}
            placeholder='Loads/Unloads'
            value={this.state.payrollData.LoadUnLoad + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.LoadUnLoad = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Drops</Text>
          <TextInput
            style={styles.input}
            placeholder='Drops'
            value={this.state.payrollData.Drops + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.Drops = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Lay Overs</Text>
          <TextInput
            style={styles.input}
            placeholder='Lay Overs'
            value={this.state.payrollData.LayOvers + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.LayOvers = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Pick Ups</Text>
          <TextInput
            style={styles.input}
            placeholder='Pick Ups'
            value={this.state.payrollData.PickUps + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.PickUps = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Special Instructions</Text>
          <TextInput
            style={styles.input}
            placeholder='Special Instructions'
            value={this.state.payrollData.SpecialInstraction}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.SpecialInstraction = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          
        </View>
      );
    }
  }
  _renderRow(rowData){
    return(
      <Button  onPress={() => this._handleClick(rowData.id)}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  _handleClick(id){
    Alert.alert('Confirmation','Are you sure you want to remove this product?',
      [
        {text: 'YES', onPress: () => {
          var array = this.state.checkCallProducts;
          for (var i = 0; i < this.state.checkCallProducts.length; i++) {
            if (this.state.checkCallProducts[i].product.id === id) {
              this.state.checkCallProducts.splice(i, 1);
              break;
            }
          }
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            dataSource: ds.cloneWithRows(this.state.checkCallProducts),
          });
        }},
        {text: 'NO', onPress: () => {

        }},
      ]);
  }
  savePayrollData(){
    var copy = this.state.payrollData;
    copy.ArrivalTime = this.state.arivalTime;
    copy.DepartureTime = this.state.departureTime;
    copy.PayRollDate = this.state.payrollDate;
    this.setState({
      payrollData: copy
    });
    // console.log(this.state.stop);
    // console.log(this.state.trip);
    // return
    var API_URL = Common.baseURL + 'v1/SaveDriverPayRoll?Id=' + this.state.stop.key;
    console.log(JSON.stringify(this.state.payrollData));
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
      body: JSON.stringify({TimeFrom: this.state.payrollData.ArrivalTime
        , TimeTo:this.state.payrollData.DepartureTime
        ,PayRollDate:this.state.payrollData.PayRollDate
        ,Destination:this.state.payrollData.Destination
        ,SMiles:this.state.payrollData.SMiles,EMiles:this.state.payrollData.EMiles
        ,UnloadHrs:this.state.payrollData.HrsUnload
        ,Demurrage:this.state.payrollData.Demurrage
        ,LoadUnLoad:this.state.payrollData.LoadUnLoad,Drops:this.state.payrollData.Drops
        ,LayOvers:this.state.payrollData.LayOvers,PickUps:this.state.payrollData.PickUps
        ,SpecialInstraction:this.state.payrollData.SpecialInstraction
      //  ,StopOffId:this.state.stop.key 
      })
    })
    .then((responseData) => {
      responseData.json().then(data => {
        console.log(data);
        me.setState({
          visible: false,
        });

        if(data.Success){
          //console.log(me.state.visible);
           //Common.Alert('Success', data.message);
           me.setState({payrollData:{ArrivalTime:''
            , DepartureTime:'', PayRollDate:''
            , Destination:'', SMiles:'0', EMiles:'0', UnloadHrs:'0', HrsUnload:'0'
            , Demurrage:'', LoadUnLoad:'', Drops:'', LayOvers:'', PickUps:'', SpecialInstraction:''}});
           console.log(me.state.visible);
        }
        else {
          Alert.alert(data.title,data.message);//Common.Alert(data.title, data.message);
        }
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
    marginTop: 20,

  },
  poplist:{
    backgroundColor:'#c1c1c1',
    paddingTop: 100,
  },
  icon: {
    fontSize: 22,
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:10,
  },
  button: {
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
  labels: {

    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    alignSelf: 'stretch',

  },
  input: {
    height: 40,
    padding: 7,
    flex: 4,
    fontSize: 18,
    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderRadius: 4,
    color: '#2978bd',
    marginBottom: 15
  },
  buttongreenText: {
    fontSize: 14,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: 'white',
    fontWeight:'200'
  },
  buttongreen: {
    backgroundColor: '#78CD51',
    borderColor: '#5cb85c',
    borderWidth: 1,
    borderRadius: 4,
    marginRight:10,
    marginLeft:10,
    marginTop:20,
    alignSelf: 'center',
  },
  modalBackgroundStyle:{
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainerTransparentStyle:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalCancelButton: {
    flexDirection: 'row',
    borderColor: '#fbfbfb',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  modalCancelButtonText: {
    fontSize: 14,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: 'white',
    fontWeight:'200'
  },
  modalAddButtonText: {
    fontSize: 14,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: '#333333',
    fontWeight:'200'
  },
  modalAddButton: {
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
  row: {
    flex:1,
    flexDirection: 'row',
    alignSelf:'flex-start',
    padding: 5,

  },
  text: {
    flex: 1,
    fontSize: 13,
    color: '#2a3542',
    padding:5
  },
  body:{
    backgroundColor:'#fffffe',
    borderColor:'#dddddd',
    borderBottomWidth:1,
    padding:10,

  },
});


module.exports = CheckCall;
