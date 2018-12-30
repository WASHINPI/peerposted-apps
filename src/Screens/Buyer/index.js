import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';
import { ListItem, Spinner } from './../../Components/common';
import { HeaderNav } from './../../Components/nav';
import styles from './styles';

class Buyer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            isLoading: true,
            error: false
        };
        this.searchText = this.props.navigation.getParam('products');
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.getProducts(this.searchText);
    }

    // Get All Products
    getProducts = textSearch => {
        const url = `http://pp3.doctors24.net/api/v1/products/search?q=${textSearch}`;
        axios.get(url)
        .then(res => {
            const products = res.data;
            this.setState({ products: products.data });
            this.setState({ isLoading: false });
        })
        .catch(() => {
              // handle error
            this.setState({ error: true });
        });
    }
     // load product details
     getProductDetails = id => {
        const product = this.state.products[id];
        this.props.navigation.navigate('ProductDetails', { product });
    }

    retryProduct = () => {
        this.setState({ error: false });
        this.setState({ isLoading: true });
        this.getProducts();
    }
    // check status
    checkLoadingStatus = () => {
        const { body, headerText } = styles;

        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
          
        return (
            <View>
                <Text style={headerText}>eBay Catalog</Text>
                <View style={body}>
                    <FlatList
                        data={this.state.products}
                        numColumns={2}
                        renderItem={({ item, index }) => {
                            return (<ListItem 
                                key={item.id}
                                index={index}
                                data={item}
                                productDetails={this.getProductDetails} 
                            />);
                        }}
                    />
                </View> 
            </View>
        );
    }


    render() {
        const { container, body } = styles;
        console.disableYellowBox = true;
        return (
            <View style={container}>
                <HeaderNav loadCart={() => console.log('success')} />
                <View style={body}>
                    {this.checkLoadingStatus()}
                </View>
                
            </View>
        );
    }
}

export default Buyer;
