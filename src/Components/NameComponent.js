import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Button } from './../Components/common';


class NameComponent extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onNameChange: PropTypes.func.isRequired,
        redirectLogin: PropTypes.func.isRequired,
        onPressBtn: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    }
    render() {
        const { 
            container,
            logoContainer,
            logoText,
            intoText,
            login,
            loginText,
            customStyle
        } = styles;
        return (
            <View style={container}>
                <View style={logoContainer}>
                    <Text style={logoText}>Awesome!!!</Text>
                    <Text style={logoText}>Let's get started</Text> 
                </View>
                <View>
                    <Text style={intoText}>I am </Text>
                    <Input 
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onNameChange}
                        value={this.props.name}
                    />

                    <Button 
                        customStyle={customStyle}
                        disabled={this.props.disabled} 
                        onPress={() => this.props.onPressBtn(2)}
                    >Next</Button>
                    <View style={login}>
                        <Text style={loginText}>Have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.redirectLogin()}>
                            <Text style={loginText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        padding: 15
    },
    logoContainer: {
        paddingVertical: 5,
        marginLeft: 15
    },
    logoText: {
        fontSize: 17,
        fontFamily: 'sans-serif-light'
    },
    intoText: {
        fontWeight: 'bold',
        marginLeft: 20
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15
    },
    loginText: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'
    },
    customStyle: {
        paddingHorizontal: 60
    }
};

export default NameComponent;

