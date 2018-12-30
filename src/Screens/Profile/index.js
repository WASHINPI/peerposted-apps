import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { HeaderNav, FooterNav } from './../../Components/nav';

import ChangePassword from './subComponent/ChangePassword';
import Payments from './subComponent/Payments';
import UserProfile from './subComponent/UserProfile';
import styles from './styles';


class Profile extends Component {
    
    static navigationOptions = {
        header: null
    }
    
    constructor() {
        super();
        this.state = {
            activeTab: 1
        };
    }
   
    async componentDidMount() {
        const tab = this.props.navigation.getParam('activeTab');
        console.log('washi',tab);
        console.log('washi',this.props.navigation);
        this.setState({
            activeTab: tab
        });
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    cartList = () => {
        this.props.navigation.navigate('Cart');
     }
 
     travelerCartList = () => {
         this.props.navigation.navigate('TravelerCart');
     }

    openWithdraw = () => {
        this.props.navigation.navigate('Withdraw');
    }
    loadContent = () => {
        const { tabButton, headerText, activeColor } = styles;
        
        return (
            <View style={styles.subContainer}>
                <View style={tabButton}>
                    <TouchableOpacity onPress={() => this.setState({ activeTab: 1 })}>
                        <Text style={[headerText, (this.state.activeTab === 1) && activeColor]}>Profile</Text>
                    </TouchableOpacity>
                    <Text> | </Text>
                    <TouchableOpacity onPress={() => this.setState({ activeTab: 2 })}>
                        <Text style={[headerText, (this.state.activeTab === 2) && activeColor]}> Password</Text>
                    </TouchableOpacity>
                    <Text> | </Text>
                    <TouchableOpacity onPress={() => this.setState({ activeTab: 3 })}>
                        <Text style={[headerText, (this.state.activeTab === 3) && activeColor]}> Payment</Text>
                    </TouchableOpacity>    
                </View>
                {this.renderTab()} 
            </View>
        );
    }

    renderTab = () => {
        if (this.state.activeTab === 1) {
            return (<UserProfile />);
        }

        if (this.state.activeTab === 2) {
            return (<ChangePassword />);
        } 
        if (this.state.activeTab === 3) {
            return (<Payments openWithdraw={this.openWithdraw} />);
        } 
    }
   
    render() {
        const { container, subContainer } = styles;
        console.disableYellowBox = true;
        return (
            <View style={container}>
                <HeaderNav 
                    profile={() => this.openDrawer()}
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList} 
                />
                <View style={subContainer}>
                    {this.loadContent()}   
                </View>
                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Profile;

