'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, Picker, ListView} from 'react-native';
import Button from 'react-native-button';

import ListItem from '../components/ListItem'
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class AvailabilityList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this._getRows({})),
      modalVisible: true,
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
      <Button onPress={() => Common.GoToScreen('availability')}>
        <ListItem data={rowData} />
      </Button>
    );
  }
  _getRows() {
    
    var dataBlob = [
      {title:'Date: 05-24-2016\nTampa, FL', id:'1', icon:'', iconright:'chevron-right'},
      {title:'Date: 05-25-2016\nMiami, FL', id:'1', icon:'', iconright:'chevron-right'},
      {title:'Date: 05-26-2016\nOrlando, FL', id:'1', icon:'', iconright:'chevron-right'}

    ];
    return dataBlob;
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
});


module.exports = AvailabilityList;
