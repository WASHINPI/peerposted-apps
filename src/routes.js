import React from 'react';
import { ScrollView } from 'react-native';
import { createSwitchNavigator,
        createStackNavigator,
        createDrawerNavigator,
        SafeAreaView, DrawerItems } from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Splash from './Screens/Splash';
import Login from './Screens/Login';
import Logout from './Screens/Logout';
import Signup from './Screens/Signup';
import ForgetPassword from './Screens/ForgetPassword';
import Inbox from './Screens/Inbox';

import Dashboard from './Screens/Dashboard';
import Search from './Screens/Search';
import Request from './Screens/Request';

// Buyer Stack nav
import Products from './Screens/Products';
import Product from './Screens/Product';
import Cart from './Screens/Cart';
import Conformation from './Screens/Conformation';
import MyOrders from './Screens/MyOrders';
import Profile from './Screens/Profile';


// Travel Stack nav
import AddTravel from './Screens/Travel';
import MyTravel from './Screens/MyTravel';
import TravelerCart from './Screens/TravelerCart';
import Withdraw from './Screens/Withdraw';

// Common Components
import { SingleRight, BackBtn } from './Components/common';

const AuthStack = createSwitchNavigator({
        Splash,
        Login,
        Signup,
        ForgetPassword
  },
  {
    initialRouteName: 'Splash',
  });


const Buyer = createStackNavigator({
      Product,
      Products,
      Cart,
      Conformation,
      Profile
  },
  {
    initialRouteName: 'Products',
    navigationOptions: ({ navigation }) => ({
      headerLeft: <BackBtn goBack={() => navigation.goBack()} />,
      headerLeftContainerStyle: { marginLeft: 15 },
      headerTitleStyle: styles.titleStyle,
      headerRight: <SingleRight profile={() => navigation.openDrawer()} />
    })
  });


const Travel = createStackNavigator({
      AddTravel,
      TravelerCart,
      MyTravel,
      Request,
      Withdraw
},
{
  initialRouteName: 'AddTravel',
  
});


const DashboardStack = createStackNavigator({
  Dashboard
},
{
  initialRouteName: 'Dashboard',
});

const WithdrawStack = createStackNavigator({
  Withdraw
},
{
  initialRouteName: 'Withdraw',
  navigationOptions: ({ navigation }) => ({
    headerLeft: <BackBtn goBack={() => navigation.navigate('Dashboard')} />,
    headerLeftContainerStyle: { marginLeft: 15 },
    title: 'Withdraw',
    headerTitleStyle: styles.titleStyle,
    headerRight: <SingleRight profile={() => navigation.openDrawer() } />
  })
});

const orderStack = createStackNavigator({
  MyOrders
},
{
  initialRouteName: 'MyOrders',
  navigationOptions: ({ navigation }) => ({
    headerLeft: <BackBtn goBack={() => navigation.navigate('Dashboard')} />,
    headerLeftContainerStyle: { marginLeft: 15 },
    title: 'My Orders',
    headerTitleStyle: styles.titleStyle,
    headerRight: <SingleRight profile={() => navigation.openDrawer()} />
  })
});


const CustomDrawerContentComponent = (props) => {
  let copyprops = Object.assign({}, props); 
  
  copyprops.items = copyprops.items.filter(item => item.key !== 'Buyer'); 
  copyprops.items = copyprops.items.filter(item => item.key !== 'Travel');
  copyprops.items = copyprops.items.filter(item => item.key !== 'DashboardStack');
  copyprops.items = copyprops.items.filter(item => item.key !== 'Search');
  copyprops.items = copyprops.items.map(item => {
    if (item.key === 'My Profile') {
        item.params = { activeTab: 1 };
        return item;
    }
    if (item.key === 'Payout money') {
      item.params = { activeTab: 3 };
      return item;
  } 
  return item; 
  });
  return (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...copyprops} />
      </SafeAreaView>
    </ScrollView>
  );
}
  
;

const DrawerNav = createDrawerNavigator({
  Dashboard,
  'My Travels': { screen: MyTravel },
  'My Profile': { screen: Profile },
  'My Inbox': { screen: Inbox },
  'My Orders': { screen: orderStack },
  'Withdraw money': { screen: WithdrawStack },
  'Payout money': { screen: Profile },
  'Logout': { screen: Logout },
  Buyer,
  Travel,
  DashboardStack,
  Search
  
},
{
  initialRouteName: 'Dashboard',
  contentComponent: CustomDrawerContentComponent
}
);

const RootStack = createSwitchNavigator(
    {
       AuthStack,
       DrawerNav,
    },
    {
      initialRouteName: 'AuthStack',
    }
);


  const styles = {
    iconStyle: {
      backgroundColor: '#FC7900',
      borderRadius: 50, 
      color: '#FFFFFF',
    },
    ionicIconStyle: {
      backgroundColor: '#FC7900',
      borderRadius: 50, 
      color: '#FFFFFF',
    },
    titleStyle: {
        fontSize: 15,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#FC7900',
        flex: 1,
    },
    inActiveImage: {
      width: 20, 
      height: 20, 
      tintColor: '#FC7900'
    },
    activeImage: {
      width: 20, 
      height: 20, 
      tintColor: '#FFFFFF'
    }
  };
  
export default RootStack;
