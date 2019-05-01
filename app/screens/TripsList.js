'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, Picker, ListView} from 'react-native';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';

import ListItem from '../components/ListItemTrip'
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class TripsList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      visible: false,
      dataSource: ds //.cloneWithRows([]),
    }

  }
  // <Picker
  //       style={styles.picker}
  //       selectedValue={this.state.selected1}
  //       onValueChange={this.onValueChange.bind(this, 'selected1')}>
  //       <Item label="hello" value="key0" />
  //       <Item label="world" value="key1" />
  //     </Picker>
  render() {
    //var Item = Picker.Item;
    //enableEmptySections={true}
    return(
      <ViewContainer >
        <ListView style={styles.listView}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {return this._renderRow(rowData)}}
            renderSeparator={Common.renderSeperator}

          />
          <Spinner visible={this.state.visible} />
      </ViewContainer>
    );
  }

  _renderRow(rowData){
    return(
      <Button onPress={() => Common.GoToScreen('checkcalllist_triplist', rowData)}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  componentDidMount(){
    this.LoadData();
  }
  LoadData() {
    var API_URL = Common.baseURL + 'v1/GetDriverTrips';
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
        console.log(data);
        var dataBlob = [
          //{title:'Load: 012065\nDate: 05-24-2016 10:39 AM\nType: Start Trip, Completed', id:'1', icon:'', iconright:'chevron-right'},
        ];
        data.forEach(function(trip){
         //   dataBlob.push({title:'Load #:  ' + trip.ShipmentText + ', ' + trip.Status
         //     + '\nShipper:  ' + trip.Shipper
         //     + '\nConsignee:  ' + trip.Consignee
         //     + '\nTractor:  ' + trip.TractorNumber + ', Trailer:  ' + trip.TrailerNumber
         //     ,id:trip.TripId
          //    , icon:'', iconright:'chevron-right'});


                 dataBlob.push({title:trip.ShipmentText + ', ' + trip.Status,

              shipper: trip.Shipper,
              consignee: trip.Consignee,
              tractor: trip.TractorNumber,trailer: trip.TrailerNumber
              ,id:trip.TripId
              , icon:'', iconright:'chevron-right'});


          });
        //var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        me.setState({
          dataSource: me.state.dataSource.cloneWithRows(dataBlob),
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


module.exports = TripsList;
