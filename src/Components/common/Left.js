import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/dist/Entypo';

class Left extends Component {
    
    render() {
        return (
            <TouchableOpacity onPress={this.props.profile}>
                <Entypo 
                    name={'dots-three-vertical'}  
                    size={25}
                    color={'#ff793a'}
                />
            </TouchableOpacity>
             
        );  
    }
}

export { Left };
