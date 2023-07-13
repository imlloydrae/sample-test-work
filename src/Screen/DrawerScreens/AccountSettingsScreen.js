import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSettingsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {clientData} = useSelector(state => state.clientReducer);

  const onLogout = async () => {
    dispatch({
      type: TYPES.LOGOUT,
    });

    try {
      await AsyncStorage.clear();
      navigation.replace('Auth');
    } catch {}
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.colTopMost}>
            <View style={styles.title}>
              <Text style={{fontWeight: 'bold', color: '#000'}}>Profile</Text>
            </View>
          </View>
          <View style={styles.colTop}>
            <View style={styles.userCover}>
              <Image
                source={IMAGES.PROFILE_COVER}
                style={{
                  width: '95%',
                  height: '100%',
                  marginTop: 10,
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={styles.avatarHandler}>
              <FontAwesome
                name={'user-circle-o'}
                color={'#2583E6'}
                size={95}
                style={styles.userIcon}
              />
            </View>
            <View style={styles.userinfoStyle}>
              <Text style={styles.userInfo}>
                {clientData.info.firstname} {clientData.info.lastname}
              </Text>
            </View>
            <View style={styles.sectionStyle}>
              <Text style={styles.userEmail}>{clientData.info.email}</Text>
            </View>
          </View>
          <View style={styles.colMiddle}>
            <TouchableOpacity
              style={styles.shortcutTab}
              onPress={() => navigation.navigate('ProfileScreen')}>
              <View style={styles.shortcutWrapper}>
                <View style={styles.titleIcon}>
                  <FontAwesome name={'square'} color={'#2583e6'} size={20} />
                </View>
                <View style={styles.titleIconText}>
                  <Text style={styles.labelShortCutBig}>Account</Text>
                </View>
              </View>
              <View>
                <FontAwesome
                  name={'chevron-right'}
                  color={'#2583e6'}
                  size={10}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
            <View /*style={styles.shortcutTab}*/ style={{display: 'none'}}>
              <TouchableOpacity style={styles.shortcutWrapper}>
                <View style={styles.titleIcon}>
                  <FontAwesome name={'square'} color={'#2583e6'} size={20} />
                </View>
                <View style={styles.titleIconText}>
                  <Text style={styles.labelShortCutBig}>Team</Text>
                </View>
              </TouchableOpacity>
              <View>
                <FontAwesome
                  name={'chevron-right'}
                  color={'#2583e6'}
                  size={10}
                  style={styles.arrowIcon}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.shortcutTab}
              onPress={() => navigation.navigate('ListDevicesScreen')}>
              <View style={styles.shortcutWrapper}>
                <View style={styles.titleIcon}>
                  <FontAwesome name={'square'} color={'#2583e6'} size={20} />
                </View>
                <View style={styles.titleIconText}>
                  <Text style={styles.labelShortCutBig}>
                    Registered Devices
                  </Text>
                </View>
              </View>
              <View>
                <FontAwesome
                  name={'chevron-right'}
                  color={'#2583e6'}
                  size={10}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
            <View /*style={styles.lastTab}*/ style={{display: 'none'}}>
              <TouchableOpacity style={styles.shortcutWrapper}>
                <View style={styles.titleIcon}>
                  <FontAwesome name={'square'} color={'#2583e6'} size={20} />
                </View>
                <View style={styles.titleIconText}>
                  <Text style={styles.labelShortCutBig}>
                    SMS Credits Usage Alert
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <FontAwesome
                  name={'chevron-right'}
                  color={'#2583e6'}
                  size={10}
                  style={styles.arrowIcon}
                />
              </View>
            </View>
            <View style={styles.lastTab}>
              <TouchableOpacity
                style={styles.shortcutWrapper}
                onPress={() => onLogout()}>
                <View style={styles.titleIcon}>
                  <FontAwesome name={'square'} color={'gray'} size={20} />
                </View>
                <View style={styles.titleIconText}>
                  <Text style={styles.labelShortCutBig}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.colBottom}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettingsScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
  },
  colTop: {
    flex: 0,
    marginTop: 10,
  },
  colTopMost: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
  },
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 10,
    maxHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCover: {
    backgroundColor: '#F5FBFF',
    width: '100%',
    padding: 10,
    height: '55%',
  },
  avatarHandler: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 105,
    marginTop: -60,
  },
  userIcon: {
    borderColor: '#FFF',
    borderWidth: 5,
    borderRadius: 54,
  },
  userinfoStyle: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    flexDirection: 'row',
    height: 20,
    marginTop: 40,
  },
  sectionStyle: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    flexDirection: 'row',
  },
  userInfo: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    position: 'relative',
    top: '-10%',
    color: '#090911',
    fontWeight: '600',
    fontSize: 16,
  },
  userEmail: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    position: 'relative',
    top: '-10%',
    color: 'gray',
    fontSize: 12,
  },
  titleIcon: {
    width: '12%',
  },
  titleIconText: {
    width: '50%',
  },
  labelShortCutBig: {
    color: '#000',
    fontSize: 12,
  },
  labelShortCut: {
    color: '#2583E6',
    fontSize: 11,
  },
  labelShortCutBig: {
    color: '#000',
    fontSize: 14,
  },
  shortcutTab: {
    flexDirection: 'row',
    height: 60,
    marginVertical: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: '#000',
  },
  lastTab: {
    flexDirection: 'row',
    height: 60,
    marginVertical: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  shortcutWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  arrowIcon: {
    height: 35,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
