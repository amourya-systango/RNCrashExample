/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { Component } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import SpinLoader from '../loaders/SpinLoader';
import ScreenService from '../Screen/screenService.js'
import { bindActionCreators } from 'redux'
import * as authActions from '../../actions/user';
import * as fetchRoute from '../../actions/route';
import { connect } from 'react-redux';
import { Button } from 'rn-crash-reporter'

// import {initSourceMaps} from 'react-native-source-maps';
// import ErrorUtils from "ErrorUtils";
// import RNFS from "react-native-fs";
// import SourceMap from "source-map";
// import StackTrace from "stacktrace-js";

let sourceMapper = undefined;

class Home extends Component {

 /*
 * Home - Lifecycle
 */
 constructor(props){
    super(props);

    this.state = {
                   width:ScreenService.getScreenSize().width,
                   height:ScreenService.getScreenSize().height
                 };

                // initSourceMaps({sourceMapBundle: "source.js", basePath: RNFS.MainBundlePath, directoryPath: `${RNFS.DocumentDirectoryPath}/test.txt`});

  }

  render(){
    return (
      <View style={{ backgroundColor: '#59636C', width:this.state.width, height:this.state.height}} >
           <View style={styles.nameContainer}>
             <Image source={require('../../../assets/home/user.png')} />
            </View>
            <View style={styles.container}>
            <Button style={[styles.btn, {width:this.state.width - 70}]} onPress={ ()=> this.pressViewCrashReport()}>
                View Crash Reported
            </Button>
            <Button style={[styles.btn, {width:this.state.width - 70}]} onPress={ ()=>
              {throw new Error("Javascript error test successful!")}
            } >
                To Crash Click Here
            </Button>
            <Button style={[styles.btn, {width:this.state.width - 70}]} onPress={ ()=>
              this.divideCrash()
            }>
                Random Crash
            </Button>
            </View>
          <SpinLoader superObject={this} width={this.state.width} height={this.state.height}/>
         </View>
    );
  }

  /*
  * Home - Private Method
  */

  handleMenu() {
     const {menuOpen} = this.state
     this.setState({
       menuOpen: !menuOpen
     })
}

pressViewCrashReport(event){
 this.props.navigation.navigate('CrashReport')
}

divideCrash(){
 txt = "a";
 while(1){
     txt = txt += "a";    //add as much as the browser can handle
 }
}

}

function mapStateToProps (state) {
  return {
    user: state.user.response,
    profileImage: state.user.profileImage,
    isFetching:state.user.isFetching,
  }
}

function bindActions(dispatch){
   return {
     actions: bindActionCreators(authActions, dispatch),
     route: bindActionCreators(fetchRoute, dispatch)
   }
}

export default connect(mapStateToProps, bindActions)(Home);
