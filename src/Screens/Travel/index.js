import React, { Component } from 'react';
import { Text, View, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import ModalFilterPicker from 'react-native-modal-filter-picker';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import { Container, Content } from 'native-base';
import styles from './styles';
import ajax from './../../utilities/ajax';
import { USAAIRPORTLIST } from './../../utilities/airportlist';
import { USA, BD, BDAIRPORT } from './../../utilities/utility';
import { HeaderNav, FooterNav } from './../../Components/nav';
import { Button, Dropdown, Spinner, Datepicker } from './../../Components/common';

class AddTravel extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            bangladesh: BD,
            usa: USA,
            depCountryId: 228,
            depAirportId: '',
            destCountryId: 17,
            destAirportId: '',
            arivalDate: '',
            departureDate: '',
            buttonVisible: true,
            activeTab: 1,
            btnLoading: false,
            visible: false
        };
        console.log(USAAIRPORTLIST);
    }

    onDepAirportChange = (airportId) => {
        this.setState({ 
            depAirportId: airportId,
        });
    }

    onDestAirportChange = (airport) => {
        this.setState({ 
            destAirportId: airport
        });
    }
    
    addNewTravel = async () => {
        if (this.state.departureDate.length < 1 || this.state.arivalDate.length < 1) {
            ToastAndroid.show('Please instert date ', ToastAndroid.SHORT);
            return false;
        }
        this.setState({
            btnLoading: true
        });

        const data = {
            country_from: this.state.depCountryId,
            airport_from: this.state.depAirportId,
            country_to: this.state.destCountryId,
            airport_to: this.state.destAirportId,
            departure_date: this.state.departureDate,
            arrival_date: this.state.arivalDate
        };
        console.log(data);
        const result = await ajax.addNewTravle(data);
        console.log(result);
        if (result.data === undefined) {
            this.setState({
                btnLoading: false
            });
            ToastAndroid.show('Please check dates.', ToastAndroid.SHORT);
            return false;
        } 
        if (result.data.status === 'success') {
            this.setState({
                btnLoading: false,
                activeTab: 1,
                depAirportId: '',
                destAirportId: '',
                departureDate: '',
                arivalDate: ''
            });
            ToastAndroid.show('Travel added successfully!', ToastAndroid.SHORT);
            this.props.navigation.navigate('Request');
        } else {
            this.setState({
                btnLoading: false,
                activeTab: 3,
            });
            ToastAndroid.show(result.data.detail, ToastAndroid.SHORT);
        }
    }
    
    changeDepartureDate = (date) => {
        this.setState({ departureDate: date });
    }

    changeArivalDate = (date) => {
        this.setState({ arivalDate: date });
    }

    cartList = () => {
        this.props.navigation.navigate('Cart');
    }
 
    travelerCartList = () => {
        this.props.navigation.navigate('TravelerCart');
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }
    openDrawer = () => {
        this.props.navigation.openDrawer();
    }

    onShow = () => {
        this.setState({ visible: true });
    }
    
    onSelect = (picked) => {
        this.onDepAirportChange(picked);
        this.setState({
            visible: false
        });
    }
    
    onCancel = () => {
        this.setState({
            visible: false
        });
    }

    // check status
    checkLoadingStatus = () => {
        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Add your Travel! it's Easy</Text>
                    <View style={styles.tabButton}>
                        <Text style={[styles.headerText, (this.state.activeTab === 1) && styles.activeColor]}>Departure</Text>
                        <FontAwesome name='angle-right' size={20} />
                        <Text style={[styles.headerText, (this.state.activeTab === 2) && styles.activeColor]}> Destination</Text>
                        <FontAwesome name='angle-right' size={20} />
                        <Text style={[styles.headerText, (this.state.activeTab === 3) && styles.activeColor]}>Date </Text>  
                    </View> 
                    {this.renderTab()}
                </View>
            </ScrollView>
        );
    }

    checkdeperture = () => {
        if (this.state.depAirportId.length < 1) {
            ToastAndroid.show('Please enter depeture Airport', ToastAndroid.SHORT);
            return false;
        }
        this.setState({ activeTab: 2 });
    }

    checkDestinationAirport = () => {
        if (this.state.destAirportId.length < 1) {
            ToastAndroid.show('Please enter destination  airport', ToastAndroid.SHORT);
            return false;
        }
        this.setState({ activeTab: 3 });
    }

    renderModalText = (id) => {
        if (id) {
            const airportId = USAAIRPORTLIST.find(item => item.id === id);
            return airportId.name;   
        }
        return 'Select Airport'; 
    }

    renderTab = () => {
        if (this.state.activeTab === 1) {
            return (
                <View style={styles.dropDownArea}>

                    <Dropdown 
                        onValueChange={() => console.log('success')} 
                        data={USA}
                        selected={this.state.depCountryId}
                        enabled={false} 
                    />

                    <TouchableOpacity style={{ marginHorizontal: 5, borderRadius: 5, borderColor: '#fc7900', paddingLeft: 10, marginVertical: 15, borderWidth: 2 }} onPress={this.onShow}>
                        <Text style={{ paddingVertical: 15, fontSize: 15 }}>{this.renderModalText(this.state.depAirportId)}</Text>
                    </TouchableOpacity> 

                    <ModalFilterPicker
                        visible={this.state.visible}
                        onSelect={this.onSelect}
                        onCancel={this.onCancel}
                        options={USAAIRPORTLIST.map(item => ({ key: item.id, label: item.name }))}
                        renderCancelButton={() => console.log('render btn')}
                        optionTextStyle={{ fontSize: 12 }}
                    />
                    
                    <Button 
                        children='Next'
                        customStyle={styles.customBtn}
                        onPress={() => this.checkdeperture()} 
                    />
                </View>
            );
        }

        if (this.state.activeTab === 2) {
            return (
                <View style={styles.dropDownArea}>
                    <Dropdown 
                        onValueChange={() => console.log('changed')}
                        data={BD}
                        selected={this.state.destCountryId}
                        enabled={false}  
                    />
                    
                    <Dropdown 
                        onValueChange={this.onDestAirportChange}
                        data={[{ id: '', name: 'Select Airport' }, ...BDAIRPORT]}
                        selected={this.state.destAirportId} 
                        customStyle={{ marginVertical: 15 }} 
                    />
                    
                    <View style={styles.btnGroup}>
                        <Button 
                            children='Prev'
                            customStyle={styles.customBtn}
                            onPress={() => this.setState({ activeTab: 1 })} 
                        />
                        <Button 
                            children='Next'
                            customStyle={styles.customBtn}
                            onPress={() => this.checkDestinationAirport()} 
                        />
                    </View>
                </View>
            );
        }

        if (this.state.activeTab === 3) {
            return (
                <View style={styles.dropDownArea}>
                    <Datepicker 
                        date={this.state.departureDate}
                        onChangeDate={this.changeDepartureDate} 
                        placeholder='Departure Date'
                    />

                    <Datepicker 
                        date={this.state.arivalDate}
                        onChangeDate={this.changeArivalDate} 
                        placeholder='Arrival Date'
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {
                            this.state.btnLoading ? 
                                <Spinner size='large' />
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Button 
                                    children='Prev'
                                    customStyle={styles.customBtn}
                                    onPress={() => this.setState({ activeTab: 2 })} 
                                />

                                <Button 
                                    children='Save'
                                    customStyle={styles.customBtn}
                                    onPress={this.addNewTravel} 
                                />
                            </View>
                        }
                    </View>
                </View>
            );
        }    
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Container>
                <HeaderNav 
                    profile={this.openDrawer} 
                    travelerCartList={this.travelerCartList} 
                    cartList={this.cartList} 
                />
                {this.checkLoadingStatus()}
                <Content />
                <FooterNav activeRoute={'TRAVEL'} loadPage={this.loadPage} />
            </Container>
        );
    }
}

export default AddTravel;
