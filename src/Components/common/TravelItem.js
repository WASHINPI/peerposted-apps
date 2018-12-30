import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Moment from 'moment';
import PropTypes from 'prop-types';


class TravelItem extends Component {
    
    static propTypes = {
        myTravel: PropTypes.object.isRequired
    }
    render() {
         const { body, title, address } = styles;
         const { airport_from, departure_date, airport_to, arrival_date } = this.props.myTravel;
        return (
            <View style={body}>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons 
                        name='airplane-takeoff' 
                        style={styles.iconStyle} 
                        size={35}
                        color={'#FC7900'} 
                    />
                </View>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={title}>Departure</Text>
                        <Text style={[address, { marginLeft: 10 }]}>{airport_from.name}</Text> 
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.title, { paddingRight: 27 }]}>Date</Text>
                        <Text style={styles.departureDate}>{ Moment(departure_date).format('MM/DD/YY') }</Text> 
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.title}>Destination</Text>
                        <Text style={address}>{ airport_to.name }</Text> 
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.title, { paddingRight: 35 }]}>Date</Text>
                        <Text style={{ margin: 5, fontSize: 12 }}>{ Moment(arrival_date).format('MM/DD/YY') }</Text>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = {
    body: {
        backgroundColor: '#F5F7FD',
        padding: 10,
        margin: 7,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FC7900' 
    },
    updateIcon: {
        flexDirection: 'row',
        flex: 1, 
        justifyContent: 'flex-end', 
        alignItems: 'center'
    },
    iconStyle: {
        color: '#FC7900',
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 12, 
        fontWeight: '500', 
        margin: 5 
    },
    address: {
        fontSize: 12, 
        margin: 5, 
        flex: 1
    },
    departureDate: { 
        marginVertical: 5, 
        fontSize: 12, 
        marginLeft: 10 
    }
};

export { TravelItem };
