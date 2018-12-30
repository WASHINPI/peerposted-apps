import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { Container, Content, Card } from 'native-base';
import Moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Avatar } from 'react-native-elements';
import { Spinner, Input, Button, Dropdown } from './../../../Components/common';
import ajax from './../../../utilities/ajax';
import { baseUrl } from './../../../utilities/utility';

const options = {
    title: 'Select Avatar',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1
  };


class UserProfile extends Component {
    
    constructor() {
        super();
        this.state = {
            isLoading: true,
            profile: [],
            fromInput: false,
            firstname: '',
            lastname: '',
            phone_no: '',
            address: '',
            city: '',
            state: '',
            postcode: '',
            countryCode: '',
            country: [],
            profilePic: '',
            user_photo: '',
            publicUrl: baseUrl,
            isUpdateImage: false,
            btnLoading: false,

        };
    }

    async componentDidMount() {
        const profile = await ajax.getMyProfile();
        const country = await ajax.fetchAllCountry();
        if (profile.status === 'success') {
            this.setState({
                country,
                profile: profile.data,
                isLoading: false,
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
                phone_no: profile.data.contact,
                address: profile.data.address,
                city: profile.data.city,
                state: profile.data.state,
                postcode: profile.data.postcode,
                countryCode: profile.data.country.id,
                user_photo: this.state.publicUrl + profile.data.user_photo
            });
        }
    }

    onChangeFirstName = (event) => {
        this.setState({
            firstname: event
        });
    }

    onChangeLastName = (event) => {
        this.setState({
            lastname: event
        });
    }
    onChangeMobile = (event) => {
        this.setState({
            phone_no: event
        });
    }

    onChangeAddress = (event) => {
        this.setState({
            address: event
        });
    }

    onChangeCity = (event) => {
        this.setState({
            city: event
        });
    }

    onChangeState = (event) => {
        this.setState({
            state: event
        });
    }

    onChangePostCode = (event) => {
        this.setState({
            postcode: event
        });
    }

    onChangeCountry = (event) => {
        this.setState({
            countryCode: event
        });
    }

    selectPic = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log(response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              this.setState({
                profilePic: 'data:image/jpeg;base64,' + response.data,
              });
            }
        });
    }

    updateProfile = async () => {
        const inputData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            postcode: this.state.postcode,
            country_id: this.state.countryCode,
            phone_no: this.state.phone_no,
            picture: this.state.profilePic
        };
        this.setState({
            btnLoading: true
        });
        const result = await ajax.postUpdateProfile(inputData);
        console.log(result);
        if ('data' in result) {
            if (result.data.status === 'success') {
                this.setState({
                    firstname: result.data.data.firstname,
                    lastname: result.data.data.lastname,
                    address: result.data.data.address,
                    city: result.data.data.city,
                    state: result.data.data.state,
                    postcode: result.data.data.postcode,
                    countryCode: result.data.data.country_id,
                    phone_no: result.data.data.contact,
                    user_photo: this.state.publicUrl + result.data.data.user_photo,
                    btnLoading: false
                });
            }
            await ajax.setProfilePic(result.data.data.user_photo);
            ToastAndroid.show('Profile Update successfully!', ToastAndroid.SHORT);
        } else {
            this.setState({
                btnLoading: false
            });
            ToastAndroid.show('Please fill out all field ', ToastAndroid.SHORT);
        } 
    }

    openModal = () => {
        this.setState({
            fromInput: true
        });
    }

    closeModal = () => {
        this.setState({
            fromInput: false
        });
    }

    renderContent = () => {
        const { iconStyle } = styles;

        if (this.state.isLoading) {
          return (<Spinner size='large' />);
        }

        if (this.state.fromInput) {
            return (
                <Container>
                    <Content padder>
                        <Card>
                            <View style={styles.headerText}>
                                <Text style={{ fontSize: 20, color: '#FC7900' }}>Update Profile</Text>
                                <TouchableOpacity onPress={() => this.closeModal()}>
                                    <Icon style={iconStyle} name="close" size={30} />
                                </TouchableOpacity>
                            </View>
                            <Input 
                                onChangeText={this.onChangeFirstName}
                                value={this.state.firstname}
                                placeholder='First Name'
                            />

                            <Input 
                                onChangeText={this.onChangeLastName}
                                value={this.state.lastname}
                                placeholder='Last Name'
                            />

                            <Input 
                                onChangeText={this.onChangeMobile}
                                value={this.state.phone_no}
                                placeholder='Mobile'
                            />

                            <Input 
                                onChangeText={this.onChangeAddress}
                                value={this.state.address}
                                placeholder='Address'
                            />

                            <Input 
                                onChangeText={this.onChangeCity}
                                value={this.state.city}
                                placeholder='City'
                            />

                            <Input 
                                onChangeText={this.onChangeState}
                                value={this.state.state}
                                placeholder='State'
                            />
                                
                            <Input 
                                onChangeText={this.onChangePostCode}
                                value={this.state.postcode}
                                placeholder='Zip Code'
                            />

                            <Dropdown 
                                onValueChange={this.onChangeCountry}
                                data={this.state.country}
                                selected={this.state.countryCode}  
                            />
                            
                            <View style={{ justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 10 }}>
                                <TouchableOpacity onPress={this.selectPic}>
                                    <Text>Select Photo</Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.btnLoading ? 
                            <Spinner size='large' /> :
                            <Button 
                                onPress={this.updateProfile} 
                                customStyle={styles.customeStyle}
                                children={'Upate Profile'}
                                textSize={{ fontSize: 20 }}
                            />
                            }
                            <View style={{marginBottom:5}}></View>
                        </Card>
                    </Content>
                </Container>
            );
        }

        return (
            <Container>
            <Content padder>
              <Card>
                <View style={styles.headerText}>
                    <Text style={{ fontSize: 20, color: '#FC7900' }}>Welcome back !</Text>
                    <TouchableOpacity onPress={() => this.openModal()}>
                        <Icon style={iconStyle} name="pencil" size={30} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                    {this.state.isUpdateImage ? 
                    <Avatar
                        large
                        rounded
                        source={{ 
                                uri: this.state.user_photo
                            }}
                        onPress={() => console.log('Works!')}
                        activeOpacity={0.7}
                    /> :
                    <Avatar
                        large
                        rounded
                        source={{ 
                                uri: this.state.user_photo
                            }}
                        onPress={() => console.log('Works!')}
                        activeOpacity={0.7}
                    />
                }
                    <View style={{paddingLeft: 10}}>
                        <Text>Name</Text>
                        <Text note>{this.state.profile.name}</Text>
                    </View>
                </View>

                <View>
                        <View style={{paddingLeft: 15}}>
                            <Text>About Me </Text>
                            <Text>{this.state.profile.address}</Text>
                            <Text>Registered <Text style={{marginLeft: 20,paddingLeft:20}}>{ Moment(this.state.profile.created_at).format('MM/DD/YY') }</Text></Text>    
                        </View>
                </View>
                <View style={{paddingHorizontal:15}}>
                    <Icon name="map-marker" color="#FC7900" size={35} />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text>City</Text>
                            <Text>State</Text>
                            <Text>Zipcode</Text>
                            <Text>Country</Text>
                        </View>
                        <View style={{ marginLeft: 50 }}>
                            {/* <Text>{this.state.profile.address}</Text> */}
                            <Text>{this.state.profile.city}</Text>
                            <Text>{this.state.profile.state}</Text>
                            <Text>{this.state.profile.postcode}</Text>
                            <Text>{this.state.profile.country.name}</Text>
                        </View>
                    </View>
                    <View style={{marginBottom:15}}></View>
                    </View>
              </Card>
            </Content>
          </Container>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1, 
    },
    iconStyle: {
        color: '#FC7900'
    },
    headerText: {
        flexDirection: 'row', 
        paddingVertical: 15,
        paddingHorizontal: 15, 
        borderBottomWidth: 1, 
        borderBottomColor: '#FC7900',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    customeStyle: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginBottom: 25
    } 
    
};

export default UserProfile;

