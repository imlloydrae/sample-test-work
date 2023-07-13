import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Alert, StyleSheet, Image} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import UserInactivity from 'react-native-user-inactivity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import {getDeepLink} from '../utilities';
import IMAGES from '../constants/images';
import BottomMenu from '../Screen/Components/BottomMenu';
import HomeScreen from './DrawerScreens/HomeScreen';
import DashboardScreen from './DrawerScreens/DashboardScreen';
import NotificationScreen from './DrawerScreens/NotificationScreen';
import AccountSettingsScreen from './DrawerScreens/AccountSettingsScreen';

/* HOME SUB */
import TopUpScreen from './DrawerScreens/HomeScreenSub/TopUpScreen';
import CampaignScreen from './DrawerScreens/HomeScreenSub/CampaignScreen';
import DirectoryScreen from './DrawerScreens/HomeScreenSub/DirectoryScreen';
import TemplateScreen from './DrawerScreens/HomeScreenSub/TemplateScreen';
import PreviewScreen from './DrawerScreens/HomeScreenSub/CampaignScreenSub/PreviewScreen';
import VerificationScreen from './DrawerScreens/HomeScreenSub/CampaignScreenSub/VerificationScreen';
import TransactionHistoryScreen from './DrawerScreens/HomeScreenSub/TopUpScreenSub/TransactionHistoryScreen';
import CampaignListScreen from './DrawerScreens/HomeScreenSub/CampaignScreenSub/CampaignListScreen';
import CampaignSummary from './DrawerScreens/HomeScreenSub/CampaignScreenSub/CampaignSummary';
import CampaignRecipientsScreen from './DrawerScreens/HomeScreenSub/CampaignScreenSub/CampaignRecipientsScreen';
import CampaignTemplatesScreen from './DrawerScreens/HomeScreenSub/CampaignScreenSub/CampaignTemplatesScreen';
import CartSummaryScreen from './DrawerScreens/HomeScreenSub/TopUpScreenSub/CartSummaryScreen';
import DirectoryListScreen from './DrawerScreens/HomeScreenSub/DirectoryScreenSub/DirectoryListScreen';
import EditDirectory from './DrawerScreens/HomeScreenSub/DirectoryScreenSub/EditDirectory';
import DirectoryContactListScreen from './DrawerScreens/HomeScreenSub/DirectoryScreenSub/DirectoryContactListScreen';
import AddDirectoryContact from './DrawerScreens/HomeScreenSub/DirectoryScreenSub/AddDirectoryContact';
import EditDirectoryContact from './DrawerScreens/HomeScreenSub/DirectoryScreenSub/EditDirectoryContact';
import TemplateListScreen from './DrawerScreens/HomeScreenSub/TemplateScreenSub/TemplateListScreen';
import EditTemplateScreen from './DrawerScreens/HomeScreenSub/TemplateScreenSub/EditTemplateScreen';
import BuyApiScreen from './DrawerScreens/HomeScreenSub/BuyApiScreen';
import ReportScreen from './DrawerScreens/HomeScreenSub/ReportScreen';
import CalendarScreen from './DrawerScreens/HomeScreenSub/CalendarScreen';
import TutorialScreen from './DrawerScreens/HomeScreenSub/TutorialScreen';

/* ACCOUNT SETTINGS SUB */
import ProfileScreen from './DrawerScreens/AccountSettingsScreenSub/ProfileScreen';
import EditProfileScreen from './DrawerScreens/AccountSettingsScreenSub/EditProfileScreen';
import ListDevicesScreen from './DrawerScreens/AccountSettingsScreenSub/ListDevicesScreen';
import DeviceInfoScreen from './DrawerScreens/AccountSettingsScreenSub/DeviceInfoScreen';

const Stack = createStackNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
        path="home"
      />
      <Stack.Screen
        name="TopUpScreen"
        component={TopUpScreen}
        options={{headerShown: false, title: 'Top-Up'}}
        path="topup"
      />
      <Stack.Screen
        name="CartSummaryScreen"
        component={CartSummaryScreen}
        options={{headerShown: false}}
        path="cart-summary"
      />
      <Stack.Screen
        name="TransactionHistoryScreen"
        component={TransactionHistoryScreen}
        options={{headerShown: false}}
        path="transaction-history"
      />
      <Stack.Screen
        name="CampaignScreen"
        component={CampaignScreen}
        options={{headerShown: false}}
        path="create-campaign"
      />
      <Stack.Screen
        name="PreviewScreen"
        component={PreviewScreen}
        options={{headerShown: false}}
        path="preview-campaign"
      />
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
        options={{headerShown: false}}
        path="campaign-verification"
      />
      <Stack.Screen
        name="CampaignRecipientsScreen"
        component={CampaignRecipientsScreen}
        options={{headerShown: false}}
        path="campaign-recipients"
      />
      <Stack.Screen
        name="CampaignTemplatesScreen"
        component={CampaignTemplatesScreen}
        options={{headerShown: false}}
        path="campaign-templates"
      />
      <Stack.Screen
        name="CampaignListScreen"
        component={CampaignListScreen}
        options={{headerShown: false}}
        path="campaigns"
      />
      <Stack.Screen
        name="CampaignSummary"
        component={CampaignSummary}
        options={{headerShown: false}}
        path="campaign-summary"
      />
      <Stack.Screen
        name="DirectoryScreen"
        component={DirectoryScreen}
        options={{headerShown: false}}
        path="create-directory"
      />
      <Stack.Screen
        name="DirectoryListScreen"
        component={DirectoryListScreen}
        options={{headerShown: false}}
        path="directories"
      />
      <Stack.Screen
        name="EditDirectory"
        component={EditDirectory}
        options={{headerShown: false}}
        path="edit-directory"
      />
      <Stack.Screen
        name="DirectoryContactListScreen"
        component={DirectoryContactListScreen}
        options={{headerShown: false}}
        path="directory-contacts"
      />
      <Stack.Screen
        name="AddDirectoryContact"
        component={AddDirectoryContact}
        options={{headerShown: false}}
        path="add-directory-contact"
      />
      <Stack.Screen
        name="EditDirectoryContact"
        component={EditDirectoryContact}
        options={{headerShown: false}}
        path="edit-directory-contact"
      />
      <Stack.Screen
        name="TemplateScreen"
        component={TemplateScreen}
        options={{headerShown: false}}
        path="create-template"
      />
      <Stack.Screen
        name="TemplateListScreen"
        component={TemplateListScreen}
        options={{headerShown: false}}
        path="templates"
      />
      <Stack.Screen
        name="EditTemplateScreen"
        component={EditTemplateScreen}
        options={{headerShown: false}}
        path="edit-template"
      />
      <Stack.Screen
        name="BuyApiScreen"
        component={BuyApiScreen}
        options={{headerShown: false}}
        path="buy-api"
      />
      <Stack.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{headerShown: false}}
        path="reports"
      />
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{headerShown: false}}
        path="calendar"
      />
      <Stack.Screen
        name="TutorialScreen"
        component={TutorialScreen}
        options={{headerShown: false}}
        path="tutorial"
      />
    </Stack.Navigator>
  );
};

const DashboardScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DashboardScreen">
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
        path="dashboard"
      />
    </Stack.Navigator>
  );
};

const MenuComponent = () => {
  return null;
};

const NotificationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="NotificationScreen">
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{headerShown: false}}
        path="notifications"
      />
    </Stack.Navigator>
  );
};

const AccountSettingStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AccountSettingsScreen">
      <Stack.Screen
        name="AccountSettingsScreen"
        component={AccountSettingsScreen}
        options={{headerShown: false}}
        path="account-settings"
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
        path="profile"
      />
      <Stack.Screen
        name="ListDevicesScreen"
        component={ListDevicesScreen}
        options={{headerShown: false}}
        path="devices"
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{headerShown: false}}
        path="edit-profile"
      />

      <Stack.Screen
        name="DeviceInfoScreen"
        component={DeviceInfoScreen}
        options={{headerShown: false}}
        path="device-info"
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const DrawerNavigationRoutes = props => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(900 * 1000);

  const onLogout = () => {
    Alert.alert('Session Expired!', "You've been idle for too long.");

    setTimeout(async () => {
      dispatch({
        type: TYPES.LOGOUT,
      });

      try {
        await AsyncStorage.clear();
        props.navigation.replace('Auth');
      } catch {}
    }, 300);
  };

  return (
    <UserInactivity
      isActive={active}
      timeForInactivity={timer}
      onAction={isActive => {
        if (!isActive) {
          onLogout();
          setActive(isActive);
        }
      }}>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarStyle: {
            backgroundColor: '#F5FBFF',
            height: 90,
          },
          tabBarLabelStyle: {display: 'none'},
          style: {height: 50},
        })}
        uriPrefix={getDeepLink()}>
        <Tab.Screen
          name="Home"
          component={HomeScreenStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={focused ? IMAGES.IC_HOME : IMAGES.IC_HOME_INACTIVE}
                  style={styles.icons}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreenStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                // <FontAwesome name={'line-chart'} color={'#2583E6'} size={25} />
                <Image
                  resizeMode={'contain'}
                  source={
                    focused ? IMAGES.IC_DASHBOARD : IMAGES.IC_DASHBOARD_INACTIVE
                  }
                  style={styles.icons}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="ShortcutMenu"
          component={MenuComponent}
          options={navigation => ({
            tabBarButton: () => <BottomMenu navigation={navigation} />,
          })}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationScreenStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                <Image
                  resizeMode={'contain'}
                  source={focused ? IMAGES.IC_BELL : IMAGES.IC_BELL_INACTIVE}
                  style={styles.icons}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name="AccountSettings"
          component={AccountSettingStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => {
              return (
                <FontAwesome
                  name={'user-circle-o'}
                  color={focused ? '#2583E6' : 'black'}
                  size={25}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </UserInactivity>
  );
};

export default DrawerNavigationRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  square: {
    backgroundColor: '#7cb48f',
    width: 100,
    height: 100,
    margin: 4,
  },
  squareBtn: {
    width: 100,
    height: 100,
    margin: 4,
    textAlign: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  footer: {
    flex: 1,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    textAlign: 'center',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    paddingTop: 5,
    fontWeight: 'bold',
    padding: 26,
    textAlign: 'center',
  },
  roundButton: {
    width: 50,
    height: 50,
    textAlign: 'center',
    borderRadius: 100,
    backgroundColor: '#2583E6',
  },
  icons: {
    width: '45%',
    height: '45%',
  },
});
