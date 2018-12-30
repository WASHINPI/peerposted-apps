import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import { Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
import getTheme from './../../../native-base-theme/components';
import commonColor from './../../../native-base-theme/variables/commonColor';
import travel from '../../../public/images/travel.png';
import shopping from './../../../public/images/shopping.png';
import buyerRequest from './../../../public/images/request.png';

class FooterNav extends Component {
    static propTypes = {
        loadPage: PropTypes.func.isRequired,
        activeRoute: PropTypes.string
    }
    
    render() {
        const { activeText, textStyle, imgStyle, activeImage } = styles;
        return (
                <StyleProvider style={getTheme(commonColor)}>
                    <Footer>
                        <FooterTab>
                            <Button vertical active={this.props.activeRoute === 'DASHBOARD' && true} onPress={() => this.props.loadPage('Dashboard')}>
                                <Icon name="ios-options" />
                                <Text style={(this.props.activeRoute === 'DASHBOARD') ? activeText : textStyle}>DASHBOARD</Text>
                            </Button>

                            <Button 
                                active={this.props.activeRoute === 'TRAVEL' && true}
                                vertical 
                                onPress={() => this.props.loadPage('AddTravel')}
                            >
                                <Image 
                                    resizeMode="contain" 
                                    style={(this.props.activeRoute === 'TRAVEL') ? activeImage : imgStyle}
                                    source={travel} 
                                />
                                <Text style={(this.props.activeRoute === 'TRAVEL') ? activeText : textStyle}>TRAVEL</Text>
                            </Button>
                            <Button 
                                active={this.props.activeRoute === 'SEARCH' && true}
                                vertical
                                onPress={() => this.props.loadPage('Search')} 
                            >
                                <Icon active name="ios-search" />
                                <Text style={(this.props.activeRoute === 'SEARCH') ? activeText : textStyle}>SEARCH</Text>
                            </Button>
                        
                            <Button 
                                active={this.props.activeRoute === 'BUYER' && true}
                                vertical 
                                onPress={() => this.props.loadPage('Products')} 
                            >
                                <Image 
                                    resizeMode="contain"
                                    style={(this.props.activeRoute === 'BUYER') ? activeImage : imgStyle}
                                    source={shopping} 
                                />
                                <Text style={(this.props.activeRoute === 'BUYER') ? activeText : textStyle}>BUYER</Text>
                            </Button>
                            <Button 
                                active={this.props.activeRoute === 'REQUEST' && true}
                                vertical 
                                onPress={() => this.props.loadPage('Request')} 
                            >
                                <Image 
                                    resizeMode="contain" 
                                    style={(this.props.activeRoute === 'REQUEST') ? activeImage : imgStyle}
                                    source={buyerRequest} 
                                />
                                <Text style={(this.props.activeRoute === 'REQUEST') ? activeText : textStyle}>REQUEST</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
            </StyleProvider> 
        );
    }

}


const styles = {
    textStyle: {
       color: '#fc7900',
       fontSize: 10
    },
    imgStyle: {
        width: 20, 
        height: 25, 
        tintColor: '#FC7900'
    },
    activeText: {
        fontSize: 10,
        color: '#fff'
    },
    activeImage: {
        width: 20, 
        height: 25, 
        tintColor: '#ffffff'
    }
    
};

export { FooterNav };
