import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import styles from './styles';
import { HeaderNav, FooterNav } from './../../Components/nav';

import profile from '../../../public/images/profile.png';
import payout from './../../../public/images/payout.png';
import myTravel from './../../../public/images/my_travel.png';
import myBag from '../../../public/images/travel.png';
import buyerRequest from '../../../public/images/request.png';
import withdraw from './../../../public/images/withdraw.png';
import shopping from './../../../public/images/shopping.png';
import orders from './../../../public/images/orders.png';


// eslint-disable-next-line react/no-multi-comp
class Dashoard extends Component {

    static navigationOptions={
        header: null,
    }

    async componentDidMount() {
        //await ajax.logut();
        const token = await AsyncStorage.getItem('TOKEN');
        const userid = await AsyncStorage.getItem('USERID');
        console.log(token);
    }

    cartList = () => {
       this.props.navigation.navigate('Cart');
    }

    travelerCartList = () => {
        this.props.navigation.navigate('TravelerCart');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }
    
    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    render() {
        const {  
            headingText,
            textStyle
        } = styles;
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <HeaderNav 
                    profile={this.openDrawer} 
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList}
                />
                <View style={headingText}>
                    <Text style={textStyle}>Welcome to the </Text>
                    <Text style={textStyle}> Peerposted Dashboard</Text>
                </View> 
                <View style={[styles.body]}>
                    <View style={styles.parentDiv}>
                        <View style={[styles.routePosition]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Profile', { activeTab: 1 })} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="cover"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={profile} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Profile </Text>
                        </View>
                        <View style={[styles.routePosition, styles.paymentStatus]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Profile', { activeTab: 3 })} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="cover"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={payout} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Payment </Text>
                        </View>

                        <View style={[styles.routePosition, styles.activeTravel]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('MyTravel')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff'}]} 
                                    source={myTravel} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Travel </Text>
                        </View>

                        <View style={[styles.routePosition, styles.myBag]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('TravelerCart')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={myBag} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>My Bag </Text>
                        </View>
                            
                        <View style={[styles.routePosition, styles.request]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Request')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={buyerRequest} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Request </Text> 
                        </View>

                        <View style={[styles.routePosition, styles.withdraw]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Withdraw')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={withdraw} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Withdraw </Text> 
                        </View>

                        <View style={[styles.routePosition, styles.shopping]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('Products')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={shopping} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Shopping </Text> 
                        </View>

                        <View style={[styles.routePosition, styles.orders]}>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('MyOrders')} 
                                style={styles.touchableOpacity}
                            >
                                <Image 
                                    resizeMode="contain"  
                                    style={[styles.imageSize, { tintColor: '#fff' }]} 
                                    source={orders} 
                                />
                            </TouchableOpacity>
                            <Text style={styles.bottomText}>Orders </Text>
                        </View> 
                    </View>
                </View>
                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Dashoard;
