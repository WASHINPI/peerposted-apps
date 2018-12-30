import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import ajax from './../../utilities/ajax';
import styles from './styles';
import { Spinner, OrderItem } from './../../Components/common';
import { FooterNav } from './../../Components/nav';


class MyOrders extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            activeTab: 1,
            buyer: [],
            traveler: []
        };
    }

    async componentDidMount() {
        const response = await ajax.fetchMyOrder();
        console.log(response);
        if (response.status === 'success') {
            this.setState({ 
                buyer: response.buys,
                traveler: response.travels,
                isLoading: false,
            });
        }   
    }

    cancelOrder = async (id) => {
        const data = await ajax.cancelTravelerOrder(id);
        if (data.status === 200) {
                this.setState({
                    traveler: this.state.traveler.filter(item => item.id !== id)
                });   
        }
       
       ToastAndroid.show(data.message, ToastAndroid.SHORT);
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    checkRenderContent = () => {
        const {  
            tabButton, 
            headerText,
            activeColor
        } = styles;

        if (this.state.isLoading) {
            return (
                <Spinner size='large' />
            );
        }

        return (
            <View>
                <View style={tabButton}>
                    <TouchableOpacity onPress={() => this.setState({ activeTab: 1 })}>
                        <Text style={[headerText, (this.state.activeTab === 1) && activeColor]}>Buyer Board</Text>
                    </TouchableOpacity>
                    <Text> | </Text>
                    <TouchableOpacity onPress={() => this.setState({ activeTab: 2 })}>
                        <Text style={[headerText, (this.state.activeTab === 2) && activeColor]}> Traveler Board</Text>
                    </TouchableOpacity>    
                </View> 
                {this.renderTab()}
            </View>
        );
    }

    renderTab = () => {
        if (this.state.activeTab === 1) {
            return (
                <View>
                    <FlatList
                        data={this.state.buyer}
                        renderItem={({ item }) => {
                        return (
                            <OrderItem 
                                key={item.id}
                                cart={item}
                                orderType={false}
                                cancelOrder={this.cancelOrder}
                            />
                            );
                        }
                    }
                    />
                </View>
            );
        }

        if (this.state.activeTab === 2) {
            return (
                <View>
                    <FlatList
                        data={this.state.traveler}
                        renderItem={({ item }) => {
                        return (
                            <OrderItem 
                                orderType
                                key={item.id}
                                cart={item}
                                cancelOrder={this.cancelOrder}
                            />
                            );
                        }
                    }
                    />
                </View>
            );
        }   
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    { this.checkRenderContent()}
                </View>
                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default MyOrders;
