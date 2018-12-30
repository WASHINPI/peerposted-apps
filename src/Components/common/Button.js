import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';

class Button extends Component {

    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired,
        onPress: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
        customStyle: PropTypes.object,
        textSize: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false
        };
    }

    setFocus = (hasFocus) => {
        this.setState({ hasFocus });
    }
    
    render() {
        const { container, btnLogin, text } = styles;
        const { children, onPress, customStyle, textSize } = this.props; 
        

        return (
            <View style={container}>
                <TouchableOpacity 
                    disabled={this.props.disabled} 
                    onPress={() => onPress()} 
                    style={[btnLogin, customStyle]}
                >
                    <Text style={[text, textSize]}>{children}</Text>
                </TouchableOpacity>
            </View>
        );  
    }
}

const styles = {
   
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogin: {
        borderRadius: 20,
        fontSize: 18,
        backgroundColor: '#fc7900',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        margin: 5
        
    },
    text: {
        color: 'white',
        fontSize: 20, 
    },
};


export { Button };
