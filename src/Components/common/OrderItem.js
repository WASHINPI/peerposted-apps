import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { priceDisplay, originalPrice, travelerEarn } from './../../utilities/utility';
import { Button } from './../common';


class OrderItem extends Component {
    static propTypes= {
        cart: PropTypes.object.isRequired,
        orderType: PropTypes.bool.isRequired,
        cancelOrder: PropTypes.func.isRequired

    }

    render() {
        const { body, imageStyle, pricingArea, cartTitle, cartPrice } = styles;
        const { id, image, title, price, created_at } = this.props.cart;
        return (
            <View style={body}>
                <Image 
                    style={imageStyle} 
                    source={{ uri: image }}
                />
                <View style={styles.priceContainer}>
                    <Text style={cartTitle}>{title}</Text>
                    <Text style={{marginLeft: 15}}>From- USA</Text>
                    <Text style={{marginLeft: 15}}>Date- { Moment(created_at).format('MM/DD/YY')}</Text>
                    <View style={pricingArea}>
                        <Text style={cartPrice}>{ this.props.orderType ? priceDisplay(originalPrice(price, 20)) : priceDisplay(price)}</Text>
                        {
                            this.props.orderType && 
                            <Button 
                                onPress={() => this.props.cancelOrder(id)}
                                children={<MaterialCommunityIcons 
                                            name={'delete-forever'}  
                                            size={30}
                                            color={'#FC7900'}
                                />
                                        }
                                customStyle={styles.customeStyle}
                                textSize={styles.btnTextSize} 
                            />
                        
                        }
                            
                       
                    </View> 
                </View>
                </View>
        );
    }
}

const styles = {
    body: {
        backgroundColor: '#F5F7FD',
        padding: 10,
        margin: 7,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FC7900',
        flexDirection: 'row'
       
    },
    imageStyle: {
        width: 100, 
        height: 135,

    },
    priceContainer: {
        flex: 1
    },
    pricingArea: { 
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingLeft: 15
    },
    cartTitle: { 
        paddingLeft: 15
    },
    deleteIcon: {
        fontSize: 20,
        color: '#ccc'
    },
    cartPrice: {
        fontSize: 16, 
        color: '#FE848E'
    },
    customeStyle: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },
    btnTextSize: {
        fontSize: 12
    }
};

export { OrderItem };
