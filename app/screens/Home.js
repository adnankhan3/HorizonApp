'use strict'
import React, { Component }  from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';

import ViewContainer from '../components/ViewContainer';
//import Common from '../components/Common'
import TripInfo from '../controls/TripInfo';
import CheckCalls from '../controls/CheckCalls';
import CheckCallsList from '../controls/CheckCallsList';
import CheckCallInfo from '../controls/CheckCallInfo';
import Hos from '../controls/hos';
import Login from '../screens/Login'
import Common from '../components/Common';
import Launch from '../components/Launch'

class Home extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.loading = this.loading.bind(this);
    this.state = {
      visible: false,
      homeData: null,
      reloadData:false,
    };
  }
  handler() {
    //e.preventDefault()
    // this.setState({
    //   visible: true
    // })
    if (Common.AccessToken != '')
{
    this.LoadData();
}
  }
  loading(val){
    this.setState({
      visible: val
    })
  }
  render() {
if (Common.AccessToken != ''  )
{

   if (this.state.homeData !=null)
   {
    return(
      
      <ViewContainer >


        <TripInfo data={this.state.homeData} />
        
        <CheckCallInfo handler = {this.handler} loading={this.loading} comment = {this.state.homeData !=null && this.state.homeData.Instructions2 !=null ? this.state.homeData.Instructions2:''}  trailerdata={this.state.homeData !=null ? this.state.homeData.TrailerList:[]}  homedata= {this.state.homeData} data={this.state.homeData != null ? this.state.homeData.CheckCalls[0] : {}} />

        <Hos data={this.state.homeData} />
        <View style={{ flex: 1 }}>
          <Spinner visible={this.state.visible} />
        </View>
      </ViewContainer>
    );
   }

     else{
       return(
      
      <ViewContainer >

          </ViewContainer>
    );

     }

}

else{
//return(<Login/>);
return(<Launch loginstate={false}  />);
}
//<CheckCallsList data={this.state.homeData != null ? this.state.homeData.CheckCalls : []} />

  }
  componentDidMount(){
    if (Common.AccessToken != '') {
      this.LoadData();

     // alert(this.state.homeData.TrailerList.lenght)
    }
    else{
      this.setState ({
      visible: false,
      homeData: null,
      reloadData:false,
    });
    
    }
  }
  componentWillReceiveProps(props){
    console.log('test');
    if (Common.AccessToken != '') {
      this.LoadData();
 //     alert(this.state.homeData.TrailerList.lenght)
    }

else{
      this.setState ({
      visible: false,
      homeData: null,
      reloadData:false,
    });


    }

  }

  LoadData() {
    //console.log(Common.AccessToken);



    var API_URL = Common.baseURL + 'v1/getdriverhome';

    var me = this;

    this.setState({
      visible: true,
    });
    fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'accesstoken': Common.AccessToken
      },

    })

    .then((responseData) => {

        if (responseData.ok == false) {

          
        me.setState({
          visible: false,
          homeData:null
        });
        Common.AccessToken ='';
        

      }


else{
      responseData.json().then(data => {
        me.setState({
          visible: false,
          homeData: data
        });

      })

}

    })
    .catch((error) => {
      console.warn('errorrrr');
      this.setState({
        visible: false
      });
    });
  }
}
//<CheckCalls />
var styles = StyleSheet.create({

});


module.exports = Home;
