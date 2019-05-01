'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';
import Button from 'react-native-button';
import CalendarStrip from 'react-native-calendar-strip';
import Spinner from 'react-native-loading-spinner-overlay';

import ViewContainer from '../components/ViewContainer'
import ListItem from '../components/ListItem'
import Common from '../components/Common'

class Schedule extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      visible:false,
      data: null,
      dataSource: ds.cloneWithRows([]),
      trips:[],
    }
  }
  render() {
    return(
      <ViewContainer >
        <View>
            <CalendarStrip onDateSelected={(date)=> {this.SelectDate(date);}}/>
        </View>
        <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {return this._renderRow(rowData)}}
            automaticallyAdjustContentInsets={false}
            renderSeparator={Common.renderSeperator}
            scrollEnabled={false}
            enableEmptySections={true}
          />
        <Spinner visible={this.state.visible} />
      </ViewContainer>
    );
  }
  _renderRow(rowData){
    return(
      <Button  onPress={() => this._handleClick(rowData.id)}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  _handleClick(id){
    //Common.GoToScreen('checkcalldetails', id);
  }
  componentDidMount(){
    console.log('componentDidMount()');
  }
  SelectDate(date){
    console.log(date.format('MM/DD/YYYY'));
    var dfrom = date.format('MM/DD/YYYY');
    var dto = date.format('MM/DD/YYYY');
    var API_URL = Common.baseURL + 'v1/GetDriverSchedule?dfrom=' + dfrom + '&to=' + dto + '';
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
        data.forEach(function(trip){
          dataBlob.push({title:'Load #: ' + trip.ShipmentText //+ ', ' + trip.Status
            + '\nShipper: ' + trip.ShipperLocation
            + '\nConsignee: ' + trip.ConsigneeLocation
            + '\nTractor: ' + trip.TractorNumber + ', Trailer: ' + trip.TrailerNumber
            ,id:trip.TripId});
        });
        console.log(dataBlob);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          dataSource: ds.cloneWithRows(dataBlob),
        });
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

});


module.exports = Schedule;
