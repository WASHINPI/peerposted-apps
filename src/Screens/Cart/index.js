import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import ajax from './../../utilities/ajax';
import { priceDisplay, BD, USA } from './../../utilities/utility';
import { Spinner, Button, CartItem, Dropdown, Input } from './../../Components/common';
import { FooterNav } from './../../Components/nav';
import styles from './styles';


class Cart extends Component {
    
    static navigationOptions={
        title: 'Buyer Cart',
    }

    
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            isLoading: true,
            modalVisible: false,
            country: [],
            address: '',
            distict: '',
            postCode: '',
            buttonVisible: true,
            bd: BD,
            usa: USA,
            usaCountryId: 228,
            bdCountryId: 17, 
            btnLoading: false,
            loadWebView: false,
            cartResponse: '', 
        };
    }

    async componentDidMount() {
        const response = await ajax.fetchAllCart();
        await ajax.setCartCounter(response.length);
        this.setState({ 
            cart: response,
            isLoading: false
        });
    }

    // get Input value
    onChangeAddress = (address) => {
        this.setState({ address });
        this.checkButtonStatus();
    }

    onChangeDistict = (distict) => {
        this.setState({ distict });
        this.checkButtonStatus();
    }

    onChangePostCode = (postCode) => {
        this.setState({ postCode });
        this.checkButtonStatus();
    }

    // check drop down input value
    onValueChange = (value) => {
        this.setState({
            countryId: value
        });
    }

    
    onNavigationStateChange = async (onNavigationStateChange) => {
        const result = onNavigationStateChange.url.match('payment/confirmation');
        if (result) {
            await ajax.setCartCounter(0);
            ToastAndroid.show('Payment successfully!', ToastAndroid.SHORT);
            this.props.navigation.navigate('Conformation', { message: 'Payment Successfully !' });
        }
    }

    checkoutCart = async () => {
        const { address, distict, postCode } = this.state;

        if (address.length < 1 || distict.length < 1 || postCode.length < 1) {
            ToastAndroid.show('Please fill out this field', ToastAndroid.SHORT);
            return false; 
        }

        const inputData = {
            title: this.state.cart.map(item => item.title),
            price: this.state.cart.map(item => item.price),
            url: this.state.cart.map(item => item.url),
            image: this.state.cart.map(item => item.image),
            description: this.state.cart.map(() => '---'),
            from_country_id: this.state.usaCountryId,
            from_address: '---',
            from_state: '---',
            from_zip: '---',
            to_country_id: this.state.bdCountryId,
            to_address: this.state.address,
            to_state: this.state.distict,
            to_zip: this.state.postCode,
            quantity: 1
        };
        this.setState({
            btnLoading: true
        });

        const cartResponse = await ajax.postCheckOutBuyerCart(inputData);
        
        this.setState({
            btnLoading: false,
            modalVisible: false,
            loadWebView: true,
            webViewData: cartResponse.gateway_url
        });
    }

    deleteCart = async (cartId) => {
        const data = await ajax.removeBuyerCart(cartId);
        if (data.status === 200) {
             this.setState({
                 cart: this.state.cart.filter(item => item.id !== cartId)
             });
            await ajax.setCartCounter(data.quantity);
        }
        
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }

    // hide and show modal
    modalVIsibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }
    // Footer nav event
    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }


    checkButtonStatus = () => {
        const { address, distict, postCode } = this.state;
        
        if (address.length < 1 && distict.length < 1 && postCode.length < 1) {
            return false; 
        }
    }

    // check status
    checkLoadingStatus = () => {
        const { addAddressBtn, totalPriceArea, body } = styles;
        // eslint-disable-next-line radix
        const totalCartPrice = this.state.cart.reduce((ace, cur) => ace + parseInt(cur.price), 0);
    
        if (this.state.loadWebView) {
            return ( 
                <View style={{ height: 400 }}>
                    <WebView
                        scalesPageToFit={false}
                        bounces={false}
                        source={{ uri: this.state.webViewData }} 
                        onMessage={m => console.log(m)} 
                        onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                        startInLoadingState={false}
                    />
                </View>
                );
        }

        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
        return (
            <View style={body}>
                <FlatList
                    data={this.state.cart}
                    renderItem={({ item }) => {
                        return (<CartItem 
                            btnLoading={this.state.btnLoading} 
                            deleteCart={this.deleteCart} 
                            cart={item} 
                        />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={totalPriceArea}>
                    <View>
                        <Text style={styles.priceTitle}>Price Total</Text>
                        <Text style={styles.totalPrice}>{priceDisplay(totalCartPrice)}</Text>
                    </View>
                    <View>
                        
                        <Button 
                            onPress={() => this.modalVIsibility()} 
                            customStyle={addAddressBtn}
                        >Add Address</Button>
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
                            <Text style={styles.modalText}>From</Text>
                            <Dropdown 
                                onValueChange={() => console.log('changed')}
                                data={this.state.usa}
                                selected={this.state.usaCountryId}
                                enabled={false}  
                            />
                            <Text style={styles.modalText}>To</Text>
                            <Dropdown 
                                onValueChange={this.onValueChange} 
                                data={this.state.bd}
                                selected={this.state.bdCountryId}
                                enabled={false} 
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                
                                <Button 
                                    onPress={() => this.modalVIsibility()} 
                                    customStyle={styles.addAddressBtn}
                                    children={'Continue Shopping'}
                                    textSize={{ fontSize: 15 }}
                                />
                                {
                                    this.state.btnLoading ? 
                                    <Spinner size='small' /> :
                                    <Button 
                                        onPress={this.checkoutCart}
                                        textSize={{ fontSize: 15 }}
                                        children={'Checkout'}
                                        customStyle={styles.checkoutBtn}
                                    />
                                }
                                
                            </View>
                        </View>
                    </Modal> 
                </View>
                <FooterNav activeRoute={'BUYER'} loadPage={this.loadPage} /> 
            </View>
        );
    }
}

export default Cart;
