'use strict'

import React, { Component }  from 'react';
import {View, ScrollView, StyleSheet} from 'react-native'

class ViewContainer extends Component{
  render() {
    var _scrollView = ScrollView;

    if(this.props.isWindow == true)
    {
    return(
      
      <ScrollView
        style={styles.viewContainer}
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={false}
        onScroll={() => {  }}
        scrollEventThrottle={200}
      >
        <View style={[styles.tabbar, this.props.isWindow && styles.window]}>
          <View style={styles.navbar}>
          </View>
            {this.props.children}

        </View>
      </ScrollView>

    );
  }
  
else{
  return(
  <ScrollView
        style={styles.viewContainerIn}
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={false}
        onScroll={() => {  }}
        scrollEventThrottle={200}
      >
        <View style={[styles.tabbar, this.props.isWindow && styles.window]}>
          <View style={styles.navbar}>
          </View>
            {this.props.children}

        </View>
      </ScrollView>
      );
}

  }

}

const styles = StyleSheet.create({
  viewContainer:{

    padding: 0,
    backgroundColor:'#0071BC',
    flex:1,
  },

viewContainerIn:{

    padding: 0,
    backgroundColor:'#fff',
    flex:1,
  },

  scrollContainer:{
    //flex:1,
  },
  window:{
    padding:30,
    alignItems: 'center',
    flex:1
  },
  navbar:{
    marginTop: 80,
  },
  tabbar:{
    marginBottom:40,
    flex:1
  }
});

module.exports = ViewContainer;
