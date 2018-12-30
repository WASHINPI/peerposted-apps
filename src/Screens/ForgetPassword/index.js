import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ajax from './../../utilities/ajax';
import styles from './styles';
import { Input, Button, Spinner } from './../../Components/common';
import smallLogo from '../../../public/images/smallLogo.png';


class ForgetPassword extends Component {

    constructor() {
        super();
        this.state = {
            initialLoading: true,
            email: '',
            loadingBtn: false
        };
    }


    onEmailChange = (item) => {
        this.setState({ email: item });
    }

    clickForgotBtn = async () => {
        if (this.state.email.length < 1) {
            ToastAndroid.show('Enter your email address.', ToastAndroid.SHORT);
            return false;
        }
        this.setState({
            loadingBtn: true
        });

        const response = await ajax.forgetPassword({ recovery_email: this.state.email });

        this.setState({
            loadingBtn: false
        });
        if (response.data === 1) {
            ToastAndroid.show('Please check your Email ', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Email Not Found ', ToastAndroid.SHORT);
        }  
    }

    render() {
        const { 
            container,
            logoContainer,
            logoText,
            login,
            loginText,
            customStyle
        } = styles;
        console.disableYellowBox = true;
        return (
                <KeyboardAwareScrollView contentContainerStyle={{paddingHorizontal: 25}}>
                <View style={container}>
                <Image resizeMode="contain" style={styles.logo} source={smallLogo} />
                <View style={logoContainer}>
                    
                    <Text style={logoText}>Forgot Password</Text> 
                </View>
                <View>
                    <Input 
                        placeholder={'Enter your email'}
                        onChangeText={(item) => this.onEmailChange(item)}
                        value={this.state.email}
                    />
                    {
                        this.state.loadingBtn ? 
                        <Spinner size='large' /> : 
                        <Button 
                            customStyle={customStyle} 
                            onPress={this.clickForgotBtn}
                        >Submit</Button>
                    }
                    
                    <View style={login}>
                        <Text style={loginText}>Have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={loginText}>Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </KeyboardAwareScrollView>
            
        );
    }
}

export default ForgetPassword;

