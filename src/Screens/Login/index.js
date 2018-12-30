import React, { Component } from 'react';
import { Text, View, ImageBackground, Image, TouchableOpacity, Keyboard, AsyncStorage } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import styles from './styles';
import { Input, Button, Footer, Spinner } from './../../Components/common';
import ajax from './../../utilities/ajax';
import bgImage from './../../../public/images/backgroundImg.jpg';
import logo from './../../../public/images/logo.png';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            hasError: false,
            keyboardStatus: false,
            errMsg: ''
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
    
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    

    getUserInfo = async () => {
        const user = await ajax.login(this.state.email, this.state.password);

        console.log('getUserinfo', user);
        if ('errors' in user) {
            this.setState({
                hasError: true,
                errMsg: user.errors,
                loading: false
            });
            this.hideMessage();
        }
        if ('data' in user) {
            await ajax.setUserData(user.data);
            this.props.navigation.navigate('Splash');
        }
    }

    keyboardDidShow = () => {
        this.setState({
             keyboardStatus: true
        });
    }
    
    keyboardDidHide = () => {
        this.setState({
            keyboardStatus: false
        });
    }

    emailChange = (text) => {
        this.setState({
            email: text
        });
    }

    password = (text) => {
        this.setState({
            password: text
        });
    }

    login = () => {
        this.setState({
            loading: true
        });

        if (this.state.email.length < 1 && this.state.password.length < 1) {
            this.setState({
                hasError: true,
                errMsg: 'Email or Password required',
                loading: false
            }); 
            this.hideMessage();
            return false;
        } 
        this.getUserInfo();
    }

    hideMessage() {
        setTimeout(() => { 
            this.setState({
                hasError: false
            });
         }, 3000);   
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="large" />;
        } 
        return (
            <Button 
                onPress={this.login}
                children={'Login'}
                customStyle={styles.button}
            />
        );  
    }

    render() {
        console.disableYellowBox = true;
        return (
            <ImageBackground source={bgImage} style={styles.container}>
               <KeyboardAwareScrollView style={{ color: 'red' }}>
                <View style={styles.body}>
                    <Image resizeMode="contain" style={styles.logoImg} source={logo} />
                    <Text style={styles.textInput}>Someone's is waiting...</Text>
                    <Text style={styles.textInput}>Start helping him by log in</Text>
                    {this.state.hasError && <Text style={styles.errMsg}>{this.state.errMsg}</Text>}
                    <Input 
                        onChangeText={this.emailChange}
                        placeholder={'Email or Username'}
                        value={this.state.email}
                        customStyle={{ height: 40 }}
                    />
                    <Input 
                        secureTextEntry
                        onChangeText={this.password}
                        placeholder={'Password'}
                        value={this.state.password}
                        customStyle={{ height: 40 }}
                    />
                    {this.renderButton()}
                    <View style={[styles.forgetBtn, this.state.keyboardStatus && { paddingBottom: 40 }]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgetPassword')}>
                            <Text style={styles.forgetBtnText}>Forget Password</Text>
                        </TouchableOpacity>
                        <Text style={styles.forgetBtnText}>|</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                            <Text style={styles.forgetBtnText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                </KeyboardAwareScrollView>
                <Footer />
            </ImageBackground>
        );
    }
}

export default Login;
