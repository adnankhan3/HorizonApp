import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';

var styles = StyleSheet.create({
  row: {
 //   flexDirection: 'row',
 //   justifyContent: 'center',
//    alignItems: 'center',
    padding: 5,
     borderWidth:1,
    elevation:30,   
    margin:10,
    borderRadius:10,
   
    


  },
  row1: {
width:'80%',
flex:1,
  },
    row2: {
width:'15%',
  },
  pendingRow:{
    backgroundColor:'#fff',
    borderColor:'#fff',
  },
  completedRow:{
    backgroundColor:'#ececec',
    borderColor:'#ececec',
  //backgroundColor:'#fff',
   // borderColor:'#fff',
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#808080',
    //fontFamily: "Museo Sans",
  },
  leftImage: {
    width: 50,
    height:50,
    marginRight:10
  },
    title:{
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    width:'35%',
    textAlign:'left',
    //fontFamily: "Museo Sans",
  },
  title2:{
    color: '#808080',
    fontWeight: "400",
    fontSize:16,
    padding:2 ,
    width:'35%',
    textAlign:'left',
    //fontFamily: "Museo Sans",
  },
  detail:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'left',
    width:'65%',
    //fontFamily: "Museo Sans",
  },
  detail2:{
    fontSize:16,
    fontWeight: "400",
    color: '#0071BC',
    textAlign:'left',
    width:'60%',
    //fontFamily: "Museo Sans",
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
       


                 <View style={{flex:1, flexDirection:'row'}} >
        <Text style={styles.title}>
           {strings('CheckCallList.Load_No')} 
          
        </Text>

        <Text style={styles.detail}>{this.props.data != null && this.props.data.title !=null ? this.props.data.title : ''}</Text>
</View>
        
     <View style={{flex:1, flexDirection:'row'}} >
        <Text style={styles.title}>
           {strings('CheckCallList.Shipper')} 
          
        </Text>

        <Text style={styles.detail}>{this.props.data != null && this.props.data.shipper !=null ? this.props.data.shipper : ''}</Text>
</View>
         <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
           {strings('CheckCallList.Consignee')} 
          
        </Text>

        <Text style={styles.detail2}>{this.props.data != null && this.props.data.consignee !=null ? this.props.data.consignee : ''}</Text>
        {this._showIconRight()}
</View>
  <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
           {strings('CheckCallList.Tractor')} 
          
        </Text>

        <Text style={styles.detail}>{this.props.data != null && this.props.data.tractor !=null ? this.props.data.tractor : ''}</Text>
</View>

            <View style={{flex:1, flexDirection:'row'}}>
        <Text style={styles.title}>
           {strings('CheckCallList.Trailer')} 
          
        </Text>

        <Text style={styles.detail}>{this.props.data != null && this.props.data.trailer !=null ? this.props.data.trailer : ''}</Text>
</View>
</View>

          
          
      

    );
  }
  _showIconLeft()
  {

    if (this.props.data.icon) {
      return(<Icon name={this.props.data.icon} size={22} marginRight={5} color="#2a3542"     />);
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
