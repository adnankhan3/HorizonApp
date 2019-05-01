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
      PayRollStops: [],
      stop:{key:'0', label:"Select Stop"},
      trip: {key:'0', label:"Select Trip"},
      isShowTrips: false,
      isPayrollDate:false,
      payrollDate: "Select Date",
      isArivalTime:false,
      arivalTime:"Select Arrival Time",
      isDepartureTime:false,
      departureTime:"Select Departure Time",
      destination: '',
      StopNos:0, 
      payrollData:{},
      visible: false,
      showScreen:false,
      showStops:false,
      
      modalVisible: false,
      StopId:0,
      Index:-1, 
      TimeFrom:'',
      TimeTo:'',

    };
    // _.bindAll(this, ['showTripsPopover', 'setTripItem', 'closePopover']);
    _.bindAll(this, ['setTripItem']);
  }
  _showPayrollDate = () => this.setState({ isPayrollDate: true });
  _hidePayrollDate = () => this.setState({ isPayrollDate: false });
  _handlePayrollDatePicked = (date) => {
    this.setState({payrollDate : date.toLocaleDateString()});

    if(this.state.Index >=0 )
    {
      let i = this.state.Index;
      let timelist = this.state.PayRollStops;

      timelist[i].PayRollDate = date.toLocaleDateString();
      this.setState({PayRollStops : timelist});

    }
    this._hidePayrollDate();
  }
  _showArivalTime = () => this.setState({ isArivalTime: true });
  _hideArivalTime = () => this.setState({ isArivalTime: false });
  _handleArivalTimePicked = (date) => {
    this.setState({arivalTime : date.toLocaleTimeString().replace(/:\d+ /, ' ')}); //date.getHours() + ':' + date.getMinutes()

 if(this.state.Index >=0 )
    {
      let i = this.state.Index;
      let timelist = this.state.PayRollStops;

      timelist[i].TimeFrom = date.toLocaleTimeString().replace(/:\d+ /, ' ');
      this.setState({PayRollStops : timelist});

    }


    this._hideArivalTime();
  }
  _showDepartureTime = () => this.setState({ isDepartureTime: true });
  _hideDepartureTime = () => this.setState({ isDepartureTime: false });
  _handleDepartureTimePicked = (date) => {
    this.setState({departureTime : date.toLocaleTimeString().replace(/:\d+ /, ' ')}); //date.getHours() + ':' + date.getMinutes()

if(this.state.Index >=0 )
    {
      let i = this.state.Index;
      let timelist = this.state.PayRollStops;

      timelist[i].TimeTo = date.toLocaleTimeString().replace(/:\d+ /, ' ');
      this.setState({PayRollStops : timelist});

    }


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


    if( item !=null && item.key !=null && item.key !='0' )
    {
    this.LoadPayrollData(item.key);

  }
  else{
this.ClearControl();
  }
  
  //  this.loadStopsData(item.key);
    //
  }
  setStopItem(item) {
    console.log(item);
    this.setState({ stop: item });
  //  this.LoadPayrollData(item.key);
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
    Actions.refresh({
      onRight: () => {this.LoadInitialData();}
    });
  }
  LoadInitialData(){
    var API_URL = Common.baseURL + 'v1/GetDriverTrips?Type=1';
    console.log(API_URL);
  var dataBlobDefault = [];
dataBlobDefault.push({label:'' ,key:'0',value:'0'});
              
              


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
            // me.setState({
            //   trip: me.state.trips[0]
            // });
            me.setTripItem(me.state.trips[0]);
            //me.loadStopsData(me.state.trips[0].key);
            //me.LoadPayrollData(me.state.trips[0].key);
          }
          else{

        me.setState({
            trips: dataBlobDefault,

          });

            
            me.setTripItem(me.state.trips[0]);
      //    me.setTripItem(null);
           
         //   me.setTripItem(ntrip);
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
    var API_URL = Common.baseURL + 'v1/GetTripStops?Id=' + id;
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
            dataBlob.push({label:'' + stop.Date 
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


  ClearControl()
  {
   var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState ({
      dataSource: ds.cloneWithRows([]),
      trips:[],
      stops:[],
      PayRollStops:[],
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
    });
  }
  LoadPayrollData(id){

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var API_URL = Common.baseURL + 'v1/GetDriverPayroll?Id=' + id;
    var me = this;
    this.setState({
      visible: true,
      dataSource: ds.cloneWithRows([]),
      payrollDate:'Select Date',
      arivalTime:'Select Arrival Time',
      departureTime:'Select Departure Time',
      PayRollStops:[],
      Index:-1
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
          Index:-1,
          showScreen:true,
        //  departureTime: data.DepartureTime,
          //arivalTime: data.ArrivalTime,
          //payrollDate: data.PayRollDate
        });


 data.PayRollStops.forEach(function(pr){
          var p = {StopId:pr.StopId, Destination: pr.Destination,TimeFrom: pr.ArrivalTime,TimeTo:pr.DepartureTime,PayRollDate:pr.PayRollDate }
          me.state.PayRollStops.push(p);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          me.setState({
            dataSource: ds.cloneWithRows(me.state.PayRollStops),
          });

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
          
        

 <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this._setModalVisible(false)}
            supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
            onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
            >
            <View style={[styles.modalBackgroundStyle]}>
              <View style={[styles.innerContainer, styles.innerContainerTransparentStyle]}>
                <View style={{padding:20}}>

          <Button containerStyle={styles.button}  onPress={this._showPayrollDate}>
            <Text style={styles.buttonText}>{this.state.payrollDate} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, styles.buttonText, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'date'}
            isVisible={this.state.isPayrollDate}
            onConfirm={this._handlePayrollDatePicked}
            onCancel={this._hidePayrollDate}
          />
          
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showArivalTime}>
            <Text style={styles.buttonText}>{this.state.arivalTime} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, styles.buttonText, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isArivalTime}
            onConfirm={this._handleArivalTimePicked}
            onCancel={this._hideArivalTime}
          />
          
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showDepartureTime}>
            <Text style={styles.buttonText}>{this.state.departureTime} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, styles.buttonText, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'time'}
            isVisible={this.state.isDepartureTime}
            onConfirm={this._handleDepartureTimePicked}
            onCancel={this._hideDepartureTime}
          />
               



                
                <View style={{flex:1, flexDirection:'row', padding:30, alignSelf:'center'}}>
                  <Button containerStyle={[styles.modalAddButton]}
                    onPress={this._UpdateTime.bind(this)}
                    style={styles.modalAddButtonText}>
                    Done
                  </Button>
                  <Button containerStyle={[styles.modalCancelButton]}
                    onPress={this._setModalVisible.bind(this, false)}
                    style={styles.modalCancelButtonText}>
                    Cancel
                  </Button>
                </View>
              

              </View>
                </View>
                </View>
          
          </Modal>


 <View style={styles.body}>
            <Text style={styles.title}>
              Truck # <Text style={styles.detail}>{this.state.payrollData.TractorNumber}</Text>
            </Text>
            
              <ListView style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => {return this._renderRow(rowData)}}
              automaticallyAdjustContentInsets={false}
              renderSeparator={Common.renderSeperator}
              scrollEnabled={false}
              enableEmptySections={true}
            />


          </View>

          
          <Text style={styles.labels}>Begining Mileage</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Begining Mileage'
            keyboardType ={'numeric'}
            value={this.state.payrollData.SMiles + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.SMiles = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Ending Mileage</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Ending Mileage'
            keyboardType ={'numeric'}
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
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Hours Unloading'
            keyboardType ={'numeric'}
            value={this.state.payrollData.HrsUnload + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.HrsUnload = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Demurrage Time/Explain</Text>
          <TextInput underlineColorAndroid='transparent'
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
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Loads/Unloads'
            keyboardType ={'numeric'}
            value={this.state.payrollData.LoadUnLoad + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.LoadUnLoad = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Drops</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Drops'
            keyboardType ={'numeric'}
            value={this.state.payrollData.Drops + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.Drops = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Lay Overs</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Lay Overs'
            keyboardType ={'numeric'}
            value={this.state.payrollData.LayOvers + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.LayOvers = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Pick Ups</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Pick Ups'
            keyboardType ={'numeric'}
            value={this.state.payrollData.PickUps + ''}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.PickUps = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Text style={styles.labels}>Special Instructions</Text>
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder='Special Instructions'
            value={this.state.payrollData.SpecialInstraction}
            onChange={(event) => {
              var copy = Object.assign({}, this.state.payrollData);
              copy.SpecialInstraction = event.nativeEvent.text;
              this.setState( {payrollData: copy});}
            }
          />
          <Button containerStyle={[styles.buttongreen, {marginBottom: 30}]} style={[styles.buttongreenText, {paddingLeft:30, paddingRight:30, paddingTop:12, paddingBottom:12,}]} underlayColor='#5cb85c'
              onPress={() => {
                  this.savePayrollData();
              }}
          >
              Save Payroll Data
          </Button>
        </View>
      );
    }
  }
  

	_renderRow(rowData){

    return(
      <View style={[styles.row]}>
          <Text style={[styles.text]}>
             {rowData.Destination}   {rowData.PayRollDate}   {rowData.TimeFrom}   {rowData.TimeTo}
          </Text>
          
          <Button  onPress={() => this._handleClick(rowData.StopId)}>
            <Icon name={'edit'} size={22} marginRight={5} color="#2a3542"  />
          </Button>
      </View>

    );
  }



 _UpdateTime(){

let i = this.state.Index;
    

    this.setState({modalVisible: false});
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(this.state.PayRollStops),
    });



 this.setState({Index:-1,
                 arivalTime:'Select Arrival Time',
                 departureTime:'Select Departure Time',
                 payrollDate: 'Select Date'

               })


 }

  _handleClick(id){
    
          var array = this.state.PayRollStops;
          for (var i = 0; i < this.state.PayRollStops.length; i++) {
            if (this.state.PayRollStops[i].StopId === id) {
              this.setState({Index:i,
                 arivalTime:this.state.PayRollStops[i].TimeFrom !=null && this.state.PayRollStops[i].TimeFrom !='' ?  this.state.PayRollStops[i].TimeFrom:'Select Arrival Time',
                departureTime:this.state.PayRollStops[i].TimeTo !=null && this.state.PayRollStops[i].TimeTo !='' ? this.state.PayRollStops[i].TimeTo:'Select Departure Time',
                 payrollDate: this.state.PayRollStops[i].PayRollDate !=null && this.state.PayRollStops[i].PayRollDate != '' ? this.state.PayRollStops[i].PayRollDate:'Select Date'

               })
            
                this._setModalVisible(true);
                break;
            }
          }
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            dataSource: ds.cloneWithRows(this.state.PayRollStops),
          });
        
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
    var API_URL = Common.baseURL + 'v1/SaveDriverPayRoll?Id=' + this.state.trip.key;
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
      body: JSON.stringify({
        
        SMiles:this.state.payrollData.SMiles,EMiles:this.state.payrollData.EMiles
        ,UnloadHrs:this.state.payrollData.HrsUnload
        ,Demurrage:this.state.payrollData.Demurrage
        ,LoadUnLoad:this.state.payrollData.LoadUnLoad,Drops:this.state.payrollData.Drops
        ,LayOvers:this.state.payrollData.LayOvers,PickUps:this.state.payrollData.PickUps
        ,SpecialInstraction:this.state.payrollData.SpecialInstraction
        ,PayRollStops:this.state.PayRollStops
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
          console.log(data);
           //Common.Alert('Success', data.message);
           me.setState({payrollData:{ArrivalTime:''
            , DepartureTime:'', PayRollDate:'',PayRollStops:[]
            , Destination:'', SMiles:'0', EMiles:'0', UnloadHrs:'0', HrsUnload:'0'
            
            ,Index:-1
            , Demurrage:'', LoadUnLoad:'', Drops:'', LayOvers:'', PickUps:'', SpecialInstraction:''}});
           
           Alert.alert(data.Title,data.message,
          [{text: 'OK', onPress: () => me.LoadInitialData()}], { cancelable: false });
           console.log('sdsdsd');
           

        }
        else {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
           console.log('cancelable');//Common.Alert(data.title, data.message);
        }
      })

    })
    .catch((error) => {
      console.log(error);
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
    height:35,
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
  buttonText: {
   fontSize: 14,
   color:'#0367aa'
 },
  modalAddButton: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    height:35,
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
