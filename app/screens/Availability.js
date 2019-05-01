'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View, TextInput, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

//import DropDown, {Select, Option, OptionList} from 'react-native-selectme';
import DateTimePicker from 'react-native-modal-datetime-picker'
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';
import ViewContainer from '../components/ViewContainer'
import Common from '../components/Common'

class Availability extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "Select State",
      isVisible: false,
      isDateTimePickerVisible: false,
      itemDate: "Select Date",
    };
    _.bindAll(this, ['showPopover', 'closePopover', 'setItem']);
  }
  showPopover() {
    this.setState({isVisible: true});
  }

  closePopover() {
    this.setState({isVisible: false});
  }

  setItem(item) {
    this.setState({ item: item });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true })

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date)
    this._hideDateTimePicker()
    //this.setState({ itemDate: date });
  }

  render() {
    const items = [
      "NC",
      "NJ",
      "NY",
      "FL",
      "CA",
      "CO",
    ];
    return(
      <ViewContainer>
        <View style={styles.container}>
        <Button containerStyle={styles.button} style={styles.buttonText} onPress={this.showPopover}>
          <Text>{this.state.item} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
        </Button>
        <ListViewSelect style={styles.poplist}
          list={items}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}
        />
        <Button containerStyle={styles.button} style={styles.buttonText} onPress={this._showDateTimePicker}>
          <Text>{this.state.itemDate} </Text><Icon name={'keyboard-arrow-down'} style={[styles.icon, {paddingRight:10}]}   />
        </Button>
        <DateTimePicker
          visible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        <TextInput underlineColorAndroid='transparent'
          style={styles.input}
          placeholder='City'
          value={this.state.Password}
          onChange={(event) => this.setState( {Password: event.nativeEvent.text})}
        />
        <TextInput underlineColorAndroid='transparent'
          style={styles.input}
          placeholder='Details'
          multiline={true}
          numberOfLines = {4}
        maxLength = {400}
          value={this.state.Password}
          onChange={(event) => this.setState( {Password: event.nativeEvent.text})}
        />
        <Button containerStyle={styles.buttongreen} style={styles.buttongreenText} underlayColor='#5cb85c'
            onPress={() => {
                Common.GoToScreen('tripdetails');
            }}
        >
            Save Availability
        </Button>
        </View>
      </ViewContainer>
    );
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
  input: {
    height: 45,
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
    paddingLeft:25,
    paddingRight:25,
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
});


module.exports = Availability;
