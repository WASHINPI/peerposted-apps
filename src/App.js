/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import RootStack from './routes';
//import SideMenu from 'react-native-side-menu';

// check user token is exits in data base 
// If exits then check database and load initial page
// If not then load login page 
// if Token is valid then load the dashboard page.

export default class App extends Component {
    
    render() {
        return (<RootStack />);
    }
}
