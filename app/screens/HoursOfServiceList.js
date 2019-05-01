'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, ListView} from 'react-native';
import Button from 'react-native-button';

import ListItem from '../components/ListItem'
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class HoursOfService extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._getRows({})),
    }
  }
  render() {
    return(
      <ViewContainer >
      <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {return this._renderRow(rowData)}}
          automaticallyAdjustContentInsets={false}
          renderSeparator={Common.renderSeperator}
          scrollEnabled={false}
        />
      </ViewContainer>
    );
  }
  _renderRow(rowData){
    return(
      <Button onPress={() => Common.GoToScreen('hosdetails')}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  _getRows() {
    var dataBlob = [
      {title:'As On: 05-24-2016 10:39 AM\nCycle Duty Hours: 60.0\nDaily Duty Hours: 14.00', id:'1', icon:'', iconright:'chevron-right'},
      {title:'As On: 05-24-2016 10:39 AM\nCycle Duty Hours: 60.0\nDaily Duty Hours: 14.00', id:'1', icon:'', iconright:'chevron-right'},
    ];
    return dataBlob;
  }
}

var styles = StyleSheet.create({

});


module.exports = HoursOfService;
