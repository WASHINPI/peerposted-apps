import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Center, Right, Left } from './../common';

class HeaderNav extends Component {
    static propTypes = {
        cartList: PropTypes.func.isRequired,
        travelerCartList: PropTypes.func.isRequired,
        profile: PropTypes.func.isRequired
    }
    
    render() {
        return (
            <View>
                <Header
                    backgroundColor='#ffffff'
                   leftComponent={<Left profile={this.props.profile} />}
                    centerComponent={<Center />}
                    rightComponent={<Right 
                            profile={this.props.profile} 
                            travelerCartList={this.props.travelerCartList} 
                            cartList={this.props.cartList}
                    />
                    }
                />
            </View>
        );
    }

}

export { HeaderNav };
