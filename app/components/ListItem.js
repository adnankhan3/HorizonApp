import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
     borderWidth:1,
    elevation:30,   
    margin:10,
    borderRadius:8,
    minHeight :70,
  
    


  },
  pendingRow:{
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  completedRow:{
    backgroundColor:'#ececec',
    borderColor:'#ececec',
 // backgroundColor:'#fff',
  //  borderColor:'#fff',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#0071BC',
    //fontFamily: "Museo Sans",
  },
  leftImage: {
    width: 50,
    height:50,
    marginRight:10
  },
  // icon:{
  //   fontSize:22,
  //   marginRight:5,
  //   color: '#2978bd'
  // },

});

class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={[styles.row, this.props.data.status == 'pending' ? styles.pendingRow : styles.completedRow]}>
          {this._showIconLeft()}

          <Text style={styles.text}>
             {this.props.data.title}
          </Text>
          {this._showIconRight()}
      </View>

    );
  }
  _showIconLeft()
  {

    if (this.props.data.icon) {
      return(<Icon name={this.props.data.icon} size={22} marginRight={5} color="#2a3542"  />);
    }

  }
  _showIconRight()
  {
    if (this.props.data.iconright) {
      return(<Icon name={this.props.data.iconright} size={22} marginRight={5} color="#2a3542"  />);
    }
  }
};

module.exports = ListItem;
