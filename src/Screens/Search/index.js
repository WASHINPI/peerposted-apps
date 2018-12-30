import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import Modal from 'react-native-modal';
import { Input, Button, Spinner } from './../../Components/common';
import { HeaderNav, FooterNav } from './../../Components/nav';
import ajax from './../../utilities/ajax';
import styles from './styles';

// Images
import amazon from './../../../public/images/amazonImg.png';
import ebay from './../../../public/images/ebay.png';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            visible: false,
            modalVisible: false,
            amazonModal: false,
            ebayModal: false,
            customUrlModal: false,
            custom_link_note: '',
            url: '',
            btnVisible: false,
        };
    }

    changeSearchText = (event) => {
        this.setState({
            searchText: event
        });
    }
    changeUrlText = (event) => {
        this.setState({
            url: event
        });
    }

    changeCustomLinkeNote = (event) => {
        this.setState({
            custom_link_note: event
        });
    }

    changeAmazonModal = () => {
        this.setState({
            amazonModal: !this.state.amazonModal
        });
    }

    openEbayModal = () => {
        this.setState({
            ebayModal: !this.state.ebayModal
        });
    }

    cartList = () => {
        this.props.navigation.navigate('Cart');
     }
 
     travelerCartList = () => {
         this.props.navigation.navigate('TravelerCart');
     }

     openCustomUrlModal = () => {
         this.setState({
            customUrlModal: true
         });
     }
     closeCustomUrlModal = () => {
        this.setState({
            customUrlModal: false
         }); 
     }

     addToCart = async () => {
        this.setState({
            btnVisible: true
        });
        const result = await ajax.addToCartUrl(this.state.url, this.state.custom_link_note);
        if ('status' in result ) {
            this.setState({
                btnVisible: false,
                customUrlModal: false 
            });
            ToastAndroid.show('Your request has been sent to admin', ToastAndroid.SHORT);
        } else {
            this.setState({
                btnVisible: false,
            });
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }  
     }

    closneEbayModal = () => {
        this.setState({
            ebayModal: !this.state.ebayModal
        });
        ToastAndroid.show('redirecting product page', ToastAndroid.SHORT);
        this.props.navigation.navigate('Products');
    }

    searchResult = () => {
        if (this.state.searchText.length <= 0) {
            ToastAndroid.show('Please enter product name', ToastAndroid.SHORT);
            return false;
        }
        const products = this.state.searchText;

        this.props.navigation.navigate('Products', { products });
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }
    
    render() {
        console.disableYellowBox = true;
        const { searchTitle, customeStyle, vendorStyle, logo, btnTextSize, customeStyleOkBtn } = styles;
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav 
                    profile={this.openDrawer} 
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList} 
                />
                <View style={{ flex: 1 }}>
                    <Text style={searchTitle}>Product Search</Text>
                    <Input 
                        value={this.state.searchText} 
                        placeholder='Iphone 7' 
                        onChangeText={this.changeSearchText.bind(this)} 
                    />   
                    <Button 
                        onPress={this.searchResult.bind(this)} 
                        customStyle={customeStyle}
                        children={'Search'}
                        textSize={btnTextSize}
                    />
                    <Text style={searchTitle}>Product Vendor</Text>
                    <View style={vendorStyle}>
                        <TouchableOpacity onPress={() => this.changeAmazonModal()}>
                            <Image 
                                source={amazon} 
                                resizeMode="contain" 
                                style={[logo, styles.amazonLogo]} 
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.openEbayModal()} >
                            <Image 
                                source={ebay} 
                                resizeMode="contain" 
                                style={logo} 
                            />
                        </TouchableOpacity>
                        <Button 
                            children='Custom link'
                            customStyle={styles.customBtn}
                            onPress={this.openCustomUrlModal} 
                        />
                    </View>
                </View>
                <View style={{ margin: 20 }}>
                    <Modal isVisible={this.state.amazonModal}>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>Amazon product are coming soon. For now Add amazon product link at link option.</Text>
                            <Button 
                                onPress={() => this.changeAmazonModal()} 
                                customStyle={customeStyleOkBtn}
                                children={'OK'}
                                textSize={btnTextSize}
                            />
                        </View>
                    </Modal>
                    <Modal isVisible={this.state.ebayModal}>
                        <View style={styles.modal}>
                            <Text style={styles.modalText}>For your convenience, we display eBay products directly on our site which can be easily added to your Buyer Cart. You can also copy the URL from any other item on eBay and paste it in our Search bar for the same effect.</Text>
                            <Button 
                                onPress={() => this.closneEbayModal()} 
                                customStyle={customeStyleOkBtn}
                                textSize={btnTextSize}
                                children={'OK'}
                            />
                        </View>
                    </Modal>

                    <Modal isVisible={this.state.customUrlModal}>
                        <View style={styles.modal}>
                            <Input 
                                value={this.state.url} 
                                placeholder='Please insert your link' 
                                onChangeText={this.changeUrlText.bind(this)} 
                            />
                            <Input 
                                value={this.state.custom_link_note} 
                                placeholder='Any instruction how we should process your link' 
                                onChangeText={this.changeCustomLinkeNote.bind(this)} 
                            /> 
                            {this.state.btnVisible ? 
                            <Spinner size='large' /> :
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <Button 
                                    onPress={() => this.closeCustomUrlModal()} 
                                    customStyle={customeStyleOkBtn}
                                    textSize={btnTextSize}
                                    children={'close'}
                                />
                                <Button 
                                    onPress={() => this.addToCart()} 
                                    customStyle={customeStyleOkBtn}
                                    textSize={btnTextSize}
                                    children={'Save'}
                                />
                            </View>
                        }
                            
                        </View>
                    </Modal>

                </View>
                <FooterNav activeRoute={'SEARCH'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Search;
