import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { priceDisplay } from './../../utilities/utility';
import { Button, Spinner } from './../common';


class CartItem extends Component {
    static propTypes= {
        cart: PropTypes.object.isRequired,
        deleteCart: PropTypes.func.isRequired,
        btnLoading: PropTypes.bool.isRequired
    }

    renderBtn = (id) => {
        if (this.props.btnLoading) {
            return <Spinner size='small' />;
        }
        return (
            <Button 
                onPress={() => this.props.deleteCart(id)}
                children={
                    <MaterialCommunityIcons 
                        name={'delete-forever'}  
                        size={30}
                        color={'#FC7900'}
                    />
                }
                customStyle={styles.customeStyle}
                textSize={styles.btnTextSize} 
            />
        );
    }

    render() {
        const { body, imageStyle, pricingArea, cartTitle, cartPrice } = styles;
        const { id, image, title, price } = this.props.cart;
        
        return (
                <View style={body}>
                    <Image 
                        style={imageStyle} 
                        source={{ uri: image }}
                    />
                    <View style={styles.priceContainer}>
                        <Text style={cartTitle}>{title}</Text>
                        <View style={pricingArea}>
                            <Text style={cartPrice}>{priceDisplay(price)}</Text>
                           { this.renderBtn(id) } 
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
        height: 100,

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

export { CartItem };
