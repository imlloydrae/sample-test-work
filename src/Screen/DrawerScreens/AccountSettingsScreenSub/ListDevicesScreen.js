import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EmptyList from '../../Components/EmptyList';
import CustomModal from '../../Components/CustomModal';
import Loader from '../../Components/Loader';
import {listDevices, logoutDevice} from '../../../actions/device';

const ListDevicesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchDevices = () => dispatch(listDevices);

  const {devices} = useSelector(state => state.deviceReducer);
  const {deviceInfo} = useSelector(state => state.authReducer);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState();
  const [deviceId, setDeviceId] = useState(null);

  /* INIT */
  useEffect(() => {
    Promise.all([setLoading(true), fetchDevices()])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  /* FUNCTIONS */
  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchDevices()])
      .then(() => setRefreshing(false))
      .catch(() => {
        setRefreshing(false);
      });
  };

  const onConfirm = (id, unqId) => {
    setConfirmVisible(!confirmVisible);
    setSelectedItem(id);
    setDeviceId(unqId);
  };

  const onLogoutDevice = id => {
    setConfirmVisible(!confirmVisible);

    setLoading(true);
    dispatch(logoutDevice({id: id, is_active: 0}))
      .then(() => {
        if (deviceId === deviceInfo.UniqueID) {
          onLogout();
        } else {
          fetchDevices()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
        }
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

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
      <Loader visible={loading} />
      <View style={styles.container}>
        <CustomModal
          isVisible={!confirmVisible}
          alertLabel="Are you sure you want to logout of this device?"
          status={2}
          buttonText="Yes"
          isClosed={() => setConfirmVisible(!confirmVisible)}
          onPress={() => onLogoutDevice(selectedItem)}
        />
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Registered Devices</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colMiddle}>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={devices}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.listTyle}
                    onPress={() =>
                      navigation.navigate('DeviceInfoScreen', {
                        id: item.platformMobileInfoId,
                      })
                    }>
                    <View style={styles.rowStyle}>
                      <View style={styles.subRowStyle}>
                        <FontAwesome
                          name="mobile"
                          style={styles.editButton}
                          color={'red'}
                          size={25}
                        />
                        <Text style={styles.labelText}>{item.deviceName}</Text>
                      </View>

                      {/* {item.isActive ? (
                        <TouchableOpacity
                          style={styles.buttonStyle}
                          onPress={() => onConfirm(item.platformMobileInfoId, item.UniqueID)}>
                          <Text style={styles.buttonTextStyle}>Logout</Text>
                        </TouchableOpacity>
                      ) : (
                        ''
                      )} */}
                    </View>
                    <View style={styles.rowStyle}>
                      <Text style={styles.subLabeltext}>
                        {item.manufacturer} {item.model}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ListDevicesScreen;

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
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
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
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
    fontSize: 10,
    fontWeight: 'bold',
  },
});
