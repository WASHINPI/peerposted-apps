import React, { Component } from 'react';
import { View, Image, Text, ToastAndroid } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import debounce from 'lodash.debounce';
import { Footer, Spinner } from './../../Components/common';
import ajax from './../../utilities/ajax';

import styles from './styles';
import smallLogo from '../../../public/images/smallLogo.png';

import NameComponent from './../../Components/NameComponent';
import EmailComponent from './../../Components/EmailComponent';
import PasswordComponent from './../../Components/PasswordComponent';


class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            country_id: '',
            countryList: [],
            contact: '',
            cpassword: '',
            pageStatus: 1,
            loading: false,
            hasError: false,
            errMsg: '',
            isLoading: true,
            inValidEmail: false,
        };
    }

    async componentWillMount() {
        const response = await ajax.fetchPublicCountry();
        console.log(response);
        this.setState({
            countryList: [...response.data],
            isLoading: false
        });
    }

    onPressNameBtn = (pageId) => {
        if (this.state.name.length < 1) {
            ToastAndroid.show('Please Enter Your Name', ToastAndroid.SHORT);
            return false;
        }
        this.setState({
            pageStatus: pageId
        });
    }

    onPressEmailBtn = (pageId) => {
        console.log(this.state.inValidEmail);
        if (this.state.inValidEmail) {
            ToastAndroid.show('Please add Valid Email', ToastAndroid.SHORT);
            return false;
        }
        if (this.state.email.length < 1) {
            ToastAndroid.show('Email is required.', ToastAndroid.SHORT);
            return false;
        }

        if (this.state.country_id.length < 1) {
            ToastAndroid.show('Country is requried.', ToastAndroid.SHORT);
            return false;
        }

        if (this.state.contact.length < 1) {
            ToastAndroid.show('Mobile number is required', ToastAndroid.SHORT);
            return false;
        }
        
        this.setState({
            pageStatus: pageId
        });
    }

    postSignup = async () => {
        const { email, name, password, contact, country_id } = this.state;
        const user = await ajax.singup(email, password, name, contact, country_id);
        console.log(user);
        if (user.status === 'failed') {
            this.setState({
                hasError: true,
                errMsg: user.message[0],
                loading: false,
                password: '',
                cpassword: '',
            });
            this.hideMessage();
        }

        if (user.status === 'success') {
            this.setState({
                loading: false,
                name: '',
                email: '',
                password: '',
                cpassword: ''

            });
            await ajax.setUserData(user);
            ToastAndroid.show('Sign up successfully !', ToastAndroid.SHORT);
            this.props.navigation.navigate('Splash');
        }
        return false;
    }
    

    checkEmail = async () => {
        const { email, name, password } = this.state;
        const user = await ajax.singup(email, password, name);
        console.log(user);
        if (user.status === 'failed') {
            if (user.message.length >= 2) {
                if (user.message[0].indexOf('Email') >= 0) {
                    this.setState({
                        hasError: true,
                        errMsg: user.message[0],
                        loading: false,
                        pageStatus: 2,
                        inValidEmail: true,
                    });
                }

                if (user.message[1].indexOf('This email') >= 0) {
                    this.setState({
                        hasError: true,
                        errMsg: user.message[1],
                        loading: false,
                        inValidEmail: true,
                        pageStatus: 2,
                    });
                }
                this.hideMessage();
            } else {
                this.setState({
                    inValidEmail: false,
                });
            }
        }
        return false;
    }

    debounceCheckEmail = debounce(this.checkEmail, 2000)

    singUpBtn = () => {
        if (this.state.password.length < 7 || this.state.cpassword.length < 7) {
            ToastAndroid.show('Please Enter 8 digit Password', ToastAndroid.SHORT);
            return false;   
        }
        this.setState({
            loading: true
        });
        this.postSignup();
        return false;
    }


    changeName = (name) => {
        this.setState({
            name
        });
    }
    changeEmail = (email) => {
        this.setState({
            email
        }, () => {
            this.debounceCheckEmail();
        });
    }
    changePassword = (password) => {
        this.setState({
            password
        });
    }

    changeConfPassword = (cpassword) => {
        this.setState({
            cpassword
        });
    }

    changeMobile = (mobile) => {
        this.setState({
            contact: mobile
        });
    }

    changeCountryId = (countryId) => {
        this.setState({
            country_id: countryId
        });
    }

    redirectToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    hideMessage() {
        setTimeout(() => { 
            this.setState({
                hasError: false
            });
         }, 5000);   
    }


    renderConmponent() {
        if (this.state.isLoading) {
            return <Spinner size='large' />
        }

        if (this.state.pageStatus === 1) {
            return (
                <NameComponent
                    name={this.state.name}
                    placeholder={'Name'}
                    onNameChange={this.changeName}
                    redirectLogin={this.redirectToLogin}
                    onPressBtn={this.onPressNameBtn}
                />
            );
        } else if (this.state.pageStatus === 2) {
            return (
                    <EmailComponent 
                        name={this.state.name}
                        email={this.state.email}
                        mobile={this.state.contact}
                        placeholder={'Enter Email'}
                        onEmailChange={this.changeEmail}
                        onChangeMobile={this.changeMobile}
                        redirectLogin={this.redirectToLogin}
                        onPressBtn={this.onPressEmailBtn}
                        countryList={this.state.countryList}
                        country_id={this.state.country_id}
                        changeCountryId={this.changeCountryId}
                    />
                );
        } else if (this.state.pageStatus === 3) {
            return (
                <PasswordComponent 
                        name={this.state.name}
                        password={this.state.password}
                        cpassword={this.state.cpassword}
                        placeholder={'********'}
                        onPasswordChange={this.changePassword}
                        onCpasswordChange={this.changeConfPassword}
                        redirectLogin={this.redirectToLogin}
                        onPressBtn={this.singUpBtn}
                        loading={this.state.loading}
                />
            );
        }
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{paddingHorizontal: 25}}>
                    <Image resizeMode="contain" style={styles.logo} source={smallLogo} />
                    {this.state.hasError && <Text style={styles.errMsg}>{this.state.errMsg}</Text>}
                    {this.renderConmponent()}
                    </KeyboardAwareScrollView>
                <Footer />
            </View>
        );
    }
}

export default Signup;
