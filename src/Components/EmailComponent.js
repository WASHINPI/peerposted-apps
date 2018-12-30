import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import PropTypes from 'prop-types';
import { Input, Button } from './../Components/common';


class EmailComponent extends Component {
    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        onEmailChange: PropTypes.func.isRequired,
        redirectLogin: PropTypes.func.isRequired,
        onPressBtn: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        disabled: PropTypes.bool
    }
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picked: null,
        };
    }

    onShow = () => {
        this.setState({ visible: true });
    }
    
    onSelect = (picked) => {
        this.props.changeCountryId(picked);
        this.setState({
            visible: false
        });
    }
    
    onCancel = () => {
        this.setState({
            visible: false
        });
    }

    renderContent = (id) => {
        if (id) {
            const country = this.props.countryList.find(item => item.id === id);
            return country.name;   
        }
        return 'Select Country'; 
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
        const { visible } = this.state;
        return (
            <View style={container}>
                <View style={logoContainer}>
                    <Text style={logoText}>Hi {this.props.name}</Text>
                    <Text style={logoText}>May we know your e-mail</Text> 
                </View>
                <View>
                    <Input 
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onEmailChange}
                        value={this.props.email}
                    />
                    <TouchableOpacity style={{ paddingLeft: 15, marginHorizontal: 15, borderBottomWidth: 0.5 }} onPress={this.onShow}>
                        <Text style={{ paddingVertical: 10, fontSize: 15 }}>{this.renderContent(this.props.country_id)}</Text>
                    </TouchableOpacity> 

                    <ModalFilterPicker
                        visible={visible}
                        onSelect={this.onSelect}
                        onCancel={this.onCancel}
                        options={this.props.countryList.map(item => ({ key: item.id, label: item.name }))}
                        renderCancelButton={() => console.log('render btn')}
                        optionTextStyle={{ fontSize: 12 }}
                    />

                    <Input 
                        placeholder={'Phone Number'}
                        onChangeText={this.props.onChangeMobile}
                        value={this.props.mobile}
                    />

                    <Button 
                        customStyle={customStyle}
                        disabled={this.props.disabled} 
                        onPress={() => this.props.onPressBtn(3)}
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

export default EmailComponent;

