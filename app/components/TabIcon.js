import React, {PropTypes} from 'react';
import {Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconBadge from 'react-native-icon-badge';
import Common from './Common';

var styles = StyleSheet.create({
  tab:{
    width:160,
    textAlign: 'center',
    fontSize:12,
    color:'#fff',
    
    
    
    
  //  fontFamily:'Museo Sans',
},
tabSelected:{
textShadowColor: '#fff',
textShadowOffset: {width: 2, height: 2},
textShadowRadius: 10,
fontStyle:'italic',
//textDecorationLine: 'underline line-through',

opacity:0.3
},
  IconBadge: {
  position:'absolute',
  top:-15,
  //left:1,
//  right:1,
  width:60,
  height:40,
  borderRadius:40,
  alignItems: 'center',
 justifyContent: 'center',
  backgroundColor: '#FF0000',
  
}
});

const TabIcon = (ico, props) => {





  if (props.badge && props.badgecount > 0) {
    
    return(

        <IconBadge
        MainElement={
          <Text  selectable= {props.selected ? false : true} style={[styles.tab, props.selected ? styles.tabSelected:'' ]}>
            <Icon name={ico} size={30} weight="bold"   />{'\n'}{props.title} 
          </Text>
        }
        BadgeElement={
          <Text style={{color:'#FFFFFF',marginLeft:-25,marginTop:10}}>{props.badgecount}</Text>
        }
//#
        IconBadgeStyle={styles.IconBadge}
        />
    );
  }
  else {
    return(
      <Text selectable= {props.selected ? false : true} style={[styles.tab,props.selected ? styles.tabSelected:'' ]}>
        <Icon name={ico} size={30} weight="bold"    />{'\n'}{props.title}
      </Text>
    );
  }
};
export default TabIcon;
