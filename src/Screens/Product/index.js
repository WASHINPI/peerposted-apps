import React, { Component } from 'react';
import { 
    View, Text, Image, 
    ToastAndroid, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { Container, Content } from 'native-base';
import Modal from 'react-native-modal';
import ajax from './../../utilities/ajax';
import { priceDisplay } from './../../utilities/utility';
import styles from './styles';
import { Button, Spinner } from './../../Components/common';
import { FooterNav } from './../../Components/nav';


class Product extends Component {

    static navigationOptions={
        title: 'Details'
    }

    constructor(props) {
        super(props);
        this.state = {
            product: null,
            price: 0,
            isLoading: false,
            scrollOption: true,
            cartLoading: false,
            addCart: false,
            webLoading: false,
            imageIndex: 0,
            modalVisible: false,
            description: ''
        };
    }

   async componentDidMount() {
        const productId = this.props.navigation.getParam('productId');
        const product = await ajax.fetchProductDetails(productId);
        this.setState({
            isLoading: !this.state.isLoading,
            product: product.data,
            price: product.price,
            description: product.data.Description
        });
       // this.loadWebViewContent();
    }

    // loadWebViewContent() {
    //     setTimeout(() => { 
    //         this.setState({
    //             webLoading: true
    //         });
    //      }, 3000);   
    // }

    addToCart = async () => {
        this.setState({
            cartLoading: true     
        });

        const result = await ajax.addToCart(this.state.product, this.state.price);

        if (result.status === 204) {
            this.setState({
                cartLoading: false,  
            });
        }

        if (result.status === 200) {
            await ajax.setCartCounter(result.data.quantity);
    
            this.setState({
                addCart: true,
                cartLoading: false,  
            });
        }
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }

    deleteCart = async () => {
        this.setState({
            deleteCart: true
        });
        
        const result = await ajax.removeBuyerCart(this.state.cartId);
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
        
        this.setState({
            deleteCart: false
        });
    }

    modalVIsibility = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }


    goToCart = () => {
        this.props.navigation.navigate('Cart');
    }


    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    handleScroll = (event) => {
        if (event.nativeEvent.contentOffset.y > 260) {
            this.setState({
                scrollOption: false, 
            });
        } else {
            this.setState({
                scrollOption: true, 
            });
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

    checkLoadingStatus = () => {
        if (this.state.isLoading) {
            const { Title, PrimaryCategoryName, PictureURL, Description } = this.state.product;
            return (
                <View style={{ flex: 1, paddingHorizontal: 15, marginVertical: 15, }}>
                    <Image 
                        source={{ uri: PictureURL[this.state.imageIndex] }} 
                        style={[styles.image]}
                    />
                    <View style={styles.info}> 
                        <Text style={styles.title}>{Title}</Text>
                        <Text style={styles.category}>{PrimaryCategoryName}</Text> 
                        <View style={styles.footer}>
                            <Text style={styles.priceDesign}>{priceDisplay(this.state.price)}</Text>
                            { this.state.addCart ? (
                                <Button 
                                    onPress={() => this.goToCart()}
                                    children='Buyer Cart'
                                    customStyle={styles.customeStyle}
                                    textSize={styles.btnTextSize} 
                                />
                                ) : (
                                this.state.cartLoading ? 
                                    <Spinner size='large' /> :
                                    <Button 
                                        onPress={() => this.addToCart()}
                                        children='Add To Cart'
                                        customStyle={styles.customeStyle}
                                        textSize={styles.btnTextSize} 
                                    />
                                        
                                ) 
                            } 
                        </View>
                        <Button 
                            onPress={() => this.modalVIsibility()} 
                            customStyle={[styles.customeStyle, { alignSelf: 'flex-end', backgroundColor: '#3fbae4' }]}
                            textSize={styles.btnTextSize}
                            children='More Info'
                        />
                    </View>
                    {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        <WebView
                            scalesPageToFit={false}
                            automaticallyAdjustContentInsets={false}
                            javaScriptEnabled={false}
                            startInLoadingState
                            bounces={false}
                            source={{ html: Description }} 
                            style={{ height: 340 }}
                        /> 
                    </View> */}
                </View>
            );
        }

        return <Spinner size={'large'} />;
    }

    render() {
        const { container } = styles;
        console.disableYellowBox = true;
        return (
            <View style={{ flex: 1 }}>
                {/* <ScrollView 
                    style={container}
                    scrollEnabled={this.state.scrollOption} 
                    onScroll={this.handleScroll}
                > */}
                {/* </ScrollView> */}
                <View style={container}>
                    {this.checkLoadingStatus()}
                </View>
                 
                <Modal isVisible={this.state.modalVisible}>
                    {/* <View style={styles.modal}> */}
                    <Container>
                        <Content contentContainerStyle={{ flex: 1 }}>
                        <WebView
                            scalesPageToFit={false}
                           // startInLoadingState
                           // bounces={false}
                            source={{ html: this.state.description }} 
                           // style={{ height: 40 }}
                        /> 
                        <Button 
                            onPress={() => this.modalVIsibility()} 
                            customStyle={[styles.customeStyle, { alignSelf: 'center' }]}
                            children='Cancel'
                            textSize={styles.btnTextSize}
                        />
                        </Content>
                    </Container>
                </Modal> 
                <FooterNav activeRoute={'BUYER'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Product;
