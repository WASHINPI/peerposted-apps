import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

class BackBtn extends Component {
    
    render() {
        return (
            <TouchableOpacity onPress={this.props.goBack} style={{ marginLeft: -15, padding: 15 }}>
                <AntDesign 
                    name={'arrowleft'} 
                    color='#FC7900' 
                    size={20} 
                />
            </TouchableOpacity>  
        );  
    }
}

export { BackBtn };
