import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';

import FormInput from '../../../Components/FormInput';
import IMAGES from '../../../../constants/images';

const CampaignSummary = ({navigation}) => {
  const {campaignDetails} = useSelector(state => state.campaignReducer);

  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.goBack()}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>
                {campaignDetails.campaign_name}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colMiddle}>
          <ScrollView>
            <View style={styles.rowStyle}>
              <Text style={styles.textLabel}>Campaign Status</Text>
              <Text style={styles.subTextLabel}>
                {campaignDetails.campaign_status}
              </Text>
            </View>

            {campaignDetails.schedule !== null && (
              <View style={styles.rowStyle}>
                <Text style={styles.textLabel}>Scheduled Date</Text>
                <Text style={styles.subTextLabel}>
                  {campaignDetails.schedule}
                </Text>
              </View>
            )}
            <View style={styles.rowStyle}>
              <Text style={styles.textLabel}>Sender ID</Text>
              <Text style={styles.subTextLabel}>
                {campaignDetails.sender_id}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.textLabel}>Directory</Text>
              <Text style={styles.subTextLabel}>
                {campaignDetails.directory}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.textLabel}>Custom No.</Text>
              <Text style={styles.subTextLabel}>
                {campaignDetails.custom_no}
              </Text>
            </View>
            <View style={styles.rowStyle}>
              <Text style={styles.textLabel}>Message</Text>
              <FormInput
                label={{name: ''}}
                formInputStyle={{marginTop: -15}}
                isTextarea={true}
                value={campaignDetails.campaign_message}
                editable={false}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.colBottom}></View>
      </View>
    </SafeAreaView>
  );
};

export default CampaignSummary;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
    marginTop: 20,
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
    width: '100%',
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
  sectionStyle: {
    flexDirection: 'column',
    height: 55,
    marginBottom: 10,
    marginLeft: 5,
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
    alignContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    marginRight: '2%',
  },
  summaryLeft: {
    flexBasis: 85,
    color: 'black',
    fontWeight: 'bold',
  },
  summaryRight: {
    flexBasis: 50,
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
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
  rowStyle: {
    alignContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderWidth: 0.5,
    borderBottomColor: '#BAD8F7',
    borderColor: '#fff',
  },
  textLabel: {
    flex: 1,
    fontSize: 10,
    textAlign: 'left',
    color: '#000',
  },
  subTextLabel: {
    flex: 1,
    flexBasis: 100,
    color: '#000',
    marginTop: 3,
  },
});
