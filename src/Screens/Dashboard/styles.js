const styles = {
    container: {
        flex: 1
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    parentDiv: {
        position: 'relative',
        alignItems: 'center', 
        justifyContent: 'center'
        
    },
    headingText: {
        alignSelf: 'center',
        paddingTop: 25
    },
    textStyle: {
        fontSize: 20,
        color: '#363636',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    routePosition: {
        position: 'absolute',
    },

    touchableOpacity: {
        backgroundColor: '#DC6E39',
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center'
    },

    imageSize: {  
        width: 40,
        height: 40,
    },
    bottomText: {
        alignSelf: 'center'
    },
    paymentStatus: {
       top: -110, 
       left: -100 
    },

    activeTravel: {
        top: -125,
        left: -30 

    },
    myBag: {
        top: -30,
        left: -120
    },
    request: {
        top: -95,
        left: 35
    },
    withdraw: {
        right: 15,
        top: 40
    },
    shopping: {
        top: 50,
        left: -5
    },
    orders: {
        left: 45,
        top: -15
    }
};

export default styles;
