import React, { Component } from 'react';
import { View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';

class Datepicker extends Component {

    static propTypes = {
        customStyle: PropTypes.object,
        date: PropTypes.string.isRequired,
        onChangeDate: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            hasFocus: false
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
                <DatePicker
                    date={this.props.date}
                    style={{
                        width: '100%', 
                        borderColor: '#fc7900',
                        borderWidth: 2, 
                        borderRadius: 5,
                        marginLeft: 0,
                        marginBottom: 10
                    }}
                    mode="date"
                    placeholder={this.props.placeholder}
                    format="MM/DD/YYYY"
                    minDate="2016-05-01"
                    confirmBtnText="Confirm"
                    androidMode='spinner'
                    cancelBtnText="Cancel"
                    customStyles={{
                    // dateIcon: {
                    //     position: 'absolute',
                    // },
                    dateInput: {
                        marginLeft: 0,
                        borderColor: '#fc7900',
                        borderWidth: 0
                    }
                    }}
                    onDateChange={(date) => this.props.onChangeDate(date) }
                />
            </View>
        );  
    }
}

const styles = {
   
    container: {
        marginVertical: 7
    }
};


export { Datepicker };
