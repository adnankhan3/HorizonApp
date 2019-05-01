'use strict'
import React, { Component }  from 'react';
import { Text, View, StyleSheet, BackHandler, NetInfo, ToastAndroid,AppState} from 'react-native';
import { Actions, Reducer, Scene, Router, ActionConst, Modal, Switch } from 'react-native-router-flux';
//import {requestPermission} from 'react-native-android-permissions';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MessageBarManager, MessageBar}  from 'react-native-message-bar';

import ViewContainer from './ViewContainer'
 import NavigationDrawer from '../components/NavigationDrawer'
 import TabIcon from '../components/TabIcon'

 import Home from '../screens/Home'
 import CheckCallsList from '../screens/CheckCallsList'
 import Messages from '../screens/Messages'
 import HoursOfService from '../screens/HoursOfService'
 import TripDetails from '../screens/TripDetails'
 import CheckCallDetails from '../screens/CheckCallDetails'
import CheckCall from '../screens/CheckCall'
import CheckCallEdit from '../screens/CheckCallEdit'
import AddSignature from '../screens/AddSignature'
import AddDoc from '../screens/AddFile'
import ShowDoc from '../screens/ShowDoc'

import TripsList from '../screens/TripsList'
import AvailabilityList from '../screens/AvailabilityList'
import Availability from '../screens/Availability'
import Schedule from '../screens/Schedule'
import PayrollEntry from '../screens/PayrollEntry'
import mapscreen from '../screens/LocationMap'
import DeviceInfo from 'react-native-device-info';
 import Login from '../screens/Login';
import Common from './Common';
import BackgroundTimer from 'react-native-background-timer';

import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';

import {setJSExceptionHandler} from 'react-native-exception-handler';
var styles = StyleSheet.create({
  tabs:{
    backgroundColor:'#0071BC',
    borderWidth: 1,
    borderColor: '#0071BC',
    height:80
  },
  navbar:{
    backgroundColor: '#0071BC',
    borderBottomWidth: 1,
    borderBottomColor: '#0071BC',
    height:80,
    paddingTop:3, 
    
    
  },

navbarselected:{
    backgroundColor: '#0071BC',
    borderBottomWidth: 1,
    borderBottomColor: '#0071BC',
    height:80,
    paddingTop:3, 
    
    
    
    
  },

  navbarTitle:{
    color: '#fff',
    textAlign:'center',
 //   fontFamily:'Museo Sans',
    width:'100%',
    fontSize:25,
    fontWeight: "normal"
  },

});

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        //console.log("ACTION:", action);
//alert(state);
//alert(state.routes[state.routes.length - 1].routeName);

        return defaultReducer(state, action);
    }
};



  

//Actions.checkcall({tripId: 123456})
// const scenes = Actions.create(
//
// );
// <Scene key="tripslist"  title="Trips" component={TripsList} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} drawerImage={require('../resources/drawer.png')} />
//const MessageBarManager = MBarManager.MessageBarManager;

export default class Launch extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      initial: this.props.initialData,
      loggedin:this.props.loginstate,
      appState: AppState.currentState

   //   error = null,
    };
    //this.handleChange = this.handleChange.bind(this);
  watchID: null;

  

//alert(I18n.locale);

if(Common.UserLang !=null)
{

if (I18n.locale != Common.UserLang.key)
{

I18n.locale = Common.UserLang.key;

}

}
 //   alert(Common.UserLang.key);


  var   _mounted = false;


    console.log(this.props);
  }
  render() {
    
    return this.renderComponent();
  }
 


  
  logout(){
    //  Common.AccessToken = '';
    //  InvokeLogout();
    Common.logInState = false;
if(Common.AccessToken !=null &&  Common.AccessToken !='')
{

    this.InvokeLogout();
}
      this.setState({
        loggedin:false
      });
     Common.AccessToken = '';
  }

 InvokeLogout()
{


var API_URL = Common.baseURL + 'v1/LogOff';



fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': Common.AccessToken
      }
     
    })

    .then((responseData) => {

      responseData.json().then(data => {

      
        console.log(data)
        if(data.Success){
          console.log(data);

     // Common.AccessToken = '';
        
     //    return(<Launch loginstate={false} initialData={Common.initialScreen}/>);

         
        }
        else {
 //  Common.AccessToken = '';
        
     //    return(<Launch loginstate={false} initialData={Common.initialScreen}/>);


        }
      })

    })
    .catch((error) => {
      console.log('error');
      console.log(error);
      console.log('error');
     // alert(error);
    
    });



}


  renderComponent(){
    if (this.state.loggedin == false  ) {
      
      return(<Login/>);
    }

    else {
      return(
        
        <View style={{flex:1}}>

          
        <Router createReducer={reducerCreate}    titleStyle={{ color: 'red',fontWeight:'normal' }}  headerTitleStyle={{ color: 'red' ,fontWeight:'normal' }}   showAlert={this.showAlert} >
          <Scene key="root">

            <Scene key="tabbar"  component={NavigationDrawer} logout={() => { this.logout()}} >
              <Scene key="main"           
   type={ActionConst.RESET}  tabs={true}  style={styles.tabs} >

                <Scene key="tab1"  title={strings('Launch.Home')} type="reset"    initial={Common.getInitial('home')}   onPress={()=> {
                  
                        Actions.checkcalledithome({type: ActionConst.REFRESH});
                        
                        Actions.addsignaturehome({type: ActionConst.REFRESH});
                        Actions.adddochome({type: ActionConst.REFRESH});
                        Actions.showdochome({type: ActionConst.REFRESH});
                        
                      //  Actions.home({type: ActionConst.REFRESH});
                        Actions.home({type: ActionConst.RESET});
                        Actions.home({type: ActionConst.REFRESH});
                        
                         // Actions.pop()

                      //  Actions.pop({type: ActionConst.RESET});
                   //     Actions.pop();
                  //     Actions.tabbar({type: ActionConst.RESET});


                      }}  drawerImage={require('../resources/drawer.png')}  icon={TabIcon.bind(this, 'home' )}>
                  <Scene key="home" component={Home}  type="reset"  title={strings('Launch.Home')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                   <Scene key="checkcalledithome"   component={CheckCallEdit}  title= {strings('Launch.EditCheckCall')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} /> 
                    <Scene key="addsignaturehome"    component={AddSignature}  title={strings('Launch.Add_Signature')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />      
                     <Scene key="adddochome"    component={AddDoc}  title={strings('Launch.View_Doc_Title')} 
                     onRight={()=> console.log('right')} rightTitle={<Text style={{color:'#ffffff',padding:7, fontSize:14}}><Icon name='add' size={30} weight="bold"   /></Text>}
                      backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />      
                     <Scene key="showdochome"    component={ShowDoc}  title={strings('Launch.View_Doc_Title')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />      
                

                  <Scene key="tripdetails" component={TripDetails}  title={strings('Launch.Trip_Detail')}  backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                  <Scene key="checkcalldetailshome" component={CheckCallDetails}  title={strings('Launch.Check_Call_Details')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                </Scene>
                {this._renderCheckCall()}
                <Scene key="tab3" type="reset"  title={strings('Launch.Messages')} badge="true" badgecount={Common.NewMessages} onPress={()=> {
                        


                        Actions.tab3_1({type: ActionConst.REFRESH});
                           

                       // Actions.pop({type: ActionConst.RESET});
                    //    Actions.pop()
                      //  Actions.pop();
                          //  Actions.main({type:ActionConst.RESET});

                    // Actions.tabbar({type: ActionConst.RESET});
                        
                      }} icon={TabIcon.bind(this, 'sms' )} drawerImage={require('../resources/drawer.png')}>
                  <Scene key="tab3_1" component={Messages}  title={strings('Launch.Messages')}   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                </Scene>
                <Scene key="tab4" onPress={()=> {
                        Actions.hos({type: ActionConst.REFRESH});
                        
                      }} title='HOS'  icon={TabIcon.bind(this, 'hourglass-empty' )} drawerImage={require('../resources/drawer.png')}>
                  <Scene key="hos" component={HoursOfService}  allowFontScaling={false}  title={strings('Launch.HOS')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                </Scene>




                <Scene key="trips" >
                <Scene key="tripslist"  component={TripsList}  title= {strings('Launch.Trips')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} drawerImage={require('../resources/drawer.png')} />

                <Scene key="checkcalllist_triplist"  component={CheckCallsList}  title={strings('Launch.CheckCalls')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} 
                onRight={()=> console.log('right')} rightTitle={<Text style={{color:'#ffffff',padding:7, fontSize:14}}><Icon name='add' size={30} weight="bold"   /></Text>}/>
                <Scene key="triplistdetails" component={TripDetails}  title="Trip Details" backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                </Scene>
                <Scene key="availabilities" >
                  <Scene key="availabilitylist" initial={true} component={AvailabilityList}  title="Availabilities" navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle}
                    drawerImage={require('../resources/drawer.png')} onRight={()=>Actions.availability()}
                    rightTitle={<Text style={{color:'#ffffff',padding:7, fontSize:14}}><Icon name='add' size={30} weight="bold"   /></Text>} />
                  <Scene key="availability" component={Availability}  title="Availability" backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
                </Scene>
                <Scene key="schedule" component={Schedule}  title={strings('Launch.Schedule')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} drawerImage={require('../resources/drawer.png')}>

                </Scene>
                <Scene key="payrollentry" initial={Common.getInitial('payroll')} component={PayrollEntry}  title="Payroll Entry"  
                  navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} drawerImage={require('../resources/drawer.png')} 
                  rightTitle={<Text style={{color:'#ffffff',padding:7, fontSize:14}}><Icon name='refresh' size={30} weight="bold"   /></Text>} onRight={()=> console.log('right')}>

                </Scene>

                <Scene key="mapscreen" component={mapscreen}  title="Map" navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} drawerImage={require('../resources/drawer.png')}>

                </Scene>

              </Scene>

            </Scene>

          </Scene>
        </Router>
          
        <MessageBar ref="alert" />
        </View>
      );
    }
  }
  componentDidMount(){
    
    MessageBarManager.registerMessageBar(this.refs.alert);
    console.log('MessageBarManager mount');
    NetInfo.addEventListener(
      'change',
      this._handleConnectionInfoChange
    );
this._mounted = true;
   AppState.addEventListener('change', this._handleAppStateChange);

   
   

//setInterval(() => {

//if(Common.AccessToken =='')
//{
// this.logout();
//}
 //}, 1000);


  }
  

  componentWillMount() {
    
    
this._mounted = true;
    AppState.addEventListener('change', this._handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', () => {
      try {

     // alert(  Actions.currentScene);
           Actions.pop();
         // this.goBack();
            return true;
        }
        catch (err) {
        //   ToastAndroid.show("Cannot pop. Exiting the app...", ToastAndroid.SHORT);
            return true;
        }
    });

setTimeout(() => {

if(Common.AccessToken =='')
{
 this.logout();
}
 }, 1000);



  }
  componentWillUnmount() {
    MessageBarManager.unregisterMessageBar();
    console.log('MessageBarManager un-mount');
    this._mounted = false;
   NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
   
// AppState.removeEventListener('change', this._handleAppStateChange);
    
  }

_handleAppStateChange = (nextAppState) => {

 // alert(this.state.appState);
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active' ) {
      console.log('App has come to the foreground!')
    }


  if(nextAppState.match(/inactive|background/))
  {
    
  }
  

  
  
  }


 

   _handleConnectionInfoChange(connectionInfo){
      console.log('MessageBarManager');
    if(connectionInfo == 'NONE'){
      MessageBarManager.showAlert({
        title: 'Connection Problem',
        message: 'Your internet connection is not working. Please try again when connection available.',
        alertType: 'warning',
        shouldHideAfterDelay:false,
        shouldHideOnTap:false
        // See Properties section for full customization
        // Or check `index.ios.js` or `index.android.js` for a complete example
      });
      ToastAndroid.show('Internet connection dropped.', ToastAndroid.SHORT);
    }
    else{
      MessageBarManager.hideAlert();
      ToastAndroid.show('Internet connection backedup.', ToastAndroid.SHORT);
    }
    
  }
  showAlert(alert) {
    MessageBarManager.showAlert(alert);
  }

   _renderCheckCall(){
     console.log(Common.securitySettings)
    if ( Common.AccessToken !=null &&  Common.securitySettings != null  && Common.securitySettings.find(x => x.Code === 'S105') != null && Common.securitySettings.find(x => x.Code === 'S105').Value == 1) {
      return(
        <Scene key="tab2" type="reset"
         onPress={()=> {

Actions.popTo('checkcalllist');

setTimeout(() => {
Actions.refresh({key:'checkcalllist'});

}, 10);

                        }}
          //Actions.checkcalllist({type: ActionConst.REFRESH}); }}
                 title={strings('Launch.CheckCalls')}   icon={TabIcon.bind(this, 'perm-phone-msg' )} drawerImage={require('../resources/drawer.png')}>
          <Scene key="checkcalllist"    component={CheckCallsList}  title={strings('Launch.CheckCalls')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle}
           onRight={()=> console.log('right')} rightTitle={<Text style={{color:'#ffffff',padding:7, fontSize:14}}><Icon name='add' size={30} weight="bold"   /></Text>}/>
          <Scene key="checkcalledit"     component={CheckCallEdit}  title={strings('Launch.EditCheckCall')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
          <Scene key="checkcalldetails"  component={CheckCallDetails}  title={strings('Launch.Check_Call_Details')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
          <Scene key="checkcall"   component={CheckCall}  title={strings('Launch.CheckCall')} backButtonImage={require('../resources/back_chevron.png')} navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} />
        </Scene>
      );
    }
    else {
        return null;
    }
  }
}
