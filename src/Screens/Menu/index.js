import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Content } from 'native-base';

export const SideBar = (props) => { 

    var copyprops = Object.assign({}, props); 
    copyprops.items = copyprops.items.filter(item => item.key !== 'login'); 
        return (
            <ScrollView>
                <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                </SafeAreaView>
            </ScrollView>
        );
        //return (
            // <ScrollView>
            //     <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('Dashboard')}>
            //             <Text style={styles.navText}>Dashboard</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('Profile')}>
            //             <Text style={styles.navText}>My Profile</Text>
            //         </TouchableOpacity>
            //         {/* need to change this route */}
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('MyTravel')}>
            //             <Text style={styles.navText}>My Inbox</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('MyOrders')}>
            //             <Text style={styles.navText}>My Orders</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('Withdraw')}>
            //             <Text style={styles.navText}>Withdraw money</Text>
            //         </TouchableOpacity>
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('Profile')}>
            //             <Text style={styles.navText}>Payout money</Text>
            //         </TouchableOpacity>
            //         {/* Need to change this page */}
            //         <TouchableOpacity style={styles.nav} onPress={() => this.props.navigation.navigate('MyTravel')}>
            //             <Text style={styles.navText}>Logout</Text>
            //         </TouchableOpacity>
            //     </SafeAreaView>
            // </ScrollView>
        //);
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    nav: {
        padding: 15
    },
    navText: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 15
    }
};
