import React, { Component } from 'react';
import { Image, View } from 'react-native';
import smallLogo from '../../../public/images/smallLogo.png';

class Center extends Component {
    
    render() {
        return (
            <View style={{ marginLeft: 50 }}>
                <Image resizeMode="contain" style={styles.logo} source={smallLogo} />
            </View>  
        );  
    }
}

const styles = {
    logo: {
        width: 35,
        height: 30
    },
};


export { Center };
