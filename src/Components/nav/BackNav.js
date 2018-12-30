import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';

class BackNav extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    
    render() {
        return (
                <View style={[styles.body, this.props.customeStyle]}>
                    <Avatar
                        size="small"
                        rounded
                        source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
                        onPress={() => console.log('success')}
                        activeOpacity={0.7}
                        imageProps={{ borderColor: '#ff793a', borderWidth: 1 }}
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

export { BackNav };
