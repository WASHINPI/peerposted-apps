import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import { Spinner } from './common';
import bgImage from './../../public/images/backgroundImg.jpg';
import logo from './../../public/images/logo.png';

class InitialComponent extends Component {
    render() {
        return (
            <ImageBackground source={bgImage} style={styles.backgroundImg}> 
                <Image resizeMode="contain" style={styles.logoImg} source={logo} />
                <Spinner size='large' />
            </ImageBackground>
        );
    }
}

const styles = {
    backgroundImg: {
        width: '100%', 
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        width: 300,
        height: 100,    
    }
};
export default InitialComponent;
