import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Loader from '../../../Components/Loader';
import FormInput from '../../../Components/FormInput';
import CustomModal from '../../../Components/CustomModal';
import IMAGES from '../../../../constants/images';
import {getEncodingDetails} from '../../../../libraries/helpers';
import {
  updateTemplate,
  updateTemplateForm,
  resetTemplateForm,
} from '../../../../actions/template';

const EditTemplateScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const FORM = useSelector(state => state.templateFormReducer);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  /* FUNCTIONS */
  const onChangeName = name => {
    name === ''
      ? dispatch(
          updateTemplateForm({errors: {...FORM.errors, template_name: true}}),
        )
      : dispatch(
          updateTemplateForm({errors: {...FORM.errors, template_name: false}}),
        );

    dispatch(
      updateTemplateForm({
        templateForm: {
          ...FORM.templateForm,
          template_name: name,
        },
      }),
    );
  };

  const onTypeMessage = msg => {
    msg === ''
      ? dispatch(
          updateTemplateForm({
            errors: {...FORM.errors, template_message: true},
          }),
        )
      : dispatch(
          updateTemplateForm({
            errors: {...FORM.errors, template_message: false},
          }),
        );

    let msgData = getEncodingDetails(msg);
    if (msgData.totalSegment > msgData.maxLimit) {
      Alert.alert('You have reached the maximum limit of characters!');
      return;
    }

    dispatch(
      updateTemplateForm({
        smsLength: msgData.messageLength,
        smsParts: msgData.totalSegment,
        templateForm: {
          ...FORM.templateForm,
          template_message: msg,
        },
      }),
    );
  };

  const onUpdateTemplate = () => {
    if (isInvalid()) return;

    let form = {...FORM.templateForm, template_id: route.params.id};

    setLoading(true);
    dispatch(updateTemplate(form))
      .then(response => {
        dispatch(resetTemplateForm());
        setLoading(false);
        setVisible(!visible);
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Error', error);
      });
  };

  const isInvalid = () => {
    let templateErrors = {};

    Object.keys(FORM.templateForm).forEach(i => {
      if (FORM.templateForm[i] === '') {
        templateErrors[i] = true;
      }
    });

    dispatch(
      updateTemplateForm({
        errors: templateErrors,
      }),
    );

    if (Object.keys(templateErrors).length > 0) return true;
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <KeyboardAwareScrollView behavior="position" enabled>
        <ScrollView>
          <View style={styles.container}>
            <CustomModal
              isVisible={!visible}
              alertLabel="Success!"
              alertMsg="Your template was successfully updated."
              buttonText="OK"
              onPress={() => {
                setVisible(!visible);
                navigation.goBack('TemplateListScreen');
              }}
            />
            <View style={styles.colTop}>
              <View>
                <TouchableOpacity
                  style={styles.radioItem}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={IMAGES.IC_BACK_BLACK}
                    style={styles.backButton}
                  />
                  <Text style={styles.pageLabel}>Edit Template</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={onUpdateTemplate}>
                  <Text style={styles.buttonTextStyle}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.colMiddle}>
              <FormInput
                label={{name: 'Template Name'}}
                inputName="template_name"
                value={FORM.templateForm.template_name}
                onChangeText={name => onChangeName(name)}
                hasError={FORM.errors.template_name}
              />

              <FormInput
                isTextarea={true}
                isSmsMsg={true}
                label={{name: 'Your Message'}}
                inputName="template_message"
                smsDetails={{
                  smsParts: FORM.smsParts,
                  smsLength: FORM.smsLength,
                }}
                value={FORM.templateForm.template_message}
                onChangeText={msg => onTypeMessage(msg)}
                hasError={FORM.errors.template_message}
              />
            </View>

            <View style={styles.colBottom}></View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditTemplateScreen;

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
  colBottom: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: 5,
  },
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  buttonStyle: {
    backgroundColor: '#41BBA2',
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
  firstInput: {
    flexDirection: 'column',
    height: 70,
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 0.2,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
  },
  textAreaInput: {
    flexDirection: 'column',
    height: 150,
    marginTop: 15,
    margin: 5,
  },
  textArea: {
    flex: 1,
    color: 'black',
    paddingHorizontal: 15,
    paddingTop: 15,
    borderWidth: 1,
    borderRadius: 0.2,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    minHeight: 100,
  },
  textAreaInputLabelStyle: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  inputLabelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    flexBasis: 150,
  },
  subLabelText: {
    marginTop: 3,
    fontSize: 11,
    flexBasis: 95,
  },
});
