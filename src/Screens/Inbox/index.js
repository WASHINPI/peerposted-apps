import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import styles from './styles';
import { HeaderNav, FooterNav } from './../../Components/nav';
import { Spinner } from './../../Components/common';
import ajax from '../../utilities/ajax';

class Inbox extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            messages: [],
            message_from: 0
        };
    }

    async componentWillMount() {
        const result = await ajax.getALlMessage();
        const userid = await ajax.getUserId();
        console.log('test', userid);
        this.setState({
            message_from: userid
        });
        if (result.status === 'success' && Object.keys(result.messages).length >= 1) {
            const arr = Object.keys(result.messages).map((key) => result.messages[key]);
            console.log(arr);
            const data = arr.map(item => ({
                _id: item.id,
                text: item.name,
                createdAt: item.created_at,
                user: {
                     _id: item.message_to === 1 ? 1 : 2,
                    name: item.from.name,
                    avatar: item.from.user_photo,
                },
            }));
            
            this.setState({
                messages: [...data],
                isLoading: false
            });
        } else {
            this.setState({
                messages: [{
                    _id: 1,
                    text: '',
                    createdAt: '',
                    user: {
                         _id: null,
                        name: null,
                        avatar: null,
                    },
                }],
                isLoading: false,
            });  
        }
    }

    onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));
        this.updateMessage(messages[0]);
      }
    
    updateMessage = async (message) => {
        const data = {
            name: message.text,
            message_from: this.state.message_from,
            message_to: 1
        };
        console.log(message);
       const x = await ajax.updateMessage(data);
       console.log(x);
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

    // check status
    checkLoadingStatus = () => {
        if (this.state.isLoading) {
           return <Spinner size='large' />;
        } 
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                _id: 1,
                }}
            />
        );
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
                <View style={{ flex: 1 }}>
                    {this.checkLoadingStatus()}
                </View>    
                
                <FooterNav activeRoute={'DASHBOARD'} loadPage={this.loadPage} />
            </Container>
        );
    }
}

export default Inbox;
