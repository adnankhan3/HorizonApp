'use strict'
import React, { Component, PropTypes }  from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import PercentageCircle from 'react-native-percentage-circle';
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'
import Launch from '../components/Launch'
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';
class HoursOfService extends Component {
  constructor(props) {
    super(props);
    //  Text.defaultProps.allowFontScaling=false;

    this.state = {
      visible:true,
      Ason:''
    }
  }
  // <View>
  //
  //   <Text style={styles.heading}>
  //     Hours of Service
  //   </Text>
  // </View>

  render() {


    if(Common.AccessToken != '')
    {
      
    return(

      
      <ViewContainer >
        <View style={styles.body}>

          <View style={{padding:5, alignItems:'center', flex:1, flexDirection:'row' }}>
            <View style={{padding:10}}>
            <PercentageCircle bgcolor={"#0071BC"} borderWidth={16} radius={75} percent={this.state.hosdata != null ? this.state.hosdata.DailyDutyPer : 0} color={"#94f368"}>

      <Text style={styles.points}>
                  {this.state.hosdata != null ? this.state.hosdata.strOnDutyHrs : ''}
                </Text>
      </PercentageCircle>  
            <Text style={styles.hostext}>{strings('Home.On_Duty')}</Text>
            </View>

            <View style={{padding:10}}>
            
                  <PercentageCircle bgcolor={"#0071BC"} borderWidth={16} radius={75} percent={this.state.hosdata != null ? this.state.hosdata.DriverPer : 0} color={"#94f368"}>

      <Text style={styles.points}>
                  {this.state.hosdata != null ? this.state.hosdata.strDriverTimeHrsUsed : ''}
                </Text>
      </PercentageCircle>  


            <Text style={styles.hostext}>{strings('Home.Driving')}</Text>
            </View>
          </View>

        </View>

        
         
        {this._RenderDetail()}
          
          
        

        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} />
        </View>
      </ViewContainer >
    );

  }
  else{
    return(<Launch loginstate={false}  />);
  }
  }
  // <View style={{flex:1, flexDirection:'row', padding:12, alignSelf:'center'}}>
  //
  //   <Button containerStyle={[styles.button,
  //       {}]}
  //       style={[styles.buttonText, {paddingTop:8, paddingBottom:8}]} underlayColor='#f67a6e'
  //       onPress={() => {
  //           this.onProceedPressed();
  //
  //       }}
  //   >
  //       HOS HISTORY
  //   </Button>
  //
  // </View>
  componentWillMount(){
    this.LoadData();
  }
  _RenderDetail()
  {

    let omt = false;
      if(this.state.hosdata !=null && this.state.hosdata.OmniTracks !=null && this.state.hosdata.OmniTracks == 'true')
      {
        omt = true;
      }

      if(omt == true)
      {
    return(
     <View style={[styles.body, {alignItems:'flex-start'}]}>
       <View style={{flex:1, flexDirection:'row', marginTop:5}}>
   <Text style={styles.texttitle}>
            Remaining Driving {':'} 
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DriverDay : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Remaining Weekly {':'}  
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.WeekDuty : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Remaining Duty {':'} 
          </Text>
<Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DayDuty : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row' , marginTop:5}}>
          <Text style={styles.texttitle}>
            As On {':'} 
          </Text>
 <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.strDate : ''}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5 }}>
          <Text style={styles.texttitle}>
            Available Driving Hours {':'}  
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DayDuty : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Today on Duty {':'} 
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.TodayOnDuty : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Today Drive {':'} 
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.TodayDrive : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Midnight Pickup {':'} 
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.MidNight : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            Pickup Second Day {':'} 
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.SecondDay : '0.00'}</Text>
          </View>
          </View>
    )
      }
      else{
        return(
         <View style={[styles.body, {alignItems:'flex-start'}]}>
           <View style={{flex:1, flexDirection:'row', marginTop:5}}>
 <Text allowFontScaling={false} style={styles.texttitle}>
            {strings('HOS.Cycle_Duty_Hrs')}
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.CycleDutyHrs : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            {strings('HOS.Daily_Duty_Hrs')}
          </Text>
           <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DailyDutyHrs : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            
            {strings('HOS.Driver_Time_Hrs')}
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DriveTimeHrs : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text allowFontScaling={false} style={styles.texttitle}>
            {strings('HOS.As_On')}
          </Text>
          <Text allowFontScaling={false} style={styles.detail}>{this.state.Ason != null ? this.state.Ason : ''}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            {strings('HOS.Cycle_Duty_Hrs_Used')}
            
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.CycleDutyHrsUsed : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            
            {strings('HOS.Daily_Duty_Hrs_Used')}
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DailyDutyHrsUsed : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            
            {strings('HOS.Driver_Available_Hrs')}
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.DriveHoursAvailable : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            
            {strings('HOS.Cycle_Avaialble_Hrs')}
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.CycleHoursAvailable : '0.00'}</Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
          <Text style={styles.texttitle}>
            {strings('HOS.Pickup_Second_Day')}
            
          </Text>
          <Text style={styles.detail}>{this.state.hosdata != null ? this.state.hosdata.SecondDay : '0.00'}</Text>
          </View>
          </View>
    )
      }
  }
  LoadData() {
    console.log(Common.AccessToken);

    if(Common.AccessToken !='')
    {
    var API_URL = Common.baseURL + 'v1/GetCurrentDriverHOS';

    var me = this;

    this.setState({
      visible: true,
      hosdata: null
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
     //   Common.AccessToken = '';

      }
else
{
      responseData.json().then(data => {
        me.setState({
          visible: false,
          hosdata: data
        });
        //console.log(this.state.hosdata);

        var fdate = me.state.hosdata !=null ?  me.state.hosdata.strDate :''

          if(I18n.locale == 'he' &&  fdate !='' )
{
  fdate =  me.state.hosdata.strDate.substr(3,2) + '-' + me.state.hosdata.strDate.substr(0,2) + '-' + me.state.hosdata.strDate.substr(6,13)


}

me.setState({Ason:fdate});


      })
}

    })
    .catch((error) => {
      this.setState({
        visible: false
      });
    });
  }
}
}
var styles = StyleSheet.create({
  body:{
    backgroundColor:'#ffffff',
    borderColor:'#dddddd',
    borderBottomWidth:1,
    padding:10,
    alignItems:'center'

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
    padding:4,
    flex:1,
    textAlign: 'center',
    borderBottomWidth:1,
    borderColor:'#cccccc',
    //fontFamily: "Museo Sans",
  },
  title:{
    fontSize:16,
    fontWeight:'400',
    padding:3,
    //fontFamily: "Museo Sans",
  },
  texttitle:{
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    //fontFamily: "Museo Sans",
    width:'50%',
  },
  detail:{
    fontSize:16,
    fontWeight:'400',
    color: '#0071BC',
    textAlign:'left',
    //fontFamily: "Museo Sans",
    width:'50%',
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 45,
    left: 18,
    width: 90,
    textAlign: 'center',
    color: '#0071BC',
    fontSize: 20,
    fontWeight: "200",
    //fontFamily: "Museo Sans",
  },
  hostext: {
    backgroundColor: 'transparent',

    textAlign: 'center',
    color: '#0071BC',
    fontSize: 20,
    //fontFamily: "Museo Sans",
    fontWeight: "300"
  },
  buttonText: {
    fontSize: 12,
    paddingLeft:12,
    paddingRight:12,
    paddingTop:4,
    paddingBottom:4,
    color: 'white',
    //fontFamily: "Museo Sans",
    fontWeight:'200'
  },
  button: {
    backgroundColor: '#0071BC',
    borderColor: '#0071BC',
    borderWidth: 1,
    borderRadius: 4,
    marginRight:10,
    marginLeft:10,
    alignSelf: 'flex-end',
  },
});

module.exports = HoursOfService;
