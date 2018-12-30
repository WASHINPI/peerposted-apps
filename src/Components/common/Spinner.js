import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

class Spinner extends Component {
    
    static propTypes = {
        size: PropTypes.string.isRequired
    };

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <ActivityIndicator size={this.props.size} color="#ff793a" />
            </View>
        );
    }
}

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export { Spinner };
