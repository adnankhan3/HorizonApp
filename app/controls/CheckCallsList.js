'use strict'
import React, { Component }  from 'react';
import ReactNative, {StyleSheet, Text, View, Picker, ListView} from 'react-native';
import Button from 'react-native-button';

import ListItem from '../components/ListItem'
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class CheckCallsList extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    }
  }
  // <Picker
  //       style={styles.picker}
  //       selectedValue={this.state.selected1}
  //       onValueChange={this.onValueChange.bind(this, 'selected1')}>
  //       <Item label="hello" value="key0" />
  //       <Item label="world" value="key1" />
  //     </Picker>
  componentWillReceiveProps(props) {
      this._getRows(props.data);
  }

  render() {
    // <View>
    //   <Text style={styles.heading}>
    //     Last 3 Check Calls
    //   </Text>
    // </View>

    console.log(Common.AccessToken);
    return(
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
    Common.GoToScreen('checkcalldetailshome', id);

  }
  _getRows(data) {
    var dataBlob = [

    ];

    data.forEach(function(checkcall){
        dataBlob.push({title:'Date: ' + checkcall.strDate + '\nType: ' + checkcall.CheckCallType + ', ' + checkcall.Status, status:checkcall.Status.toLowerCase(),id:checkcall.CheckCallId, icon:'', iconright:'chevron-right'});

      });
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      dataSource: ds.cloneWithRows(dataBlob),
    });
  }

}

var styles = StyleSheet.create({
  heading:{
    color: '#7591af',
    fontSize: 18,
    fontWeight: "300",
    padding:4,
    flex:1,
    textAlign: 'center',
    borderBottomWidth:1,
    borderColor:'#cccccc',
  },
});


module.exports = CheckCallsList;
