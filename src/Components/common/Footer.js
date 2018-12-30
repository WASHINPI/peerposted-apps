import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Footer extends Component {
    
    render() {
        const { container, textStyle, iconsStyle, icons } = styles; 

        return (
            <View style={container}>
                <Text style={textStyle}>Peerposted{'\u00A9'}2018 </Text>
                <View style={iconsStyle}>
                    <Icon style={icons} name="twitter" size={20} />
                    <Icon style={icons} name="instagram" size={20} /> 
                    <Icon style={icons} name="facebook" size={20} />     
                </View>
            </View>
        );  
    }
}

const styles = {
    container: { 
        left: 0, 
        right: 0, 
        bottom: 0,
        height: 30,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'absolute',
        backgroundColor: '#fc7900',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        color: '#ffffff'
    },
    iconsStyle: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icons: {
        marginHorizontal: 3,
        color: '#ffffff'
    } 
};


export { Footer };
