import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';

class Input extends Component {

    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onChangeText: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        secureTextEntry: PropTypes.bool,
        customStyle: PropTypes.object
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
        const { placeholder, onChangeText, value, customStyle, secureTextEntry } = this.props;
        const { input, inputFocus, inputBlur } = styles;

        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder={placeholder}   
                    style={[input, this.state.hasFocus ? inputFocus : inputBlur, customStyle]} 
                    onFocus={() => this.setFocus(true)}
                    onBlur={() => this.setFocus(false)}
                    onChangeText={(text) => onChangeText(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                />
            </View>
        );  
    }
}

const styles = {
   
    container: {
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    input: {
        height: 45,
        fontSize: 16,
        paddingLeft: 15,
        borderBottomWidth: 1,
    },
    inputFocus: {
        borderBottomColor: '#ff793a',
    },
    inputBlur: {
        borderBottomColor: '#D4D4D4',
    }
};


export { Input };
