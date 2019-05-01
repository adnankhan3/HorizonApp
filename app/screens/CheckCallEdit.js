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
import _ from 'lodash';
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'
import ModalPicker from 'react-native-modal-picker';
import Launch from '../components/Launch'

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
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      checkCallProducts: [],
      pcs: '',
      weight: '',
      saveproduct: {Key:0, label:strings('AddCheckCall.Select_Product')},
      product: {id:0, title:strings('AddCheckCall.Select_Product')},
      productlist: [],
      state: {Key: 0, label: strings('AddCheckCall.Select_State') },
      statelist: [],
      type: {Key:0, label:strings('AddCheckCall.Select_Type') },
      typelist: [],
      isShowProducts: false,
      isShowStates: false,
      isShowTypes: false,
      isDateTimePickerVisible: false,
      itemDate: strings('AddCheckCall.Select_Date'),
      visible: false,
      modalVisible: false,
      productModalVisible:false,
      waitTime:'',
      street: '',
      city:'',
      zip:'',
      checkCallId: '0',
      productname:'' 
    };
    _.bindAll(this, ['showProductPopover', 'setProductItem', 'showTypePopover', 'setTypeItem', 'showStatePopover', 'closePopover', 'setStateItem']);

  }
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    //this.setState({itemDate : date.toLocaleString().substring(0,date.toLocaleString().indexOf(', '))});
    
  //  this.setState({itemDate : date.toLocaleString()});
  this.setState({itemDate : date.toISOString().slice(0, 19)});
    this._hideDateTimePicker()
    
    //this.setState({ itemDate: date });
  }
  showProductPopover() {
    this.setState({isShowProducts: true});
  }
  showStatePopover() {
    this.setState({isShowStates: true});
  }
  showTypePopover() {
    this.setState({isShowTypes: true});
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
    this.setState({isShowStates: false, isShowTypes: false, isShowProducts: false});
  }
  _addProduct(){


var prod = {id:this.state.saveproduct.Key, title:this.state.saveproduct.label}

    var p = {product: prod, pcs: this.state.pcs, weight: this.state.weight}
    this.state.checkCallProducts.push(p);
    this.setState({modalVisible: false});
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(this.state.checkCallProducts),
      saveproduct: {Key:0, label:strings('AddCheckCall.Select_Product')},
      weight :'',
      pcs: '',
    });

    //console.log(this.state.checkCallProducts);
  }

_addNewProduct(){
var API_URL = Common.baseURL + 'v1/SaveNewProduct';

    var me = this;
    this.setState({
      visible: true,
    }); 

if(this.state.productname !=null &&  this.state.productnamecity != '')
{

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },
      
     body: JSON.stringify({
        Name: this.state.productname
          
          ,Value:''
          ,Code:''
          
      })
    })
    .then((responseData) => {
      responseData.json().then(data => {
        me.setState({
          visible: false,
        });

        if(data.Success){
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
          //Actions.pop();

     var       dataBlob = this.state.productslist;
            
              var d = {Key: data.id, label: data.type};
              dataBlob.push(d);
              
            me.setState({
              productslist: dataBlob
            });
            this.setProductItem(d);
          
          this.setState({productModalVisible: false,productname: ''});
          //Common.Alert('Success', data.message);
        }
        else {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
          //Common.Alert(data.title, data.message);
          this.setState({ productname: '' });
        }
      })

    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });

  }

else{
  Alert.alert('Horizon Go','Please enter Product.',
          [{text: 'OK'}], { cancelable: false });
}



}


  
_setProductModalVisible = (visible) => {
    this.setState({productModalVisible: visible});

  };

  _setModalVisible = (visible) => {
    this.setState({modalVisible: visible});

  };
  _setCancel = (visible) => {
    this.setState({modalVisible: visible,
      saveproduct: {Key:0, label:strings('AddCheckCall.Select_Product')},
      weight :'',
      pcs: '',
    });

  };


_setProductCancel = (visible) => {
    this.setState({productModalVisible: visible,
      
    });

  }

  render() {
    console.log('render');

    if (Common.AccessToken != '')
{
    return(
      <ViewContainer style={{padding:7}}>




 <Modal
            animationType={'slide'}
            transparent={true}
            visible={this.state.productModalVisible}
            onRequestClose={() => this._setProductModalVisible(false)}
            supportedOrientations={supportedOrientationsPickerValues[this.state.selectedSupportedOrientation]}
            onOrientationChange={evt => this.setState({currentOrientation: evt.nativeEvent.orientation})}
            >
            <View style={[styles.modalBackgroundStyle]}>
             <View style={[styles.innerContainerTransparentStyle]}> 
                <View style={{padding:20}}>
                  


                 




                  <TextInput underlineColorAndroid='transparent'
                    style={[styles.modalinput, {color: '#d2d2d2'}]}
                    placeholder= {strings('AddCheckCall.Product')}
                    placeholderTextColor= '#d2d2d2'
                    value={this.state.productname}
                    onChange={(event) => this.setState( {productname: event.nativeEvent.text})}
                    
                  />

                  


                   

                </View>
                <View style={{flexDirection:'row', padding:10, alignSelf:'center'}}>
                  <Button containerStyle={[styles.modalAddButton]}
                    onPress={this._addNewProduct.bind(this)}
                    style={styles.modalAddButtonText}>
                    {strings('EditCheckCall.Save')}
                  </Button>
                  <Button containerStyle={[styles.modalCancelButton]}
                    onPress={this._setProductCancel.bind(this, false)}
                    style={styles.modalCancelButtonText}>
                    {strings('EditCheckCall.Cancel')}
                  </Button>
                </View>
              </View>
            </View>
          </Modal>






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
                  


                  <ModalPicker style={[styles.button]}
                  selectTextStyle={styles.buttonText}
                    children={this.buttonText()}
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
                    onChange={(event) => this.setState( {pcs: event.nativeEvent.text})}
                  />

                  <TextInput underlineColorAndroid='transparent'
                    style={[styles.modalinput, {color: '#d2d2d2', marginBottom:1}]}
                    placeholder={strings('EditCheckCall.Weight')}
                    keyboardType ={'numeric'}
                    
                    placeholderTextColor= '#d2d2d2'
                    value={this.state.weight}
                    onChange={(event) => this.setState( {weight: event.nativeEvent.text})}
                  />


                   

                </View>
                <View style={{flexDirection:'row', padding:10, alignSelf:'center'}}>
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
          <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showDateTimePicker}>
            <Text style={styles.buttonText}  >{this.state.itemDate} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
          </Button>
          <DateTimePicker
            mode={'datetime'}
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', padding:10}}>
            <Text style={[styles.head,{width:'30%'}]}>{strings('EditCheckCall.Type')}  </Text>
            <Text style={[styles.headvalue,{width:'70%'}]}>
              {this.state.type.title}
            </Text>
          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', padding:10}}>




            <Text style={[styles.head,{width:'30%'}]}>{strings('EditCheckCall.Wait_Time')}  </Text>

                   <TextInput underlineColorAndroid='transparent'
                    style={[styles.input,{width:'70%'}]}
                    placeholder= {strings('EditCheckCall.Wait_Time')}
                    keyboardType ={'numeric'}
                        placeholderStyle={styles.input}

                    placeholderTextColor= '#0071BC'
                    multiline={true}
                    value={this.state.waitTime + ''}
                    onChange={(event) => this.setState( {waitTime: event.nativeEvent.text})}
                  />



          </View>
          <View style={{flex:1, flexDirection:'row', alignItems:'flex-start', padding:10}}>
            <Text style={[styles.head,{width:'30%'}]}>{strings('EditCheckCall.Address')}  </Text>
            <Text style={[styles.headvalue,{width:'70%'}]}>
              {this.state.street}, {' '}, {this.state.city}, {this.state.state.title}, {this.state.zip}
            </Text>

          </View>
        <View >


              {/*<Button containerStyle={[styles.buttongreen, {marginTop: 0, alignSelf: 'flex-end', backgroundColor: '#0071BC', borderColor: '#0071BC'}]} style={[styles.buttongreenText, {fontSize:12}]} underlayColor='#5cb85c'
              onPress={this._setProductModalVisible.bind(this, true)}>
              Add New Product
          </Button>*/}

          <Button containerStyle={[styles.buttongreen, {marginTop: 15, alignSelf: 'flex-end', backgroundColor: '#0071BC', borderColor: '#0071BC'}]} style={[styles.buttongreenText, {fontSize:18}]} underlayColor='#5cb85c'
              onPress={this._setModalVisible.bind(this, true)}>
              {strings('EditCheckCall.btn_Add_Product')}
          </Button>



        </View>
        <View style={{flex:1, flexDirection:'row', padding:5, alignSelf:'flex-start'}}>
          <Text style={[styles.text, {fontWeight:'400'}]}>{strings('EditCheckCall.Product')}</Text>
          <Text style={[styles.text, {fontWeight:'400'}]}>{strings('EditCheckCall.Pieces')}</Text>
          <Text style={[styles.text, {fontWeight:'400'}]}>{strings('EditCheckCall.Weight')}</Text>
          <Text></Text>
        </View>
        <View>

          <ListView style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(rowData) => {return this._renderRow(rowData)}}
              automaticallyAdjustContentInsets={false}
              renderSeparator={Common.renderSeperator}
              scrollEnabled={false}
              enableEmptySections={true}
            />

        </View>
        <Button  containerStyle={[styles.buttongreen, {marginBottom: 30}]} style={[styles.buttongreenText, {paddingLeft:30, paddingRight:30, paddingTop:12, paddingBottom:12,}]} underlayColor='#5cb85c'
            onPress={() => {
                this.saveCheckCall();
            }}
        >
            {strings('EditCheckCall.Save_CheckCall')}
        </Button>
        <Spinner visible={this.state.visible} />
      </ViewContainer>
    );

}

else{
  return(<Launch loginstate={false}  />);
}
  }
  componentDidMount(){
    console.log('mont');
    this.LoadInitialData();
  }


 buttonText(){
    return(
      <View style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.buttonText}>{this.state.saveproduct.label} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:5}]}   />
      </View>
    );
  }



   ReloadProducts(){
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
        data.CheckCallTypeDTOs.forEach(function(type){
            var d = {Key: type.CheckCallTypeId, label: type.Title};
            dataBlob.push(d);
          });
          me.setState({
            typelist: dataBlob
          });
          dataBlob = [];
          data.StateDTOs.forEach(function(state){
            var d = {Key: state.StateId, label: state.StateCode};
            dataBlob.push(d);

            });
            me.setState({
              statelist: dataBlob
            });
            dataBlob = [];
            data.ProductDTOs.forEach(function(product){
              var d = {Key: product.ProductId, label: product.Title};
              dataBlob.push(d);
              });
            me.setState({
              productslist: dataBlob
            });
          if (this.props.checkcallid != undefined ) {
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

  LoadInitialData(){
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
        data.CheckCallTypeDTOs.forEach(function(type){
            var d = {Key: type.CheckCallTypeId, label: type.Title};
            dataBlob.push(d);
          });
          me.setState({
            typelist: dataBlob
          });
          dataBlob = [];
          data.StateDTOs.forEach(function(state){
            var d = {Key: state.StateId, label: state.StateCode};
            dataBlob.push(d);

            });
            me.setState({
              statelist: dataBlob
            });
            dataBlob = [];
            data.ProductDTOs.forEach(function(product){
              var d = {Key: product.ProductId, label: product.Title};
              dataBlob.push(d);
              });
            me.setState({
              productslist: dataBlob
            });
          if (this.props.checkcallid != undefined ) {
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
  getCheckCallById(id){
    var API_URL = Common.baseURL + 'v1/GetCheckCallById?Id=' + id;
    
    var ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log(API_URL);
    var me = this;
    this.setState({
      visible: true,
      checkCallId: id,
      dataSource: ds1.cloneWithRows([]),
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

        if(data.DriverId > 0)
        {
        me.setState({
          itemDate: data.CheckCallDate == null ? data.Date : data.CheckCallDate,
          type: {id: data.CheckCallTypeId, title: data.CheckCallType},
          waitTime: data.WaitTime ,
          street:data.street,
          city: data.City,
          state: {id: data.StateId, title: data.StateCode},
          zip: data.Zip,

        });
        
        data.CheckCallProductDTOs.forEach(function(pr){
          var p = {product: {id:pr.ProductId, title:pr.ProductTitle}, pcs: pr.Pcs, weight: pr.Weight}
          me.state.checkCallProducts.push(p);
          var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          me.setState({
            dataSource: ds.cloneWithRows(me.state.checkCallProducts),
          });

        });

      }
      else{
        setTimeout(() => {
  Alert.alert('Horizon Go',data.TripNumber,
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
  _renderRow(rowData){

    return(
      <View style={[styles.row]}>
          <Text style={[styles.rowText]}>
             {rowData.product.title}
          </Text>
          <Text style={[styles.rowText]}>
             {rowData.pcs}
          </Text>
          <Text style={[styles.rowText]}>
             {rowData.weight}
          </Text>
          <Button  onPress={() => this._handleClick(rowData.product.id)}>
            <Icon name={'delete'} size={22} marginRight={5} color="#2a3542"  />
          </Button>
      </View>

    );
  }
  _handleClick(id){
    Alert.alert(strings('Home.Confirmation'),strings('Home.Del_Product_Msg'),
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
  saveCheckCall(){
    // var obj = {TripId: this.props.trip.id, CheckCallTypeId: this.state.type.id
    //   , CheckCallDate: this.state.itemDate, WaitTime: this.state.waitTime
    //   ,  Street: this.state.street
    //   , City: this.state.city, StateId: this.state.state.id, Zip: this.state.zip
    //   , CheckCallProductDTOs: this.state.checkCallProducts}
    
    var API_URL = Common.baseURL + 'v1/UpdateCheckCall';

    var me = this;
    this.setState({
      visible: true,
    }); 

if(this.state.city !=null &&  this.state.city != '')
{

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },
      // {"CheckCallId":30938,"CheckCallDate":"11/1/2016, 11:58:28 PM"
      // ,"CheckCallProductDTOs":[{"product":{"id":1,"title":"Paper Rolls "}
      // ,"pcs":"2","weight":"3"},{"product":{"id":2,"title":"Aluminum"}
      // ,"pcs":"3","weight":"4"}]}
      body: JSON.stringify({
        checkCallId: this.state.checkCallId
          , CheckCallDate: this.state.itemDate
          , CheckCallProductDTOs: this.state.checkCallProducts
          ,SealNo:''
          ,BOL:''
          ,PODName:''
          ,WaitTime:this.state.waitTime
          ,Address:this.state.city +', ' + this.state.state.title +', ' + this.state.zip
          ,Type:this.state.type.title,
          LangCode:I18n.locale
      })
    })
    .then((responseData) => {
      responseData.json().then(data => {
        me.setState({
          visible: false,
        });

        if(data.Success){

          setTimeout(() => {
          Alert.alert(data.Title,strings('Home.New_Check_Call_Save_Msg'),
          [{text: 'OK'}], { cancelable: false });
          }, 200);
          //Actions.pop();
          //Common.Alert('Success', data.message);
        }
        else {

          setTimeout(() => {
          Alert.alert(data.Title,data.message,
          [{text: 'OK'}], { cancelable: false });
          }, 200);
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

else{

  setTimeout(() => {
  Alert.alert('Horizon Go','Check Call is not available to Edit',
          [{text: 'OK'}], { cancelable: false });
          }, 200);
}
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
    //fontFamily: "Calibri",
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
    marginLeft: 0,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    borderRadius: 16,
    color: '#0071BC',
    marginBottom: 15,
    //fontFamily: "Museo Sans",
    
    
  },
  buttongreenText: {
    fontSize: 18,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: 'white',
    fontWeight:'200',
    //fontFamily: "Museo Sans",
  },
  buttongreen: {
    backgroundColor: '#0071BC',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 8,
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
    height:45,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  modalCancelButtonText: {
    fontSize: 18,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: 'white',
    fontWeight:'200',
    //fontFamily:'Museo Sans'
  },
  modalAddButtonText: {
    fontSize: 18,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:8,
    paddingBottom:8,
    color: '#333333',
    fontWeight:'200',
    //fontFamily:'Museo Sans'
  },
  modalAddButton: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderColor: '#d2d2d2',
    borderWidth: 1,
    height:45,
    borderRadius: 4,
    marginBottom: 10,
    marginRight:10,
    marginLeft:1,
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
    fontSize: 16,
    color: '#808080',
    padding:5,
    //fontFamily:'Museo Sans'
  },
   rowText: {
    flex: 1,
    fontSize: 16,
    color: '#0071BC',
    padding:5,
    //fontFamily:'Museo Sans'
  },
   labels: {
fontWeight:'400',
    marginRight:16,
    //fontFamily:'Museo Sans',
    marginTop: 10,
    alignSelf: 'stretch',
    color: '#808080',
fontSize: 16,
  },
  head:{
    fontWeight:'400', fontSize: 16, color: '#808080',
    //fontFamily:'Museo Sans',
  },
  headvalue:{
    fontSize: 16, color: '#0071BC',
    // fontFamily:'Museo Sans'
  }
});


module.exports = CheckCall;
