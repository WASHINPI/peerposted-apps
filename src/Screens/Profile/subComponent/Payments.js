import React, { Component } from 'react';
import { Container, Content, Card } from 'native-base';
import { View, Text } from 'react-native';
import ajax from './../../../utilities/ajax';
import { priceDisplay } from './../../../utilities/utility';
import { Button, Spinner } from '../../../Components/common';


class Payments extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            buyer_paid_amount: 0,
            traveler_available_amount: 0,
            traveler_pending_amount: 0
        };
    }

    async componentDidMount() {
        const payout = await ajax.getPayout();
        console.log(payout);
        if (payout.status === 'success') {
            this.setState({
                isLoading: false,
                buyer_paid_amount: payout.buyer_paid_amount ? payout.buyer_paid_amount : 0,
                traveler_available_amount: payout.traveler_available_amount,
                traveler_pending_amount: payout.traveler_pending_amount ? payout.traveler_pending_amount : 0
            });
        }
    }


    renderContent = () => {
        if (this.state.isLoading) {
            return (<Spinner size='large' />);
        }
        return (
            <Container>
                <Content padder>
                    <Card>
                        <View style={styles.headerText}>
                            <Text style={{ fontSize: 20, color: '#FC7900' }}>Traveller Board</Text>
                        </View>
                        <View style={styles.area}>
                            <Text>Pending Amount</Text>
                            <Text style={styles.price}>{ priceDisplay(this.state.traveler_pending_amount)}</Text>
                        </View>

                        <View style={styles.area}>
                            <Text>Available Amount</Text>
                            <Text style={styles.price}>{ priceDisplay(this.state.traveler_available_amount)}</Text>
                        </View>

                        <Button 
                            onPress={this.props.openWithdraw}
                            children='Payout'
                            customStyle={styles.customeStyle}
                            textSize={styles.btnTextSize} 
                        />
                    </Card>
                    <Card>
                        <View style={styles.headerText}>
                            <Text style={{ fontSize: 20, color: '#FC7900' }}>Buyer Board</Text>
                        </View>
                        <View style={styles.area}>
                            <Text>Total Purchased</Text>
                            <Text style={styles.price}>{priceDisplay(this.state.buyer_paid_amount)}</Text>
                        </View>
                    </Card>
            </Content>
          </Container>
        );
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1, 
    },
    headerText: {
        flexDirection: 'row', 
        paddingVertical: 15,
        paddingHorizontal: 10, 
        borderBottomWidth: 1, 
        borderBottomColor: '#fc7900'
    },
    area: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 15 
    },
    price: {
        fontSize: 15, 
        fontWeight: 'bold'
    },
    customeStyle: {
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    
};

export default Payments;

