import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import styles from './styles';
import { HeaderNav } from './../../Components/nav';

import smallLogo from '../../../public/images/smallLogo.png';
import payout from './../../../public/images/payout.png';
import myTravel from './../../../public/images/my_travel.png';
import myBag from '../../../public/images/travel.png';
import buyerRequest from '../../../public/images/request.png';
import withdraw from './../../../public/images/withdraw.png';
import shopping from './../../../public/images/shopping.png';
import orders from './../../../public/images/orders.png';
import ajax from '../../utilities/ajax';

class Dashoard extends Component {

    async componentWillMount() {
       await ajax.fetchAllCountry();
    }

    cartList = () => {
       this.props.navigation.navigate('Cart');
    }

    travelerCartList = () => {
        this.props.navigation.navigate('TravelerCart');
    }

    logout = async () => {
        const response = await ajax.logut();
        ToastAndroid.show('checkout successfully', ToastAndroid.SHORT);
        this.props.navigation.navigate('AuthStack');
    }

    render() {
        const {  
            headingText,
            textStyle, 
            list, 
            logoView, 
            levelOne,
            levelOneImg,
            levelTwo,
            levelThree,
            centerLogo,
            levelOneOpacity,
            levelOneText
        } = styles;

        return (
                <View>
                    <HeaderNav 
                        logout={this.logout} 
                        travelerCartList={this.travelerCartList} 
                        cartList={this.cartList} 
                    />
                    <View style={headingText}>
                        <Text style={textStyle}>Welcome to the Peerposted </Text>
                        <Text style={textStyle}>Dashboard</Text>
                    </View>
                    <View style={list}>
                        <View style={[logoView, levelOne]}>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('Profile')} 
                                    style={levelOneOpacity}
                                >
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 10, tintColor: '#fff' }]} 
                                        source={payout} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Payment</Text>
                            </View>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('MyTravel')} 
                                    style={[levelOneOpacity]}
                                >
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 10 }]} 
                                        source={myTravel} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Travel</Text>
                            </View>
                        </View>
                        <View style={[logoView, levelTwo]}>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('TravelerCart')} 
                                    style={[levelOneOpacity]}
                                >
                                    <Image 
                                        resizeMode='contain' 
                                        style={[levelOneImg, { margin: 8 }]} 
                                        source={myBag} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>My Bag</Text>
                            </View>
                            <View style={centerLogo} >
                                <Image 
                                    resizeMode='contain'
                                    style={[styles.logo, { margin: 10 }]} 
                                    source={smallLogo} 
                                />
                            </View>
                            <View>
                                <TouchableOpacity 
                                    style={[levelOneOpacity]}
                                    onPress={() => this.props.navigation.navigate('Request')}
                                >
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 8 }]} 
                                        source={buyerRequest} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Request</Text>
                            </View>
                        </View>
                        <View style={[logoView, levelThree]}>
                            <View>
                                <TouchableOpacity style={levelOneOpacity}>
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 10, tintColor: '#fff' }]} 
                                        source={withdraw} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Withdraw</Text>
                            </View>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('Products')} 
                                    style={[levelOneOpacity, { marginTop: 30 }]}
                                >
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 10 }]} 
                                        source={shopping} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Shopping</Text>
                            </View>
                            <View>
                                <TouchableOpacity 
                                    onPress={() => this.props.navigation.navigate('MyOrders')} 
                                    style={[levelOneOpacity]}
                                >
                                    <Image 
                                        resizeMode="contain" 
                                        style={[levelOneImg, { margin: 10 }]} 
                                        source={orders} 
                                    />
                                </TouchableOpacity>
                                <Text style={levelOneText}>Orders</Text>
                            </View>
                        </View>
                    </View>
                </View>
        );
    }
}


const styles = {
    headingText: {
        alignItems: 'center',
        marginVertical: 30
    },
    textStyle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    list: {
        justifyContent: 'center',
    },
    logoView: {
        flexDirection: 'row',
    },
    levelOne: {
       alignItems: 'flex-end',
       justifyContent: 'center',
    },
    levelOneText: {
        alignSelf: 'center', 
        fontSize: 17,
        marginRight: 15
    },
    levelOneImg: {
        width: 40,
        height: 40,
    },
    levelOnePadding: {
        paddingTop: 15,
        paddingLeft: 15
    },
    levelOneOpacity: {
        backgroundColor: '#FD7900',
        borderRadius: 50,
        padding: 10,
        marginRight: 15
    },
    logoMargin: {
        marginHorizontal: 15
    },
    levelTwo: {
        alignItems: 'center',
        justifyContent: 'space-around',
     },
    centerLogo: {
        backgroundColor: '#FEEFE4',
        borderRadius: 50
    },
    levelThree: {
        justifyContent: 'center',
    },
    lastImage: {
        alignSelf: 'center'
    },
    logo: {
        width: 70,
        height: 70
    }
};

export default Dashoard;
