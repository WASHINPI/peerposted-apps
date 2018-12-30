import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import ajax from './../../utilities/ajax';
import { baseUrl } from './../../utilities/utility';
import cart from './../../../public/images/cart.png';
import bag from './../../../public/images/bag_icon.png';

class Right extends Component {

    static propTypes = {
        customeStyle: PropTypes.object,
        cartList: PropTypes.func.isRequired,
        travelerCartList: PropTypes.func.isRequired,
        profile: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            totalCart: 0,
            travelerCart: 0,
            profilePic: ''
        };
    }
    
    // async componentWillMount() {
    //     const count = await ajax.getCartCounter();
    //     const travelerCount = await ajax.getTravelerCartCounter();
    //     const profilePic = await ajax.getProfilePic();
       
    //     this.setState({
    //         profilePic,
    //         totalCart: count,
    //         travelerCart: travelerCount
    //     }); 
    // }

    async componentDidMount() {
        const count = await ajax.getCartCounter();
        const travelerCount = await ajax.getTravelerCartCounter();
        const profilePic = await ajax.getProfilePic();
        this.setState({
            profilePic,
            totalCart: count,
            travelerCart: travelerCount
        });  
    }


    async componentDidUpdate() {
        const count = await ajax.getCartCounter();
        const travelerCount = await ajax.getTravelerCartCounter();
        const profilePic = await ajax.getProfilePic();
        this.update(count, travelerCount, profilePic);
    }
    update = (count, travelerCount, profilePic) => {
        this.setState({
            profilePic,
            totalCart: count,
            travelerCart: travelerCount
        });
    }

    // async componentWillUpdate() {
    //     const count = await ajax.getCartCounter();
    //     const travelerCount = await ajax.getTravelerCartCounter();
    //     const profilePic = await ajax.getProfilePic();
    //     this.setState({
    //         profilePic,
    //         totalCart: count,
    //         travelerCart: travelerCount
    //     });
    // }

    cartListItem = () => {
        this.props.cartList();
    }

    travelerCartList = () => {
        this.props.travelerCartList();
    }

    profile = () => {
        this.props.profile();
    }
    
    render() {
        return (
            <View style={[styles.body, this.props.customeStyle]}>
                <TouchableOpacity onPress={() => this.travelerCartList()}>
                    <Image 
                        resizeMode="contain" 
                        style={styles.imagesize} 
                        source={bag} 
                    />
                    
                    <Text style={styles.badgeStyle}>{this.state.travelerCart}</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.cartListItem()}>
                    <Image 
                        resizeMode="contain" 
                        style={styles.imagesize} 
                        source={cart} 
                    /> 
                    <Text style={styles.badgeStyle}>{this.state.totalCart}</Text>
                </TouchableOpacity>
                
                    <Avatar
                        size="small"
                        rounded
                        source={{ uri: baseUrl + this.state.profilePic }}
                        onPress={() => this.profile()}
                        activeOpacity={0.7}
                        imageProps={{ borderColor: '#ff793a', borderWidth: 1 }}
                    />
               
                
            </View>  
        );  
    }
}

const styles = {
    body: {
        flexDirection: 'row'
    },
    imagesize: {
        margin: 10, 
        marginHorizontal: 5, 
        marginVertical: 5, 
        width: 25, 
        height: 25
    },
    badgeStyle: {
        position: 'absolute', 
        right: 0, 
        backgroundColor: '#fc7900',
        paddingVertical: 1, 
        paddingHorizontal: 6, 
        color: '#fff',
        borderRadius: 25
    }
};


export { Right };
