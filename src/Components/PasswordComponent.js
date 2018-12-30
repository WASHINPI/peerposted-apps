import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Input, Button, Spinner } from './../Components/common';


class PasswordComponent extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onPasswordChange: PropTypes.func.isRequired,
        onCpasswordChange: PropTypes.func.isRequired,
        redirectLogin: PropTypes.func.isRequired,
        onPressBtn: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        cpassword: PropTypes.string.isRequired,
        loading: PropTypes.bool.isRequired,
        disabled: PropTypes.bool
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        } 
        return (
            <Button 
                customStyle={styles.customStyle}
                disabled={this.props.disabled} 
                onPress={() => this.props.onPressBtn(3)}
            >Register</Button>
        );  
    }

    render() {
        const { 
            container,
            logoContainer,
            logoText,
            login,
            loginText
        } = styles;
        return (
            <View style={container}>
                <View style={logoContainer}>
                    <Text style={logoText}>Hi {this.props.name}</Text>
                    <Text style={logoText}>We have got your e-mail, {'\n'} just put a eight digit Password</Text> 
                </View>
                <View>
                    <Input 
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onPasswordChange}
                        value={this.props.password}
                        secureTextEntry
                    />

                    <Input 
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onCpasswordChange}
                        value={this.props.cpassword}
                        secureTextEntry
                    />

                    {this.renderButton()}
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
        fontSize: 15,
        fontFamily: 'sans-serif-light'
    },
    login: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 15,
        marginTop: 10,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-light'
    },
    customStyle: {
        paddingHorizontal: 40
    }
};

export default PasswordComponent;

