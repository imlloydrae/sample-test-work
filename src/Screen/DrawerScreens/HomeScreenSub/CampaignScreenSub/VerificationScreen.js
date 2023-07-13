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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';

import Loader from '../../../Components/Loader';
import SpinnerLoader from '../../../Components/SpinnerLoader';
import FormInput from '../../../Components/FormInput';
import CustomModal from '../../../Components/CustomModal';
import CheckboxOption from '../../../Components/CheckboxOption';
import IMAGES from '../../../../constants/images';
import {getCampaignSummary} from '../../../../actions/apicode';
import {sendCampaign, resetCampaignForm} from '../../../../actions/campaign';

const VerificationScreen = ({navigation, route}) => {
  let campaignForm = route.params.campaign;
  let summaryForm = route.params.summary;
  const dispatch = useDispatch();
  const fetchCampaignSummary = form => dispatch(getCampaignSummary(form));

  const {apicodeCampaignSummary} = useSelector(state => state.apicodeReducer);

  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchCampaignSummary(summaryForm);
  }, []);

  /* FUNCTIONS */
  const onSendCampaign = () => {
    if (!checked) {
      Alert.alert('Please verify consent!');
      return;
    }

    if (password === '') {
      setHasError(true);
      return;
    }

    let form = {};

    Object.keys(campaignForm).forEach(i => {
      if (
        i != 'directory_name' &&
        i != 'apicode_name' &&
        i != 'senderid_name'
      ) {
        form[i] = campaignForm[i];
      }
    });

    if (form.campaign_status === 'ongoing') {
      delete form.schedule;
    } else form['schedule'] = [campaignForm.schedule];

    if (form.senderid_id === '') {
      delete form.senderid_id;
    }
    form['password'] = password;

    setLoading(true);
    dispatch(sendCampaign(form))
      .then(response => {
        setPassword('');
        setChecked(false);
        setLoading(false);
        setVisible(!visible);
        dispatch(resetCampaignForm());
      })
      .catch(error => {
        setPassword('');
        setChecked(false);
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <CustomModal
          isVisible={!visible}
          alertLabel="Success!"
          alertMsg="Your campaign was successfully created."
          buttonText="Back To Campaign"
          onPress={() => {
            setVisible(!visible);
            navigation.navigate('CampaignListScreen');
          }}
        />
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.navigate('CampaignScreen')}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Verification</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.greenBtn} onPress={onSendCampaign}>
              <Text style={styles.buttonTextStyle}>Send Campaign</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colMiddle}>
          <View>
            <View style={{overflow: 'scroll', maxHeight: 180}}>
              <Text style={styles.textNoti}>
                Complete the form with the required information to continue.
              </Text>
              <FormInput
                isPassword={true}
                label={{name: 'Enter Password'}}
                inputName="password"
                secureTextEntry={isPasswordSecure}
                onChangeText={password => {
                  password === '' ? setHasError(true) : setHasError(false);
                  setPassword(password);
                }}
                onPress={() => {
                  setIsPasswordSecure(!isPasswordSecure);
                  return false;
                }}
                icon={{
                  icon: isPasswordSecure ? 'eye-slash' : 'eye',
                  color: '#2583E6',
                }}
                value={password}
                hasError={hasError}
              />
            </View>

            <View style={styles.sectionStyle}>
              <View style={styles.radioItem}>
                <CheckboxOption
                  label="By submitting this form, I verify that the following recipient
                have agreed and gave their consent to receive these SMS
                Messages."
                  labelStyle={{
                    justifyContent: 'center',
                    textAlign: 'justify',
                  }}
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </View>
          </View>

          <ScrollView>
            <Text style={styles.labelText}>Summary</Text>
            <View style={styles.columnInput}>
              <View style={styles.summaryStyle}>
                <Text style={styles.summaryLeft}>Credit Used</Text>
                <Text style={styles.summaryRight}>
                  {apicodeCampaignSummary.credits_summary || (
                    <SpinnerLoader
                      visible={true}
                      style={{marginHorizontal: 10}}
                    />
                  )}
                </Text>
              </View>
              <View style={{flexBasis: 10}}></View>
              <View style={styles.summaryStyle}>
                <Text style={styles.summaryLeft}>Price</Text>
                <Text style={styles.summaryRight}>
                  {apicodeCampaignSummary.price_summary ? (
                    apicodeCampaignSummary.price_summary !== 'N/A' ? (
                      `P${apicodeCampaignSummary.price_summary}`
                    ) : (
                      apicodeCampaignSummary.price_summary
                    )
                  ) : (
                    <SpinnerLoader
                      visible={true}
                      style={{marginHorizontal: 10}}
                    />
                  )}
                </Text>
              </View>
            </View>
            <FormInput
              label={{name: 'Campaign Name'}}
              value={campaignForm.campaign_name}
              disabled
              editable={false}
            />
            <FormInput
              label={{name: 'Campaign Status'}}
              value={
                campaignForm.campaign_status === 'ongoing'
                  ? 'Immediately'
                  : 'On Later Date'
              }
              disabled
              editable={false}
            />
            {campaignForm.campaign_status != 'ongoing' && (
              <FormInput
                label={{name: 'Scheduled Date'}}
                value={dayjs(campaignForm.schedule).format(
                  'MM/DD/YYYY HH:mm A',
                )}
                disabled
                editable={false}
              />
            )}
            <FormInput
              label={{name: 'Apicode'}}
              value={campaignForm.apicode_name}
              disabled
              editable={false}
            />
            <FormInput
              label={{name: 'Sender ID'}}
              value={campaignForm.senderid_name}
              disabled
              editable={false}
            />
            <FormInput
              label={{name: 'Directory'}}
              value={
                campaignForm.directory_id != -1
                  ? campaignForm.directory_name
                  : ''
              }
              disabled
              editable={false}
            />
            <FormInput
              label={{name: 'Custom No.'}}
              value={campaignForm.custom_no}
              disabled
              editable={false}
            />
            <FormInput
              label={{name: 'Your Message'}}
              isTextarea={true}
              value={campaignForm.campaign_message}
              disabled
              editable={false}
            />

            {/* <View style={{marginTop: 15, marginBottom: 25}}>
              <Text style={styles.recipientsText}>
                Listed below are the recipients with the corresponding credits
              </Text>
              <TouchableOpacity
                style={styles.seeMoreBtn}
                onPress={() =>
                  navigation.navigate('CampaignRecipientsScreen', {
                    directory_id: campaignForm.directory_id,
                  })
                }
                underlayColor="#fff">
                <Text style={styles.seeMoreBtnText}>View Recipients</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>
        <View style={styles.colBottom}></View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;

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
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
  },
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '70%',
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
  greenBtn: {
    backgroundColor: '#41BBA2',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
  },
  textNoti: {
    fontSize: 12,
    color: '#000',
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  radioStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    width: '100%',
  },
  radioItem: {
    flexDirection: 'row',
    width: '85%',
  },
  textLabel: {
    justifyContent: 'center',
    textAlign: 'justify',
    paddingTop: '3%',
    fontSize: 11,
  },
  sectionStyle: {
    flexDirection: 'column',
    height: 55,
    marginBottom: 10,
  },
  columnInput: {
    flexDirection: 'row',
    height: 45,
    marginTop: 5,
    marginBottom: 5,
  },
  summaryStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
  },
  summaryLeft: {
    flexBasis: 85,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryRight: {
    flexBasis: 50,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#2583E6',
    padding: 12,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    color: 'white',
  },
  recipientsText: {
    fontSize: 13,
    paddingVertical: 5,
    color: '#000',
  },
  seeMoreBtn: {
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 12,
  },
  seeMoreBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
