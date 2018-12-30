import React, { Component } from 'react';
import { View, Text, FlatList, ToastAndroid } from 'react-native';
import Moment from 'moment';
import { FooterNav, HeaderNavTwo } from './../../Components/nav';
import { Dropdown, BagItem, Spinner } from './../../Components/common';
import ajax from './../../utilities/ajax';
import styles from './styles';

class Request extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            myTravels: [],
            buyRequests: [],
            isLoading: true,
            selectedTravel: '',
            addCart: [],
            cartLoading: false,
            totalTravelerCart: 0,
            buyerCharge: 0
        };
    }

    async componentDidMount() {
        const buyRequest = await ajax.fetchBuyRequest();
        if (buyRequest.status === 'success') {
            const myTravels = buyRequest.my_travels.map(value => ({
                id: `${value.country_from.id}-${value.country_to.id}`,
                name: `${Moment(value.departure_date).format('MM/DD/YY')} | ${value.country_from.code}-${value.country_to.code}`    
            }));

            const travelerCart = await ajax.fetchAllTravelerCart();
            const totalCart = travelerCart.data.map(item => item.id);

            this.setState({
                myTravels,
                isLoading: !this.state.isLoading,
                addCart: [...totalCart],
                buyRequests: [...buyRequest.buy_requests],
                totalTravelerCart: totalCart.length,
                buyerCharge: buyRequest.buyer_charge_percentage
            });
        }  
    }

    onChangeTravel = (id) => {
        this.setState({
            selectedTravel: id
        });
    }

    addToTravelerCart = async (id) => {
        this.setState({
            cartLoading: true     
        });

        const result = await ajax.addToTravelerCart(id);

        if (result.status === 204) {
            this.setState({
                cartLoading: false,  
            });
        }

        if (result.status === 200) {
            await ajax.setTravelerCartCounter(result.quantity);
    
            this.setState({
                addCart: [...this.state.addCart, id],
                cartLoading: false, 
                updateTravelerCart: !this.state.updateTravelerCart,
                totalTravelerCart: result.quantity
            });
        }
        ToastAndroid.show(result.message, ToastAndroid.SHORT);
    }


    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    cartList = () => {
        this.props.navigation.navigate('Cart');
    }
    loadTravelrCart = () => {
        this.props.navigation.navigate('TravelerCart');
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    travelerCartList = () => {
        this.props.navigation.navigate('TravelerCart');
    }
    

    checkLoadingStatus = () => {
        if (this.state.isLoading) {
            return <Spinner size={'large'} />;
        } 
            return (
                <View>
                    {
                        this.state.myTravels.length < 1 ? 
                        <Text style={styles.headerText}> Add Travel first to choose your product.</Text>
                        :
                        <View>
                            <Text style={styles.headerText}>Requested Products</Text>
                            <Dropdown 
                                data={this.state.myTravels}
                                onValueChange={this.onChangeTravel}
                                selected={this.state.selectedTravel}
                                customStyle={{ marginHorizontal: 15 }}
                            /> 
                            <FlatList
                                data={this.state.buyRequests}
                                style={{ marginBottom: 190 }}
                                renderItem={this.renderRow}
                                extraData={this.state}
                                removeClippedSubviews={false}
                            />
                        </View>
                        
                    }
                </View>
            );  
    }

    renderRow = ({ item }) => {
        return (
            <BagItem 
                key={item.id}
                traverAddCart={this.addToTravelerCart}
                loadTravelrCart={this.loadTravelrCart}
                data={item}
                addCart={this.state.addCart}
                cartLoading={this.state.cartLoading}
                //travelerCommission={this.state.travelerCommission}
                buyerCharge={this.state.buyerCharge}
            />
        );
      };

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <HeaderNavTwo 
                    profile={this.openDrawer} 
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList}
                    totalTravelerCart={this.state.totalTravelerCart}
                /> 
                
                <View style={styles.body}>
                   {this.checkLoadingStatus()} 
                </View>
                <FooterNav activeRoute={'REQUEST'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default Request;
