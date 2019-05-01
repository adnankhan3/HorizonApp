import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


var styles = StyleSheet.create({
  row: {
  //  flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
     borderWidth:1,
    elevation:20,   
    margin:5,
    borderRadius:6,
    minHeight :40,
  backgroundColor:'#fff',
    borderColor:'#fff',
    


  },
  pendingRow:{
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  
  text: {
    flex: 1,
    fontSize: 16,
    color: '#0071BC',
    //fontFamily: "Museo Sans",
  },
  leftImage: {
    width: 50,
    height:70,
    marginRight:10
  },
  

img: {
    flex: 1,
     width: 193,
    height: 110,
    //fontFamily: "Museo Sans",
  },


});

class ListItemDoc extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={[styles.row]}>
          


          <Image
              source={{ uri: this.props.data.title }}
              style={styles.img}
            />
          
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

module.exports = ListItemDoc;
