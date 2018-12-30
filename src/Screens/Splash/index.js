import React, { Component } from 'react';
import { View } from 'react-native';
import ajax from './../../utilities/ajax';
import InitialComponent from './../../Components/InitialComponent';
import styles from './styles';

export default class Splash extends Component {
    
    constructor() {
        super();
        this.state = {
            logged: false,
            initial: true,
        };
    }

    async componentDidMount() {
        //await ajax.logout();
        const status = await ajax.checkUserInfo();
        if (status) {
            const cart = await ajax.fetchAllCart();
            await ajax.setCartCounter(cart.length);

            // profile
            const profilePic = await ajax.getMyProfile();
            //console.log(profilePic);
            if (profilePic.data.user_photo !== null) {
                await ajax.setProfilePic(profilePic.data.user_photo);
            }
            const travelerCart = await ajax.fetchAllTravelerCart();
            await ajax.setTravelerCartCounter(travelerCart.data.length);

            this.props.navigation.navigate('Dashboard'); 
            return false;
        }  
        this.props.navigation.navigate('Login');
        return false;
    }


    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <InitialComponent />
            </View>
        );
    }
}
