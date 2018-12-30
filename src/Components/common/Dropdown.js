import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import PropTypes from 'prop-types';

class Dropdown extends Component {

    static propTypes = {
        onValueChange: PropTypes.func.isRequired,
        selected: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        customStyle: PropTypes.object,
        data: PropTypes.array.isRequired,
        enabled: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false
        };
    }

    setFocus = (hasFocus) => {
        this.setState({ hasFocus });
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.customStyle]}>
                <Picker
                    selectedValue={this.props.selected}
                    onValueChange={(itemValue) => this.props.onValueChange(itemValue)}
                    enabled={this.props.enabled}
                >
                    {
                        this.props.data.map(
                            (value, key) => <Picker.Item key={key} label={value.name} value={value.id} />
                        )
                    }
                    
                </Picker>
            </View>
        );  
    }
}

const styles = {
   
    container: {
        justifyContent: 'center',
        borderColor: '#fc7900', 
        borderWidth: 2, 
        borderRadius: 5,
        marginHorizontal: 5,
    },
    
    inputFocus: {
        borderBottomColor: '#ff793a',
    },
    inputBlur: {
        borderBottomColor: '#D4D4D4',
    }
};


export { Dropdown };
