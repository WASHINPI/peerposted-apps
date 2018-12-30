import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

import { Center, RightTwo, Left } from '../common';

class HeaderNavTwo extends Component {
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
                    rightComponent={<RightTwo 
                            profile={this.props.profile} 
                            travelerCartList={this.props.travelerCartList} 
                            cartList={this.props.cartList}
                            totalTravelerCart={this.props.totalTravelerCart}
                    />
                    }
                />
            </View>
        );
    }

}

const styles = { 
    left: {
        icon: 'dots-three-vertical', 
        type: 'entypo', 
        color: '#ff793a' 
    }
};

export { HeaderNavTwo };
