
'use strict';

import React, { Component } from 'React';
import { Provider, connect } from 'react-redux';
import { configureStore, AppNavigator } from './configureStore'
import { CrashReporter } from 'rn-crash-reporter'

export default class App extends Component {

    componentWillMount(){

        CrashReporter.setConfiguration({
            hostURL: 'http://127.0.0.1:8000', // Replace this URL with your Server base url
            enableReporter: false  // pass false here if you don't want to enable crash reporting
        });
    }

    render() {
        return (
            <Provider store={configureStore}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

function mapStateToProps (state) {
    return {
      state: state.RootStackReducer
    }
}

const AppWithNavigationState = connect(mapStateToProps)(AppNavigator)
