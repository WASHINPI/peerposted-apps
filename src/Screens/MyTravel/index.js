import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import { FooterNav, HeaderNav } from './../../Components/nav';
import { TravelItem, Spinner } from './../../Components/common';
import styles from './styles';
import ajax from '../../utilities/ajax';

class MyTravel extends Component {

    static navigationOptions = {
        header: null
    }

    constructor() {
        super();
        this.state = {
            myTravel: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        const travels = await ajax.fetchALlTravels();
        if (travels.status === 'success') {
            this.setState({
                isLoading: !this.state.isLoading,
                myTravel: travels.data.data
            });
        }
        
    }

    checkRenderContent = () => {
        if (this.state.isLoading) {
            return (
                <Spinner size='large' />
            );
        }
        return (
            <View>
                {
                    this.state.myTravel.length < 1 ? 
                        <Text style={{alignSelf: 'center', fontSize:20, marginTop:20}}>No Travel found</Text>
                    :
                    <FlatList
                        data={this.state.myTravel}
                        renderItem={({ item }) => {
                            return (
                                <TravelItem 
                                    key={item.id}
                                    myTravel={item}
                                />
                            );
                        }}
                    />
                }
            </View>
        );
    }

    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    travelerCartList = () => {
        this.props.navigation.navigate('TravelerCart');
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
                    {this.checkRenderContent()}
                </View>

                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
            </View>
        );
    }
}

export default MyTravel;
