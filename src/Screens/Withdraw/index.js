import React, { Component } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { Container, Content, Card } from 'native-base';
import { FooterNav } from './../../Components/nav';
import { Input, Button, Dropdown, Spinner } from './../../Components/common';
import ajax from './../../utilities/ajax';
import { paymentMethod } from './../../utilities/utility';
import styles from './styles';

class Withdraw extends Component {

    constructor() {
        super();
        this.state = {
            method: paymentMethod,
            selectedMethod: '',
            isLoading: true,
            bkash: [{ id: 'personal', name: 'personal' }, { id: 'agent', name: 'agent' }],
            selectbaskhType: '',
            bkash_number: '',
            bank_name: '',
            bank_branch: '',
            swift_code: '',
            account_name: '',
            account_number: '',
            buyer_paid_amount: '',
            cheque_beneficiary_name: '',
            cheque_mailing_address: '',
            cheque_contact_number: '',
            traveler_available_amount: '',
            traveler_pending_amount: '',
            btnLoading: false

        };
    }

   async componentDidMount() {
    const payout = await ajax.getPayout();
        if (payout.status === 'success') {
            this.setState({
                isLoading: false,
                buyer_paid_amount: payout.buyer_paid_amount,
                traveler_available_amount: payout.traveler_available_amount,
                traveler_pending_amount: payout.traveler_pending_amount 
            });
        }
    }

    onChangeBankName = (item) => {
        this.setState({ bank_name: item });
    }

    onChangeBankBranch = (item) => {
        this.setState({ bank_branch: item });
    }

    onChangeSwiftCode = (item) => {
        this.setState({ swift_code: item });
    }

    onChangeAccountName = (item) => {
        this.setState({ account_name: item });
    }
    onChangeAccountNumber = (item) => {
        this.setState({ account_number: item });
    }

    onChangeMethod = (item) => {
       this.setState({ selectedMethod: item });
    }
    onChangeBkashNumber = (item) => {
        this.setState({ bkash_number: item });
    }
    onChangeChequeName = (item) => {
        this.setState({ cheque_beneficiary_name: item });
    }
    onChangeChequeMailingAddress = (item) => {
        this.setState({ cheque_mailing_address: item });
    }

    onChangeChequeContactNumber = (item) => {
        this.setState({ cheque_contact_number: item });
    }

    loadPage = (pageName) => {
        this.props.navigation.navigate(pageName);
    }

    withdrawMoney = async () => {
        if (this.state.selectedMethod === '') {
            ToastAndroid.show('Please Select Payment Method!', ToastAndroid.SHORT);
            return false;
        }

        let inputData = {
            type: this.state.selectedMethod,
            amount: this.state.traveler_available_amount,
        };

        const bank = {
            bank_name: this.state.bank_name,
            bank_branch: this.state.bank_branch,
            swift_code: this.state.swift_code,
            account_name: this.state.account_name,
            account_number: this.state.account_number
        };

        const bkash = {
            bkash_number: this.state.bkash_number, 
            bkash_type: this.state.selectbaskhType
        };

        const cheque = {
            cheque_beneficiary_name: this.state.cheque_beneficiary_name,
            cheque_mailing_address: this.state.cheque_mailing_address,
            cheque_contact_number: this.state.cheque_contact_number
        };

        let newInputData = {};

        switch (this.state.selectedMethod) {
            case 'bank':
                newInputData = { ...inputData, ...bank };
                break;
            case 'bkash':
                newInputData = { ...inputData, ...bkash };
                break;
            case 'cheque':
                newInputData = { ...inputData, ...cheque };
                break;
            default:
                newInputData = { ...inputData };
                break; 
        }
        this.setState({
            btnLoading: true
        });

        const result = await ajax.postWithdraw(newInputData);
        if ('data' in result) {
            ToastAndroid.show('Withdraw successfully!', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('You have not sufficient balance', ToastAndroid.SHORT);
        }
        this.setState({
            btnLoading: false
        }); 
    }

    checkRenderItem = () => {
        if (this.state.isLoading) {
            return <Spinner size='large' />;
        }
        return (
            <Card>
                <View style={styles.headerText}>
                    <Text style={{ fontSize: 20, color: '#FC7900' }}>Withdraw Money</Text>
                </View>

                <View style={styles.area}>
                    <Text>Pending Amount</Text>
                    <Text style={styles.price}>BDT {this.state.traveler_pending_amount}</Text>
                </View>

                <Dropdown 
                    onValueChange={this.onChangeMethod}
                    data={this.state.method}
                    selected={this.state.selectedMethod}
                    customStyle={{ marginHorizontal: 15 }}  
                />

                {this.renderInput()}
                {this.state.btnLoading ? 
                    <Spinner size='large' />:
                    <Button 
                    customStyle={{ alignSelf: 'center', borderRadius: 5, marginVertical: 15 }} 
                    onPress={this.withdrawMoney}
                    >Withdraw Money</Button>
                }
                
            </Card>
        );
    }

    renderInput = () => {
        if (this.state.selectedMethod === 'bank') {
            return (
                <View>
                    <Input 
                        placeholder='Bank Name'
                        onChangeText={this.onChangeBankName}
                        value={this.state.bank_name} 
                    />
                    <Input 
                        placeholder='Bank Branch'
                        onChangeText={this.onChangeBankBranch}
                        value={this.state.bank_branch}  
                    />
                    <Input 
                        placeholder='Swift Code'
                        onChangeText={this.onChangeSwiftCode}
                        value={this.state.swift_code}  
                    />
                    <Input 
                        placeholder='Account Name'
                        onChangeText={this.onChangeAccountName}
                        value={this.state.account_name} 
                    />
                    <Input 
                        placeholder='Account Number'
                        onChangeText={this.onChangeAccountNumber}
                        value={this.state.account_number}  
                    />
                </View>
            );
        }

        if (this.state.selectedMethod === 'bkash') {
            return (
                <View>
                    <Input 
                        placeholder='bkash number'
                        customStyle={{
                            marginVertical: 15
                        }}
                        onChangeText={this.onChangeBkashNumber}
                        value={this.state.bkash_number}

                    />
                    <Dropdown 
                        onValueChange={
                            (item) => this.setState({ selectbaskhType: item })
                        }
                        data={this.state.bkash}
                        selected={this.state.selectbaskhType}
                        customStyle={{marginHorizontal: 15}}  
                    />
                </View>
            );
        }

        if (this.state.selectedMethod === 'cheque') {
            return (
                <View>
                    <Input 
                        placeholder='Beneficiary name'
                        onChangeText={this.onChangeChequeName}
                        value={this.state.cheque_beneficiary_name} 
                    />
                    <Input 
                        placeholder='Mailing Address (optional)'
                        onChangeText={this.onChangeChequeMailingAddress}
                        value={this.state.cheque_mailing_address} 
                    />
                    <Input 
                        placeholder='Contact number (optional)'
                        onChangeText={this.onChangeChequeContactNumber}
                        value={this.state.cheque_contact_number} 
                    />
                    
                </View>
            );
        }

        if (this.state.selectedMethod === 'cash') {
            return null;
        }
        return null;  
    }

    render() {
        console.disableYellowBox = true;
        return (
            <Container>
                <Content padder>
                    {this.checkRenderItem()}
                </Content>
                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
          </Container>
        );
    }
}

export default Withdraw;
