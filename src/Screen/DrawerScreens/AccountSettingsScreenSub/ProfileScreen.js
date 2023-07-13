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
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import CustomModal from '../../Components/CustomModal';
import {getAccount, disableAuth} from '../../../actions/account';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchAccountInfo = () => dispatch(getAccount);

  const {accountDetails} = useSelector(state => state.accountReducer);

  const [loading, setLoading] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  /* FUNCTIONS */
  const onConfirm = () => {
    setConfirmVisible(!confirmVisible);
  };

  const onDisable2fa = () => {
    setLoading(true);
    dispatch(disableAuth).then(() => {
      fetchAccountInfo().then(() => {
        setConfirmVisible(!confirmVisible);
        setLoading(false);
      });
    });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <CustomModal
              isVisible={!confirmVisible}
              alertLabel="Disable Two-Factor Authentication"
              alertMsg="This reduces the security level of your account and not recommended. Are you sure you want to continue?"
              status={2}
              buttonText={
                loading
                  ? 'Loading..'
                  : accountDetails.enable_otp == 1
                  ? 'Disable 2FA'
                  : 'Enable 2FA'
              }
              isClosed={() => setConfirmVisible(!confirmVisible)}
              onPress={() => onDisable2fa()}
            />
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => {
                    navigation.goBack('AccountSettingsScreen');
                  }}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}>Account</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => navigation.navigate('EditProfileScreen')}>
                  <Text style={styles.buttonTextStyle}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.colMiddle}>
              <View style={styles.accountFieldWrapper}>
                <View style={styles.accountField}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Account Name</Text>
                    <Text style={styles.labelShortCutBig}>
                      {accountDetails.firstname} {accountDetails.lastname}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.accountFieldWrapper}>
                <View style={styles.accountField}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Username</Text>
                    <Text style={styles.labelShortCutBig}>
                      {accountDetails.username}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.accountFieldWrapper}>
                <View style={styles.accountField}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Email Address</Text>
                    <Text style={styles.labelShortCutBig}>
                      {accountDetails.email}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.accountFieldWrapper}>
                <View style={styles.accountField}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>Password</Text>
                    <Text style={styles.labelShortCutBig}>*******</Text>
                  </View>
                </View>
              </View>

              {/* <View style={styles.twoFactorWrapper}>
                <View style={styles.accountField}>
                  <View style={styles.titleIconText}>
                    <Text style={styles.userInfoText}>
                      Two Factor Authentication
                    </Text>
                    <Text style={styles.labelShortCutBig}>
                      System Will Send A Generated Code Via Sms To
                    </Text>
                    <Text style={styles.labelShortCutBig}>
                      Login In Dashboard
                    </Text>
                  </View>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.disableBtnStyle}
                    onPress={onConfirm}>
                    <Text style={styles.disableTextbtnStyle}>
                      {accountDetails.enable_otp == 1
                        ? 'Disable 2FA'
                        : 'Enable 2FA'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  },
  buttonStyle: {
    backgroundColor: '#2583E6',
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
    fontSize: 11,
  },
  labelShortCut: {
    color: '#2583E6',
    fontSize: 11,
  },
  labelShortCutBig: {
    color: '#000',
    fontSize: 14,
  },
  accountFieldWrapper: {
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
  twoFactorWrapper: {
    marginVertical: 3,
    backgroundColor: '#fff',
    borderRadius: 3,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  accountField: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  arrowIcon: {
    height: 35,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
