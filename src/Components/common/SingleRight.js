import React, { Component } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import PropTypes from 'prop-types';
import ajax from './../../utilities/ajax';
import {baseUrl} from './../../utilities/utility';

class SingleRight extends Component {

    static propTypes = {
        customeStyle: PropTypes.object,
        profile: PropTypes.func.isRequired
    }
    constructor() {
        super();
        this.state = {
            profilePic: ''
        };
    }

    async componentWillMount() {

        const profilePic = await ajax.getProfilePic();
       
        this.setState({
            profilePic, 
        }); 
    }

    profile = () => {
        this.props.profile();
    }
    
    render() {
        return (
            <View style={[styles.body, this.props.customeStyle]}>
                <Avatar
                    size="small"
                    rounded
                    source={{ uri: baseUrl + this.state.profilePic }}
                    onPress={() => this.profile()}
                    activeOpacity={0.7}
                    imageProps={{ borderColor: '#ff793a', borderWidth: 1 }}
                />
            </View>  
        );  
    }
}

const styles = {
    body: {
        flexDirection: 'row',
        marginRight: 15
    },
    imagesize: {
        margin: 10, 
        marginHorizontal: 5, 
        marginVertical: 5, 
        width: 25, 
        height: 25
    },
    badgeStyle: {
        position: 'absolute', 
        right: 0, 
        backgroundColor: '#fc7900',
        paddingVertical: 1, 
        paddingHorizontal: 6, 
        color: '#fff',
        borderRadius: 25
    }
};


export { SingleRight };
