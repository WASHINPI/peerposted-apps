import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import ajax from './../../utilities/ajax';

import { ListItem, Spinner } from './../../Components/common';
import { HeaderNav, FooterNav } from './../../Components/nav';
import styles from './styles';

class Products extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true,
            error: false,
            page: 1
        };
        this.searchText = this.props.navigation.getParam('products');
    }


    async componentDidMount() {
        this.setState({ isLoading: true });
        const products = await ajax.fethchInitialProduct(this.searchText);
        if ('errors' in products) {
            this.setState({
                hasError: true,
                errMsg: products.errors,
                loading: false
            });
        }
        
        if ('data' in products) {
            this.setState({ products: products.data });
            this.setState({ isLoading: false });
        }
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
           this.makeRemoteRequest();
        });
    }
    makeRemoteRequest = async () => {
        const products = await ajax.fethchInitialProduct(this.searchText, this.state.page);
        if ('errors' in products) {
            this.setState({
                hasError: true,
                errMsg: products.errors,
                loading: false
            });
        }
        
        if ('data' in products) {
            this.setState({ products: [...this.state.products, ...products.data] });
            this.setState({ isLoading: false });
        }
    }
     // load product details
     productDetails = productId => {
        this.props.navigation.navigate('Product', { productId });
        return false;
    }

    cartList = () => {
        this.props.navigation.navigate('Cart');
     }
 
     travelerCartList = () => {
         this.props.navigation.navigate('TravelerCart');
     }
 
    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    // check status
    checkLoadingStatus = () => {
        const { body, headerText } = styles;
        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
          
        return (
            <View style={body}>
                <Text style={headerText}>eBay Catalog</Text>
                <FlatList
                    data={this.state.products}
                    renderItem={({ item, index }) => {
                        return (<ListItem 
                            key={item.id}
                            index={index}
                            data={item}
                            productDetails={this.productDetails} 
                        />);
                    }}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={3}
                /> 
            </View>
        );
    }


    render() {
        const { container } = styles;
        console.disableYellowBox = true;
        return (
            <View style={container}>
                <HeaderNav 
                    profile={this.openDrawer} 
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList} 
                />
                <View style={{ flex: 1 }}>
                    {this.checkLoadingStatus()}
                </View>
                <FooterNav activeRoute={'BUYER'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Products;
