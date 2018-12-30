import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import ajax from './../../utilities/ajax';
import InitialComponent from './../../Components/InitialComponent';
import styles from './styles';

export default class Logout extends Component {
    
    constructor() {
        super();
        this.state = {
            logged: false,
            initial: true,
        };
    }

    async componentDidMount() {
        await ajax.logout();
        ToastAndroid.show('Logout Successfully !', ToastAndroid.SHORT); 
        this.props.navigation.navigate('Login');
        return false;
    }


    render() {
        return (
            <View style={styles.container}>
                <InitialComponent />
            </View>
        );
    }
}
