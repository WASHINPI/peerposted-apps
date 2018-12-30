import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';
import { FooterNav } from './../../Components/nav';
import { Right, Spinner, Button } from './../../Components/common';

class Conformation extends Component {


    static navigationOptions={
        title: 'Confirmation',
    }

    constructor() {
        super();
        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }
    
    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    redirectOder = () => {
        this.props.navigation.navigate('MyOrders');
    }

    checkRenderContent = () => {
        if (this.state.isLoading) {
            return (
                <Spinner size='large' />
            );
        }

        const message = this.props.navigation.getParam('message');

        return (
            <View style={styles.body}>
               <View style={styles.confArea}>
                   <Text style={styles.successMsg}>{message}</Text>
                   <Button 
                        children='My Order'
                        onPress={() => this.redirectOder()}
                        customStyle={styles.customeStyle}
                   />
               </View>
                <Text style={styles.infoText} > General information of delivery and Shipping term & condition will described here.   </Text>
                <Text style={styles.infoText}>If you have any query please contact to our support (Contact details are on footer)</Text>
                <Text style={styles.thanksMsg}>Thanks</Text>
                <Text>Peerposted Team</Text>
               
                <Text style={styles.contact}>Contact</Text> 
                <View>
                    <Text style={styles.fontSizeItem}>Bangladesh Office </Text>
                    <Text style={styles.fontSizeItem}>House 60/B, Road 130, Gulshan 1, Dhaka, 1212, Bangladesh </Text>
                </View>
                <View>
                    <Text style={styles.fontSizeItem}>USA Office</Text>
                    <Text style={styles.fontSizeItem}>3379 Peachtree Road NE (Buckhead)</Text>
                    <Text style={styles.fontSizeItem}>Suite 555 Atlanta, GA 30326, USA</Text>
                </View>
            </View>
        );
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    { this.checkRenderContent() }    
                </View>
                <FooterNav activeRoute={'BUYER'} loadPage={this.loadPage} /> 
            </View>
            
        );
    }
}

export default Conformation;
