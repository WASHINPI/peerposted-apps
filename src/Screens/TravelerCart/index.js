import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import ajax from './../../utilities/ajax';
import { BD } from './../../utilities/utility';
import { Spinner, Button, CartItem, Dropdown, Input, SingleRight } from './../../Components/common';
import { FooterNav } from './../../Components/nav';
import styles from './styles';


class TravelerCart extends Component {
    
    static navigationOptions= ({ navigation }) => ({
        title: 'Traveler Bag',
        headerRight: <SingleRight profile={() => navigation.openDrawer()} />
    })

    
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            isLoading: true,
            modalVisible: false,
            address: '',
            distict: '',
            postCode: '',
            mobile: '',
            requestTypes: 1,
            btnLoading: false 
        };
    }

    async componentDidMount() {
        const response = await ajax.fetchAllTravelerCart();
        console.log(response);
        this.setState({ 
            cart: response.data,
            isLoading: false,
        });
    }

    // get Input value
    onChangeAddress = (address) => {
        this.setState({ address });
       
    }

    onChangeDistict = (distict) => {
        this.setState({ distict });
       
    }

    onChangePostCode = (postCode) => {
        this.setState({ postCode });
        
    }

    onChangeMobile = (mobile) => {
        this.setState({ mobile });
    }

    // check drop down input value
    onValueChange = (value) => {
        this.setState({
            countryId: value
        });
    }

    onRequestTypeChange = (requestTypes) => {
        this.setState({
            requestTypes
        });
    }

    deleteCart = async (cartId) => {
        const data = await ajax.removeTravelerCart(cartId);
        
        if (data.status === 200) {
             this.setState({
                 cart: this.state.cart.filter(item => item.id !== cartId)
             });
            await ajax.setTravelerCartCounter(data.quantity);
        }
        
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
     }

    checkoutCart = async () => {
        const { address, distict, postCode, mobile } = this.state;
        if (this.state.requestTypes === 2) {
            if (address.length < 1 || distict.length < 1 || postCode.length < 1 || mobile.length < 1) {
                ToastAndroid.show('All Fields are require', ToastAndroid.SHORT);
                return false;
            }
        }

        this.setState({
            btnLoading: true
        });

        const inputData = {
            product_id: this.state.cart.map(item => item.id),
            to_country_id: 17,
            to_address: this.state.address,
            to_state: this.state.distict,
            to_zip: this.state.postCode,
            to_phone: this.state.mobile,
            to_office: this.state.requestTypes === 1 ? 'Gulshan Office ' : '---',
        };

        const result = await ajax.travelerCheckOut(inputData);

        if (result.data === undefined) {
            this.setState({
                btnLoading: false
            });
            ToastAndroid.show('Please insert correct information', ToastAndroid.SHORT);
        } else {
            await ajax.setTravelerCartCounter(0);
            ToastAndroid.show('checkout successfully', ToastAndroid.SHORT);
            this.props.navigation.navigate('Conformation', { message: 'Product Confirmed' });
        }
    }

    checkoutCartWithOffice = () => {
        this.setState({
            modalVisible: false
        });
        ToastAndroid.show('checkout successfully', ToastAndroid.SHORT);
        this.props.navigation.navigate('Conformation');
    }

    // hide and show modal
    modalVIsibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    // check status
    checkLoadingStatus = () => {
        const { addAddressBtn, totalPriceArea, body } = styles;
    
        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
        return (
            <View style={body}>
                <FlatList
                    data={this.state.cart}
                    renderItem={({ item }) => {
                        return (
                            <CartItem 
                                key={item.id}
                                cart={item}
                                deleteCart={this.deleteCart}
                                btnLoading={this.state.btnLoading}
                            />
                        );
                    }}
                />
                <View style={[totalPriceArea]}>
                    <View>
                        <Button 
                            onPress={() => this.modalVIsibility()} 
                            customStyle={addAddressBtn}
                            textSize={{ fontSize: 15 }}
                        >Confirm Checkout</Button>
                    </View>
                </View> 
            </View>
        );
    }
  

    render() {
        const { container } = styles;
        console.disableYellowBox = true;
        return (
            <View style={container}>
                <View style={{ flex: 1 }}>
                {this.checkLoadingStatus()}
                <Modal isVisible={this.state.modalVisible}>
                    <View style={styles.modal}>
                        
                        <Text style={styles.modalText}>Addresss</Text>
                        <Dropdown 
                            onValueChange={this.onRequestTypeChange} 
                            data={[
                                { id: 1, name: 'Ship To Office' }, 
                                { id: 2, name: 'Pick Up Request' }]
                            }
                            selected={this.state.requestTypes} 
                        />
                        {this.state.requestTypes === 2 ?
                        <View style={{ marginTop: 10 }}>
                            <Dropdown 
                                onValueChange={this.onValueChange} 
                                data={BD}
                                selected={17} 
                            />
                            <Input 
                                onChangeText={this.onChangeAddress}
                                value={this.state.address}
                                placeholder='Address'
                            />
                            <Input
                                onChangeText={this.onChangeDistict}
                                value={this.state.distict} 
                                placeholder='Distict'
                            />
                            <Input
                                onChangeText={this.onChangePostCode}
                                value={this.state.postCode} 
                                placeholder='zip code'
                            />
                            <Input
                                onChangeText={this.onChangeMobile}
                                value={this.state.mobile} 
                                placeholder='Mobile'
                            />
                        </View>
                        :
                        <View>
                            <Text style={{ fontSize: 17, marginTop: 10 }}>Office Address</Text>
                            <Text style={{ fontSize: 15, marginVertical: 10 }}>House 60/B, Road 130, Gulshan 1, Dhaka 1212, Bangladesh</Text>
                        </View> 
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            
                            <Button 
                                onPress={() => this.modalVIsibility()} 
                                customStyle={styles.addAddressBtn}
                                children={'Close'}
                            />
                            {  this.props.btnLoading ? 
                                <Spinner size='small' /> :
                                <Button 
                                    onPress={this.checkoutCart} 
                                    customStyle={styles.addAddressBtn}
                                    children={'Checkout'}
                                />
                            }
                        </View>
                    </View>
                </Modal>
                </View>
                <FooterNav activeRoute={'TRAVEL'} loadPage={this.loadPage} />
            </View>
        );
    }
}
export default TravelerCart;
