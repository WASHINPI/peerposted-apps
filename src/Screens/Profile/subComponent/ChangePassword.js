import React, { Component } from 'react';
import { View, ToastAndroid } from 'react-native';
import ajax from './../../../utilities/ajax';
import { Container, Content, Card, Text } from 'native-base';
import { Button, Input } from '../../../Components/common';


class ChangePassword extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            firstname: '',
            password: '',
            lastname: '',
            country_id: '',
            phone_no: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''

        };
    }

    async componentDidMount() {
        const profile = await ajax.getMyProfile();
        if (profile.status === 'success') {
            this.setState({
                firstname: profile.data.firstname,
                password: this.state.newPasswrod,
                lastname: profile.data.lastname,
                country_id: profile.data.country.id,
                phone_no: profile.data.contact,
                isLoading: false   
            });
        }
    }
    onChangeOldPassword = (event) => {
        this.setState({
            oldPassword: event
        });
    }

    onChangeNewPassword = (event) => {
        this.setState({
            newPassword: event
        });
    }

    onChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event
        });
    }

    changePasswordInfo = async () => {
        console.log(this.state.newPassword.length);
        if (this.state.newPassword.length <= 8 ||  this.state.confirmPassword <= 8) {
            ToastAndroid.show('Password Musht be 8 cheracter', ToastAndroid.SHORT);
            return false;
        }

        if (this.state.newPassword !== this.state.confirmPassword) {
            ToastAndroid.show('Password and confirm password doesn\'t match', ToastAndroid.SHORT);
            return false;
        }

        const inputData = {
            firstname: this.state.firstname,
            password: this.state.newPasswrod,
            lastname: this.state.lastname,
            country_id: this.state.countryCode,
            phone_no: this.state.phone_no
        };

       const result = await ajax.postUpdateProfile(inputData);
        console.log(result);
        if ('data' in result) {
            if (result.data.status === 'success') {
                this.setState({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
            ToastAndroid.show('Password Change Successfully!', ToastAndroid.SHORT);
        } else {
            this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            ToastAndroid.show('Something went wrong please try again.', ToastAndroid.SHORT);
        } 
    }
    
    render() {
        const { passwordReset } = styles;

        return (
            <Container>
            <Content padder>
              <Card>
                    <View style={styles.headerText}>
                        <Text>Password</Text>
                    </View>
                
                    <View style={passwordReset}>
                        <Text>Please type your old password</Text>
                        <Text note>Password must contains 8 Character</Text>
                    </View>
                    <Input
                        secureTextEntry
                        onChangeText={this.onChangeOldPassword}
                        value={this.state.oldPassword} 
                        placeholder='Old Password' 
                    />
                    <Input
                        secureTextEntry
                        onChangeText={this.onChangeNewPassword}
                        value={this.state.newPassword} 
                        placeholder='New Password' 
                    />
                    <Input
                        secureTextEntry
                        onChangeText={this.onChangeConfirmPassword}
                        value={this.state.confirmPassword} 
                        placeholder='Confirm Password' 
                    />

                    <Button 
                        customStyle={{ alignSelf: 'center', borderRadius: 5 }} 
                        onPress={this.changePasswordInfo}
                    >Update</Button>
              </Card>
            </Content>
          </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1, 
    },
    iconStyle: {
        color: '#fff', 
        backgroundColor: '#FC7900',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
    },
    passwordReset: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 30 
    },
    footerContent: { 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 30, 
        marginBottom: 30 
    },
    headerText: {
        flexDirection: 'row', 
        paddingVertical: 15,
        paddingHorizontal: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#fc7900'
    }   
};

export default ChangePassword;

