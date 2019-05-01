import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer, Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import DrawerView from './DrawerView';

const propTypes = {
  navigationState: PropTypes.object,
};
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}
class NavigationDrawer extends React.Component {
  constructor (props){
    super(props);
    this.state = {
        logout:props.logout
    }
    Keyboard.dismiss();
  }
  closeDrawer = () => {
    this._drawer.close();
  };

OpenDrawer = () => {
    this._drawer.open();
    alert('isaeed');
  };

  // logout = () =>{
  //     console.log('loggedout called');
  // };
 componentDidMount(){

//Keyboard.dismiss;
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    //ref="navigation"
    return (
      <Drawer

        ref={(ref) => this._drawer = ref}
        type="overlay"
        onOpen={() => Actions.refresh({ key: state.key, open: true })}

        onOpenStart ={()=>Keyboard.dismiss() }
        onClose={() => Actions.refresh({ key: state.key, open: false })}
        content={<DrawerView logout={this.state.logout} closeDrawer={this.closeDrawer}   />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
        styles={drawerStyles}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

NavigationDrawer.propTypes = propTypes;

export default NavigationDrawer;
