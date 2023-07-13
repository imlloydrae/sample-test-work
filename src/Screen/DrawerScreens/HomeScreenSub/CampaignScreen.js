import React, {useState, useEffect} from 'react';
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
import {RadioButton} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import NetworkInfo from 'react-native-network-info';

import FormInput from '../../Components/FormInput';
import RadioButtonOption from '../../Components/RadioButtonOption';
import FormDropdown from '../../Components/FormDropdown';
import IMAGES from '../../../constants/images';
import {updateCampaignForm} from '../../../actions/campaign';
import {listApiCodes} from '../../../actions/client';
import {listAllDirectories} from '../../../actions/directory';
import {getEncodingDetails, resetScreenState} from '../../../libraries/helpers';

const CampaignScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchApiCodes = () =>
    dispatch(listApiCodes).then(() => setLoadingApiCodes(false));
  const fetchDirectories = () =>
    dispatch(listAllDirectories).then(() => setLoadingDirectories(false));

  const {clientData} = useSelector(state => state.clientReducer);
  const {directories} = useSelector(state => state.directoryReducer);
  const FORM = useSelector(state => state.campaignFormReducer);

  const [checked, setChecked] = React.useState(
    FORM.campaignForm.campaign_status,
  );
  const [loadingApiCodes, setLoadingApiCodes] = React.useState(true);
  const [loadingDirectories, setLoadingDirectories] = React.useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  /* INIT */
  useEffect(() => {
    Promise.all([fetchApiCodes(), fetchDirectories()])
      .then(() => {
        setLoadingApiCodes(false);
        setLoadingDirectories(false);
      })
      .catch(() => {
        setLoadingApiCodes(false);
        setLoadingDirectories(false);
      });
  }, []);

  /* FUNCTIONS */
  const onChangeName = name => {
    name === ''
      ? dispatch(
          updateCampaignForm({errors: {...FORM.errors, campaign_name: true}}),
        )
      : dispatch(
          updateCampaignForm({errors: {...FORM.errors, campaign_name: false}}),
        );

    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          campaign_name: name,
        },
      }),
    );
  };

  const onChangeStatus = status => {
    setChecked(status);
    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          campaign_status: status,
        },
      }),
    );
  };

  const onSelectDate = date => {
    setDatePickerVisibility(false);
    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          schedule: dayjs(date).format('YYYY-MM-DDTHH:mm'),
        },
      }),
    );
  };

  const onSelectApicode = apiCode => {
    dispatch(
      updateCampaignForm({
        senderIds: apiCode.sender_id,
        campaignForm: {
          ...FORM.campaignForm,
          apicode_id: apiCode.id,
          apicode_name: apiCode.apicode,
          senderid_id: '',
          senderid_name: '',
        },
        errors: {...FORM.errors, apicode_name: false},
      }),
    );
  };

  const onSelectSenderid = (id, index) => {
    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          senderid_id: FORM.senderIds[index].senderid_id,
          senderid_name: FORM.senderIds[index].senderid,
        },
        errors: {...FORM.errors, senderid_name: false},
      }),
    );
  };

  const onSelectDirectory = (id, index) => {
    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          directory_id: directories.data[index].id,
          directory_name: directories.data[index].directory_name,
        },
        errors: {
          ...FORM.errors,
          directory_name:
            FORM.campaignForm.custom_no == '' && directories.data[index].id <= 0
              ? true
              : false,
          custom_no:
            FORM.campaignForm.custom_no == '' && directories.data[index].id <= 0
              ? true
              : false,
        },
      }),
    );
  };

  const onChangeContact = contact => {
    dispatch(
      updateCampaignForm({
        campaignForm: {
          ...FORM.campaignForm,
          custom_no: contact,
        },
        errors: {
          ...FORM.errors,
          directory_name:
            contact == '' && FORM.campaignForm.directory_id <= 0 ? true : false,
          custom_no:
            contact == '' && FORM.campaignForm.directory_id <= 0 ? true : false,
        },
      }),
    );
  };

  const onTypeMessage = msg => {
    msg === ''
      ? dispatch(
          updateCampaignForm({
            errors: {...FORM.errors, campaign_message: true},
          }),
        )
      : dispatch(
          updateCampaignForm({
            errors: {...FORM.errors, campaign_message: false},
          }),
        );

    let msgData = getEncodingDetails(msg);
    if (msgData.totalSegment > msgData.maxLimit) {
      Alert.alert('You have reached the maximum limit of characters!');
      return;
    }

    dispatch(
      updateCampaignForm({
        smsLength: msgData.messageLength,
        smsParts: msgData.totalSegment,
        campaignForm: {
          ...FORM.campaignForm,
          campaign_message: msg,
        },
      }),
    );
  };

  const onAddStopMsg = () => {
    let msg = `${FORM.campaignForm.campaign_message}\n\nNo messages? Send STOP`;
    let msgData = getEncodingDetails(msg);
    if (msgData.totalSegment > msgData.maxLimit) {
      Alert.alert('You have reached the maximum limit of characters!');
      return;
    }

    dispatch(
      updateCampaignForm({
        smsLength: msgData.messageLength,
        smsParts: msgData.totalSegment,
        campaignForm: {
          ...FORM.campaignForm,
          campaign_message: msg,
        },
      }),
    );
  };

  const isInvalid = () => {
    let campaignErrors = {};

    Object.keys(FORM.campaignForm).forEach(i => {
      if (
        checked === 'scheduled' &&
        i == 'schedule' &&
        FORM.campaignForm[i] === ''
      ) {
        campaignErrors[i] = true;
      } else if (
        (i == 'directory_name' &&
          FORM.campaignForm[i] === '' &&
          FORM.campaignForm.custom_no === '') ||
        (FORM.campaignForm[i] === 'Select directory' &&
          FORM.campaignForm.custom_no == '')
      ) {
        campaignErrors[i] = true;
      } else if (
        i == 'custom_no' &&
        FORM.campaignForm[i] === '' &&
        FORM.campaignForm.directory_name == ''
      ) {
        campaignErrors[i] = true;
      } else if (
        i == 'senderid_name' &&
        FORM.campaignForm[i] === '' &&
        FORM.senderIds.length > 0
      ) {
        campaignErrors[i] = true;
      } else if (
        FORM.campaignForm[i] === '' &&
        i != 'custom_no' &&
        i != 'directory_name' &&
        i != 'directory_id' &&
        i != 'schedule' &&
        i != 'senderid_id' &&
        i != 'senderid_name'
      ) {
        campaignErrors[i] = true;
      }
    });

    dispatch(
      updateCampaignForm({
        errors: campaignErrors,
      }),
    );

    if (Object.keys(campaignErrors).length > 0) return true;
  };

  const onGoToNext = () => {
    if (isInvalid()) return;

    let summaryForm = {
      sms_parts: FORM.smsParts,
      apicode_id: FORM.campaignForm.apicode_id,
    };

    if (parseInt(FORM.campaignForm.directory_id) > 0)
      summaryForm['directory_id'] = FORM.campaignForm.directory_id;

    if (FORM.campaignForm.custom_no !== '')
      summaryForm['custom_no'] = FORM.campaignForm.custom_no;

    resetScreenState(navigation, 'VerificationScreen');
    navigation.navigate('VerificationScreen', {
      summary: summaryForm,
      campaign: FORM.campaignForm,
    });
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => {
                    setLoadingApiCodes(true);
                    setLoadingDirectories(true);
                    navigation.goBack();
                  }}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}>Create Campaign</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={onGoToNext}>
                  <Text style={styles.buttonTextStyle}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.colMiddle}>
              <FormInput
                label={{name: 'Campaign Name'}}
                inputName="campaign_name"
                onChangeText={name => onChangeName(name)}
                hasError={FORM.errors.campaign_name}
                value={FORM.campaignForm.campaign_name}
              />

              <View style={styles.sectionStyle}>
                <Text style={styles.labelText}>Set Schedule</Text>
                <View style={styles.radioStyle}>
                  <RadioButton.Group
                    onValueChange={newValue => onChangeStatus(newValue)}
                    value={checked}>
                    <View style={styles.radioItem}>
                      <RadioButtonOption
                        labelStyle={{fontWeight: 'normal', color: '#000'}}
                        label="Immediately"
                        value="ongoing"
                        status={checked === 'ongoing' ? 'checked' : 'unchecked'}
                        onValueChange={() => onChangeStatus('ongoing')}
                      />
                      <RadioButtonOption
                        labelStyle={{fontWeight: 'normal', color: '#000'}}
                        label="On Later Date"
                        value="scheduled"
                        status={
                          checked === 'scheduled' ? 'checked' : 'unchecked'
                        }
                        onValueChange={() => onChangeStatus('scheduled')}
                      />
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
              {checked === 'scheduled' && (
                <View style={styles.dateField}>
                  <View>
                    <FormInput
                      label={{name: 'Campaign Date/Time'}}
                      placeholder={
                        FORM.campaignForm.schedule
                          ? dayjs(FORM.campaignForm.schedule).format(
                              'MM/DD/YYYY HH:mm A',
                            )
                          : 'Select date'
                      }
                      inputName="custom_no"
                      onPressIn={() => setDatePickerVisibility(true)}
                      editable={false}
                      hasError={FORM.errors.schedule}
                      icon={{
                        icon: 'calendar',
                        color: '#2583E6',
                      }}
                      onPress={() => setDatePickerVisibility(true)}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="datetime"
                      date={dayjs(new Date()).add(5, 'm').toDate()}
                      minimumDate={dayjs(new Date()).add(1, 'm').toDate()}
                      onConfirm={onSelectDate}
                      onCancel={() => setDatePickerVisibility(false)}
                    />
                  </View>
                </View>
              )}

              <FormDropdown
                labelName="Apicode"
                defaultSelected={FORM.campaignForm.apicode_name}
                data={
                  clientData.apiCodes.length > 0
                    ? clientData.apiCodes.map(code => code.apicode)
                    : []
                }
                onSelect={(code, index) =>
                  onSelectApicode(clientData.apiCodes[index])
                }
                disabled={clientData.apiCodes.length == 0}
                hasError={
                  (!loadingApiCodes && clientData.apiCodes.length === 0) ||
                  FORM.errors.apicode_name
                }
                errorMsg={
                  FORM.errors.apicode_name
                    ? 'This field is required.'
                    : !loadingApiCodes
                    ? 'No available data.'
                    : ''
                }
              />

              {FORM.senderIds.length > 0 && (
                <FormDropdown
                  labelName="Sender ID"
                  defaultSelected={FORM.campaignForm.senderid_name}
                  data={FORM.senderIds.map(senderid => senderid.senderid)}
                  onSelect={(id, index) => onSelectSenderid(id, index)}
                  disabled={FORM.senderIds.length == 0}
                  hasError={FORM.errors.senderid_name}
                  errorMsg={
                    FORM.senderIds.length > 0 && FORM.errors.senderid_name
                      ? 'This field is required.'
                      : ''
                  }
                />
              )}

              <FormDropdown
                labelName="Directory"
                defaultSelected={FORM.campaignForm.directory_name}
                data={
                  directories.data.length > 0
                    ? directories.data.map(i => i.directory_name)
                    : []
                }
                onSelect={(id, index) => onSelectDirectory(id, index)}
                disabled={directories.data.length == 0}
                hasError={
                  (!loadingDirectories && directories.data.length === 0) ||
                  FORM.errors.directory_name
                }
                errorMsg={
                  FORM.errors.directory_name
                    ? 'Select directory or add contact manually'
                    : !loadingDirectories
                    ? 'No available data.'
                    : ''
                }
              />

              <FormInput
                label={{
                  name: 'Add Contact Manually',
                  subName: '(separate by comma)',
                }}
                inputName="custom_no"
                onChangeText={contact => onChangeContact(contact)}
                hasError={FORM.errors.custom_no}
                errorMsg={'Select directory or add contact manually'}
                value={FORM.campaignForm.custom_no}
              />

              <FormInput
                isTextarea={true}
                isSmsMsg={true}
                isTemplateEnabled={true}
                templateView={
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() =>
                      navigation.navigate('CampaignTemplatesScreen')
                    }>
                    <Ionicons
                      name="add-circle-outline"
                      color="#2583E6"
                      size={20}
                      style={{marginTop: -2}}
                    />
                    <Text style={styles.noMsgsText}>Select Template</Text>
                  </TouchableOpacity>
                }
                label={{name: 'Your Message'}}
                inputName="campaign_message"
                placeholder="Type Your Message Here.."
                smsDetails={{
                  smsParts: FORM.smsParts,
                  smsLength: FORM.smsLength,
                }}
                onChangeText={msg => onTypeMessage(msg)}
                value={FORM.campaignForm.campaign_message}
                hasError={FORM.errors.campaign_message}
              />

              <View style={{marginVertical: 15}}>
                <View style={{flexDirection: 'row', marginVertical: 5}}>
                  <Text style={styles.optoutText}>Add Opt-out</Text>
                  <Ionicons
                    name="information-circle"
                    color="#2583E6"
                    size={20}
                    onPress={() => console.log('info')}
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.subOptoutText}>
                    To add opt-out, just click this
                  </Text>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => onAddStopMsg()}>
                    <Ionicons
                      name="add-circle-outline"
                      color="#2583E6"
                      size={20}
                      style={{marginTop: -2}}
                    />
                    <Text style={styles.noMsgsText}>
                      No Messages? Send STOP
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default CampaignScreen;

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
  requiredWarning: {
    color: 'red',
    marginTop: 5,
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
    width: '100%',
  },
  textLabel: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: '3%',
  },
  scrollView: {
    narginHorizontal: 20,
  },
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  dtLabel: {
    fontSize: 13,
    color: 'black',
    textAlign: 'left',
  },
  dtView: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    width: '100%',
    padding: 15,
    marginRight: 10,
  },
  dateTimeView: {
    flex: 1,
    flexDirection: 'row',
  },
  optoutText: {
    marginTop: 3,
    fontWeight: 'bold',
    color: '#000',
  },
  subOptoutText: {
    fontSize: 11,
    marginTop: 3,
    marginRight: 5,
    color: '#000',
  },
  noMsgsText: {
    textDecorationLine: 'underline',
    fontSize: 11,
    marginTop: 3,
    color: '#2583E6',
  },
  // Style for iOS ONLY...
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    height: 260,
    display: 'flex',
  },
  dateField: {
    flex: 1,
    backgroundColor: 'white',
  },
});
