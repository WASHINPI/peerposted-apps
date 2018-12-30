import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from './../common';
import { priceDisplay } from './../../utilities/utility';


class ListItem extends Component {
    
    static propTypes = {
        data: PropTypes.object.isRequired,
        productDetails: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
    }
    render() {
        const { id, image, title, price, category } = this.props.data;
        return (
            <TouchableOpacity style={styles.dealStyle} >
                <Image 
                    source={{ uri: image }} 
                    style={styles.image}
                />
                <View style={styles.info}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.category}>{category}</Text> 
                    <View style={styles.footer}>
                        <Text style={styles.priceDesign}>{priceDisplay(price)}</Text>
                        <Button 
                            onPress={this.props.productDetails.bind(this, id)}
                            children='Details'
                            customStyle={styles.customeStyle}
                            textSize={styles.btnTextSize} 
                        />
                    </View>
                </View>
            </TouchableOpacity>
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
        //height: 300,
        //width:150,
        height:150,
        backgroundColor: '#ccc',
        borderColor: '#ff793a',
        borderBottomWidth: 0,
        resizeMode: 'contain'
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
    }

};

export { ListItem };
