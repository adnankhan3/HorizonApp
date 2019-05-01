'use strict'
import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, Alert, TextInput, ListView,ToastAndroid } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { Actions } from 'react-native-router-flux';
//import DropDown, {Select, Option, OptionList} from 'react-native-selectme';
import DateTimePicker from 'react-native-modal-datetime-picker'
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';

import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'
import ModalPicker from 'react-native-modal-picker';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';

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


    
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      checkCallProducts: [],
      pcs: '0',
      weight: '0',
      saveproduct: { key: 0, label: strings('AddCheckCall.Select_Product') },
      product: { id: 0, title: strings('AddCheckCall.Select_Product') },
      productlist: [],
      state: { key: '0', label: strings('AddCheckCall.Select_State') },
      statelist: [],
      type: { key: '0', label: strings('AddCheckCall.Select_Type') },
      typelist: [],
      isShowProducts: false,
      isShowStates: false,
      isShowTypes: false,
      isDateTimePickerVisible: false,
      itemDate: strings('AddCheckCall.Select_Date') ,
      visible: false,
      modalVisible: false,
      waitTime: '',
      street: '',
      city: '',
      zip: '',
      checkCallId: '0'
    };
    _.bindAll(this, ['showProductPopover', 'setProductItem', 'showTypePopover', 'setTypeItem', 'showStatePopover', 'closePopover', 'setStateItem']);

  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    //this.setState({itemDate : date.toLocaleString().substring(0,date.toLocaleString().indexOf(', '))});
  //  this.setState({ itemDate: date.toLocaleString() });
  this.setState({itemDate : date.toISOString().slice(0, 19)});
  //this.setState({itemDate : date.toString()});

  
    this._hideDateTimePicker()
    //this.setState({ itemDate: date });
  }
  showProductPopover() {
    this.setState({ isShowProducts: true });
  }
  showStatePopover() {
    this.setState({ isShowStates: true });
  }
  showTypePopover() {
    this.setState({ isShowTypes: true });
  }
  setProductItem(item) {
    this.setState({ saveproduct: item });
  }
  setTypeItem(item) {

    this.setState({ type: item });
  }
  setStateItem(item) {
    this.setState({ state: item });
  }
  closePopover() {
    this.setState({ isShowStates: false, isShowTypes: false, isShowProducts: false });
  }
  _addProduct() {

    var sprod = { id: this.state.saveproduct.key, title: this.state.saveproduct.label }
    var p = { product: sprod, pcs: this.state.pcs, weight: this.state.weight }
    this.state.checkCallProducts.push(p);
    this.setState({ modalVisible: false });
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(this.state.checkCallProducts),
      saveproduct: {Key:0, label:strings('AddCheckCall.Select_Product')},
      weight :'',
      pcs: '',
    });

    //console.log(this.state.checkCallProducts);
  }

 _setCancel = (visible) => {
    this.setState({modalVisible: visible,
      saveproduct: {Key:0, label:strings('AddCheckCall.Select_Product')},
      weight :'',
      pcs: '',
    });

  };
  _setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });

  };
  render() {
    console.log(this.props);
if(this.props.trip !=null && this.props.trip.key !=null && this.props.trip.key !=0  )
    {
    
    return (
      <ViewContainer>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this._setModalVisible(false)}
          supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
          onOrientationChange={evt => this.setState({ currentOrientation: evt.nativeEvent.orientation })}
        >
          <View style={[styles.modalBackgroundStyle]}>
            <View style={[styles.innerContainer, styles.innerContainerTransparentStyle]}>
              <View style={{ padding: 5 }}>
               

                <ModalPicker style={[styles.button]}
                  selectTextStyle={styles.buttonText}
                    children={this.buttonTextProduct()}
                    data={this.state.productslist}
                    initValue={this.state.saveproduct.label}
                    optionTextStyle={styles.rowText}
                     onChange={(option)=>{this.setProductItem(option)}} />


<TextInput underlineColorAndroid='transparent'
                    style={[styles.modalinput, {color: '#d2d2d2'}]}
                    placeholder={strings('EditCheckCall.Pieces')}
                    placeholderTextColor= '#d2d2d2'
                    keyboardType ={'numeric'}
                    
                    value={this.state.pcs}
                    onChange={(event) => this.setState({ pcs: event.nativeEvent.text })}
                  />

                  <TextInput underlineColorAndroid='transparent'
                    style={[styles.modalinput, {color: '#d2d2d2', marginBottom:1}]}
                    placeholder={strings('EditCheckCall.Weight')}
                    keyboardType ={'numeric'}
                    placeholderTextColor= '#d2d2d2'
                    value={this.state.weight}
                  onChange={(event) => this.setState({ weight: event.nativeEvent.text })}
                  />

                
              </View>
              <View style={{ flexDirection: 'row', padding: 10, alignSelf: 'center' }}>
                <Button containerStyle={[styles.modalAddButton]}
                  onPress={this._addProduct.bind(this)}
                  style={styles.modalAddButtonText}>
                  {strings('EditCheckCall.Add_Product')}
                  </Button>
                <Button containerStyle={[styles.modalCancelButton]}
                  onPress={this._setCancel.bind(this, false)}
                  style={styles.modalCancelButtonText}>
                  {strings('EditCheckCall.Cancel')}
                  </Button>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showDateTimePicker}>
            <Text style={styles.buttonText} >{this.state.itemDate} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 10 }]} />
          </Button>
          <DateTimePicker
            mode={'datetime'}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <ModalPicker style={[styles.button]}
            selectTextStyle={styles.buttonText}
            children={this.buttonText()}
            data={this.state.typelist}
            initValue={this.state.type.label}
            optionTextStyle={styles.rowText}
            onChange={(option) => { this.setTypeItem(option) }} />



          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder={strings('AddCheckCall.Wait_Time')}
            placeholderTextColor='#0071BC'
            value={this.state.waitTime}
            onChange={(event) => this.setState({ waitTime: event.nativeEvent.text })}
          />
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder={strings('AddCheckCall.Street')}
            placeholderTextColor='#0071BC'
            value={this.state.street}
            onChange={(event) => this.setState({ street: event.nativeEvent.text })}
          />
          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder={strings('AddCheckCall.City')}
            placeholderTextColor='#0071BC'
            value={this.state.city}
            onChange={(event) => this.setState({ city: event.nativeEvent.text })}
          />



          <ModalPicker style={[styles.button]}
            selectTextStyle={styles.buttonText}
            children={this.buttonTextState()}
            data={this.state.statelist}
            initValue={this.state.state.label}
            optionTextStyle={styles.rowText}
            onChange={(option) => { this.setStateItem(option) }} />

          <TextInput underlineColorAndroid='transparent'
            style={styles.input}
            placeholder={strings('AddCheckCall.Zip')}
            placeholderTextColor='#0071BC'
            value={this.state.zip}
            onChange={(event) => this.setState({ zip: event.nativeEvent.text })}
          />
          <Button containerStyle={[styles.buttongreen, { marginTop: 15, alignSelf: 'flex-end', backgroundColor: '#2978bd', borderColor: '#2978bd' }]} style={[styles.buttongreenText, { fontSize: 18 }]} underlayColor='#5cb85c'
            onPress={this._setModalVisible.bind(this, true)}>
            {strings('AddCheckCall.btn_Add_Product')}
          </Button>



        </View>
        <View style={{ flex: 1, flexDirection: 'row', padding: 5, alignSelf: 'flex-start' }}>
          <Text style={[styles.text, { fontWeight: '400',color:'#808080' }]}>{strings('AddCheckCall.Product')}</Text>
          <Text style={[styles.text, { fontWeight: '400',color:'#808080' }]}>{strings('AddCheckCall.Pieces')}</Text>
          <Text style={[styles.text, { fontWeight: '400',color:'#808080' }]}>{strings('AddCheckCall.Weight')}</Text>
          <Text></Text>
        </View>
        <View>

          <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => { return this._renderRow(rowData) }}
            automaticallyAdjustContentInsets={false}
            renderSeparator={Common.renderSeperator}
            scrollEnabled={false}
            enableEmptySections={true}
          />

        </View>
        
        <Button containerStyle={[styles.buttongreen, { marginBottom: 30 }]} style={[styles.buttongreenText, { paddingLeft: 30, paddingRight: 30, paddingTop: 12, paddingBottom: 12, }]} underlayColor='#5cb85c'
          onPress={() => {
            this.saveCheckCall();
          }}
        >
          {strings('AddCheckCall.Save_CheckCall')}
        </Button>
        <Spinner visible={this.state.visible} />
      </ViewContainer>
    );
  }
  else{

return(
  <ViewContainer>

<View style={{flex:1, flexDirection:'row', alignItems:'flex-start', padding:10}}>
            <Text style={styles.error}>Please Select Load to Add New Check Call   </Text>
           

          </View>


</ViewContainer>

); 

  }
  }
  buttonText() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText}>{this.state.type.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }

  buttonTextState() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText}>{this.state.state.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }

  buttonTextProduct() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.buttonText}>{this.state.saveproduct.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, { paddingRight: 5 }]} />
      </View>
    );
  }

componentWillUnmount ()
{
  //alert('unmount');
  //Actions.popTo('checkcalllist')
}
  componentDidMount() {
    if(this.props.trip !=null && this.props.trip.key !=null && this.props.trip.key !=0  )
    {
    this.LoadInitialData();
  }
  else{
    ToastAndroid.show('Please Select Load to Add New Check Call.', ToastAndroid.SHORT);
  }
  }
  LoadInitialData() {
    var API_URL = Common.baseURL + 'v1/GetStateCheckCallTypes';
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
          me.setState({
            visible: false,
          });
          var dataBlob = [
          ];
          data.CheckCallTypeDTOs.forEach(function (type) {
            var d = { key: type.CheckCallTypeId, label: type.Title };
            dataBlob.push(d);
          });
          me.setState({
            typelist: dataBlob
          });
          dataBlob = [];
          data.StateDTOs.forEach(function (state) {
            var d = { key: state.StateId, label: state.StateCode };
            dataBlob.push(d);

          });
          me.setState({
            statelist: dataBlob
          });
          dataBlob = [];
          data.ProductDTOs.forEach(function (product) {
            var d = { key: product.ProductId, label: product.Title };
            dataBlob.push(d);
          });
          me.setState({
            productslist: dataBlob
          });
          if (this.props.checkcallid != undefined) {
            this.getCheckCallById(this.props.checkcallid);
          }
        })
      })
      .catch((error) => {
        this.setState({
          visible: false
        });
      });

  }
  getCheckCallById(id) {
    var API_URL = Common.baseURL + 'v1/GetCheckCallById?Id=' + id;
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
          me.setState({
            visible: false,
          });
          var dataBlob = [
          ];
          console.log(data);
          me.setState({
            itemDate: data.CheckCallDate == null ? data.Date : data.CheckCallDate,
            type: { Key: data.CheckCallTypeId, label: data.CheckCallType },
            waitTime: data.WaitTime + '',
            street: data.street,
            city: data.City,
            state: { Key: data.StateId, label: data.StateCode },
            zip: data.Zip,

          });
        })
      })
      .catch((error) => {
        this.setState({
          visible: false
        });
      });
  }
  _renderRow(rowData) {

    return (
      <View style={[styles.row]}>
        <Text style={[styles.text]}>
          {rowData.product.title}
        </Text>
        <Text style={[styles.text]}>
          {rowData.pcs}
        </Text>
        <Text style={[styles.text]}>
          {rowData.weight}
        </Text>
        <Button onPress={() => this._handleClick(rowData.product.id)}>
          <Icon name={'delete'} size={22} marginRight={5} color="#2a3542" />
        </Button>
      </View>

    );
  }
  _handleClick(id) {
    Alert.alert(strings('Home.Confirmation'),strings('Home.Del_Product_Msg'),
      [
        {
          text: 'YES', onPress: () => {
            var array = this.state.checkCallProducts;
            for (var i = 0; i < this.state.checkCallProducts.length; i++) {
              if (this.state.checkCallProducts[i].product.id === id) {
                this.state.checkCallProducts.splice(i, 1);
                break;
              }
            }
            var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({
              dataSource: ds.cloneWithRows(this.state.checkCallProducts),
            });
          }
        },
        {
          text: 'NO', onPress: () => {

          }
        },
      ]);
  }
  saveCheckCall() {
    // var obj = {TripId: this.props.trip.id, CheckCallTypeId: this.state.type.id
    //   , CheckCallDate: this.state.itemDate, WaitTime: this.state.waitTime
    //   ,  Street: this.state.street
    //   , City: this.state.city, StateId: this.state.state.id, Zip: this.state.zip
    //   , CheckCallProductDTOs: this.state.checkCallProducts}


    
    var API_URL = Common.baseURL + 'v1/AddNewCheckCall';
    console.log(JSON.stringify({
      TripId: this.props.trip.key, CheckCallTypeId: this.state.type.Key
      , CheckCallDate: this.state.itemDate, WaitTime: this.state.waitTime
      , Street: this.state.street
      , City: this.state.city, StateId: this.state.state.Key, Zip: this.state.zip
      , CheckCallProductDTOs: this.state.checkCallProducts
    }));
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
        TripId: this.props.trip.key, CheckCallTypeId: this.state.type.key
        , CheckCallDate: this.state.itemDate, WaitTime: this.state.waitTime
        , Street: this.state.street
        , City: this.state.city, StateId: this.state.state.key, Zip: this.state.zip
        , CheckCallProductDTOs: this.state.checkCallProducts,
        LangCode:I18n.locale
      })
    })
      .then((responseData) => {
        responseData.json().then(data => {
          console.log(data);
          me.setState({
            visible: false,
          });

          if (data.Success) {
            //Common.Alert('Success', data.message);
            Actions.pop();
          }
          else {
            setTimeout(() => {
            Alert.alert(data.Title,strings('Home.New_Check_Call_Save_Msg'),
          [{text: 'OK'}], { cancelable: false });

          }, 200);
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
  poplist: {
    backgroundColor: '#c1c1c1',
    paddingTop: 100,
  },
  icon: {
    fontSize: 22,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  buttonText:{
color: '#0071BC',
//fontFamily:'Museo Sans',

  },
  modalinput: {
    height: 40,
    padding: 7,
     
    // flex: 1,
    
    fontSize: 18,
    marginRight:10,
    marginLeft:10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    //fontFamily: "Museo Sans",
   // backgroundColor:'white',
    
    borderRadius: 4,
    color:'#2978bd',
    marginBottom: 15
  },
  input: {
    height: 40,
    padding: 7,
    flex: 4,
    fontSize: 18,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderRadius: 4,
    color: '#0071BC',
    marginBottom: 15,
    //fontFamily: "Museo Sans",
  },
  buttongreenText: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'white',
    fontWeight: '200',
    //fontFamily: "Museo Sans",
  },
  buttongreen: {
    backgroundColor: '#0071BC',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
    alignSelf: 'center',
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
  modalCancelButton: {
    flexDirection: 'row',
    borderColor: '#fbfbfb',
    borderWidth: 1,
    height:45,
    borderRadius: 4,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  modalCancelButtonText: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: 'white',
    fontWeight: '200'
  },
  modalAddButtonText: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#333333',
    fontWeight: '200'
  },
  modalAddButton: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    height:45,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5,

  },
  text: {
    flex: 1,
   // fontSize: 13,
  //  color: '#0071BC',
 //   padding: 5,
    fontSize: 16,
    color: '#808080',
    padding:5,
    //fontFamily:'Museo Sans'
  },
  rowText: {
   // color: '#000',
    fontSize: 14,
    padding: 4,
    color:'#0071BC'
  },
  head: {
    fontWeight: '400', fontSize: 16, color: '#808080',
    //fontFamily:'Museo Sans'
  },
  error: {
    fontWeight: 'bold', fontSize: 13, color: 'red',
    //fontFamily:'Museo Sans',
    textAlign:'center', marginTop:50,marginLeft:50
  },
  headvalue: {
    fontSize: 13, color: '#0071BC',
    //fontFamily:'Museo Sans'
  }
});


module.exports = CheckCall;
