import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Spinner } from './../common';
import { priceDisplay, originalPrice, travelerEarn } from './../../utilities/utility';


class BagItem extends Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        traverAddCart: PropTypes.func.isRequired,
        loadTravelrCart: PropTypes.func.isRequired,
        //travelerCommission: PropTypes.string.isRequired,
        buyerCharge: PropTypes.string.isRequired
    }
    render() {
        const { id, image, title, price } = this.props.data;
        return (
            <View style={styles.dealStyle} >
                <Image 
                    source={{ uri: image }} 
                    style={styles.image}
                />
                <Text style={styles.earn}>Earn { travelerEarn(originalPrice(price, this.props.buyerCharge), 10)}</Text>
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.priceDesign}>{priceDisplay(originalPrice(price, this.props.buyerCharge))}</Text>
                        { this.props.addCart.indexOf(id) >= 0 ? (
                                <Button 
                                    onPress={() => this.props.loadTravelrCart()}
                                    children='Traveler Bag'
                                    customStyle={styles.customeStyle}
                                    textSize={styles.btnTextSize} 
                                />
                                ) : (
                                 this.props.cartLoading ? 
                                    <Spinner size='small' /> : 
                                    <Button 
                                        onPress={() => this.props.traverAddCart(id)}
                                        children='Collect'
                                        customStyle={styles.customeStyle}
                                        textSize={styles.btnTextSize} 
                                    />
                                ) 
                            } 
                    </View>
                </View>
            </View>
        );
    }

}

const styles = {
    dealStyle: {
        marginHorizontal: 15,
        marginVertical: 15
    },
    image: {
        width: '100%',
        height: 180,
        backgroundColor: '#ccc',
        borderColor: '#ff793a',
        borderBottomWidth: 0
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderTopWidth: 1
    },
    title: {
        fontSize: 15,
        marginBottom: 5
    },
    category: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    priceDesign: {
        color: '#ff793a',
        fontSize: 18,
        fontWeight: 'bold'
    },
    customeStyle: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    btnTextSize: {
        fontSize: 15
    },
    earn: {
        position: 'absolute', 
        right: 0, 
        backgroundColor: '#33414e', 
        padding: 10,
        color: '#fff',
        borderRadius: 5
    }

};

export { BagItem };
