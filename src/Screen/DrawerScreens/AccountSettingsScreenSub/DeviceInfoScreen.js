import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

import Loader from '../../Components/Loader';
import {getDevice} from '../../../actions/device';

const DeviceInfoScreen = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const fetchDevice = id =>
    dispatch(getDevice(id)).catch(err => Alert.alert('Error', err));

  const [loading, setLoading] = useState(false);
  const {deviceDetails} = useSelector(state => state.deviceReducer);
  const {accountDetails} = useSelector(state => state.accountReducer);

  useEffect(() => {
    Promise.all([setLoading(true), fetchDevice(id)]).then(() =>
      setLoading(false),
    );
  }, []);

  return (
    <SafeAreaView style={styles.mainBody}>
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView style={styles.scrollView}>
          <Loader visible={loading} />
          <View style={styles.container}>
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}>
                    {deviceDetails.deviceName}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View>
                <TouchableOpacity style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Delete</Text>
                </TouchableOpacity>
              </View> */}
            </View>
            <View style={styles.colMiddle}>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Device Name</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.deviceName}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Manufacturer</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.manufacturer}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Model</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.model}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>IP Address</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.ipAddress}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Phone Number</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.phoneNumber === 'unknown' ||
                      deviceDetails.phoneNumber == null
                        ? 'Not Available'
                        : deviceDetails.phoneNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Location</Text>
                    <Text style={styles.labelShortCutBig}>
                      {deviceDetails.city != null
                        ? `${deviceDetails.city},`
                        : ''}{' '}
                      {deviceDetails.country != null
                        ? deviceDetails.country
                        : ''}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Date Installed</Text>
                    <Text style={styles.labelShortCutBig}>
                      {dayjs(deviceDetails.registeredAt).format('MMMM D, YYYY')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Last Active</Text>
                    <Text style={styles.labelShortCutBig}>
                      {dayjs(deviceDetails.lastActive).format(
                        'MMM D, YYYY h:mm A',
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default DeviceInfoScreen;

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
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
  },
  colExtra: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  colBottom: {
    flex: 0.25,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  sectionStyle: {
    flexDirection: 'column',
    height: 75,
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
  buttonStyle: {
    backgroundColor: 'red',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  disableTextbtnStyle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  disableBtnStyle: {
    marginTop: 10,
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 15,
    width: '50%',
  },

  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  radioItem: {
    flexDirection: 'row',
    width: '100%',
  },
  titleIcon: {
    width: '12%',
  },
  titleIconText: {
    width: '100%',
  },
  userInfoText: {
    color: '#000',
    fontSize: 10,
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
    height: 70,
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
  },
  arrowIcon: {
    height: 35,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  listTyle: {
    height: 90,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
  },
  rowStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  subRowStyle: {
    flex: 0,
    flexDirection: 'row',
    width: 200,
    alignContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    height: 25,
    width: 13,
    marginRight: 5,
    // marginTop: 2,
    color: '#2583E6',
  },
  hrStyle: {
    borderBottomColor: '#BAD8F7',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  subLabeltext: {
    fontSize: 10,
    color: '#999',
  },
});
