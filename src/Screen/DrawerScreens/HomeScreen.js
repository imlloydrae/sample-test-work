import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import IMAGES from '../../constants/images';
import Loader from '../Components/Loader';
import SpinnerLoader from '../Components/SpinnerLoader';
import Dropdown from '../Components/Dropdown';
import {
  getPersonalInfo,
  getSavedRecords,
  listApiCodes,
} from '../../actions/client';
import {getCreditsLeft} from '../../actions/apicode';
import {resetCampaignForm} from '../../actions/campaign';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchClientInfo = () => dispatch(getPersonalInfo);
  const fetchShortcutRecords = () => dispatch(getSavedRecords);
  const fetchApiCodes = () => dispatch(listApiCodes);

  const {apicodeCredits} = useSelector(state => state.apicodeReducer);
  const {clientData} = useSelector(state => state.clientReducer);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingCredits, setLoadingCredits] = useState(false);

  /* INIT */
  useEffect(() => {
    Promise.all([setLoading(true), fetchClientInfo()])
      .then(() => {
        setLoading(false);
        fetchShortcutRecords();
        fetchApiCodes();
      })
      .catch(() => setLoading(false));
  }, []);

  /* FUNCTIONS */
  const getCreditBalance = apiCode => {
    setLoadingCredits(true);
    dispatch(getCreditsLeft(apiCode))
      .then(() => setLoadingCredits(false))
      .catch(err => {
        setLoadingCredits(false);
        Alert.alert('Error', err);
      });
  };

  const onRefresh = () => {
    Promise.all([
      setRefreshing(true),
      fetchClientInfo(),
      fetchShortcutRecords(),
      fetchApiCodes(),
    ])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.container}>
          <View style={styles.colTopMost}>
            <View style={styles.title}>
              <Text style={{fontWeight: 'bold', color: '#000'}}>Home</Text>
            </View>
            <View style={styles.btnContainer}>
              {/* add onpress function here when cart becomes available */}
              {/* <Ionicons name="cart-outline" color="#111" size={30} /> */}
            </View>
          </View>

          <View style={styles.colTop}>
            <Text style={styles.headerText}>Hello,</Text>
            <Text style={styles.headerText}>
              {clientData.info.firstname} {clientData.info.lastname}
            </Text>
          </View>
          <View style={styles.colMiddle}>
            <View style={styles.rowStyle}>
              <View style={styles.startedTab}>
                <View style={styles.letStartStyle}>
                  <Text style={{color: '#2583E6', fontWeight: 'bold'}}>
                    Let's Get Started!
                  </Text>
                </View>
                <View>
                  <Dropdown
                    disabled={clientData.apiCodes.length == 0}
                    data={clientData.apiCodes.map(code => code.apicode)}
                    defaultSelected={
                      clientData.apiCodes.length == 0
                        ? 'No available data'
                        : apicodeCredits.code
                    }
                    onSelect={(code, index) =>
                      getCreditBalance(clientData.apiCodes[index])
                    }
                  />
                </View>
              </View>
              <View style={styles.creditBalStyle}>
                <View>
                  <Text style={styles.labelCredit}>Credit Balance:</Text>
                  <Text style={styles.labelAmount}>
                    {Object.keys(apicodeCredits).length > 0 ? (
                      parseFloat(apicodeCredits.messages_left).toLocaleString()
                    ) : loadingCredits ? (
                      <SpinnerLoader visible={true} style={{marginTop: 10}} />
                    ) : (
                      0
                    )}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() =>
                      navigation.navigate('TopUpScreen', {screen: 'Top-Up'})
                    }>
                    <Text style={styles.buttonTextStyle}>+ Top-Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View /*style={styles.buyApiButtonBox}*/ style={{display: 'none'}}>
              <TouchableOpacity
                style={styles.buyApiButton}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('BuyApiScreen')}>
                <Text style={styles.buyApiText}>NEW API</Text>
                <Image
                  source={IMAGES.IC_ARROW_RIGHT}
                  style={styles.buyApiIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.sectionStyle}>
              <Text style={{color: '#2583E6', marginVertical: 10}}>
                Shortcut
              </Text>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIcon}>
                    <Image
                      source={IMAGES.IC_CAMPAIGN}
                      style={styles.shortIcons}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.titleIconText}>
                    <Text style={styles.labelShortCutBig}>Create Campaign</Text>
                    <Text style={styles.labelShortCut}>
                      {clientData.records.total_campaigns} Total Campaigns
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.roundArrow}
                    onPress={() => {
                      dispatch(resetCampaignForm());
                      navigation.push('CampaignScreen');
                    }}>
                    <Image
                      source={IMAGES.IC_ARROW_RIGHT}
                      style={styles.rightIconArr}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIcon}>
                    <Image
                      source={IMAGES.IC_DIRECTORY}
                      style={styles.shortIcons}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.titleIconText}>
                    <Text style={styles.labelShortCutBig}>
                      Create Directory
                    </Text>
                    <Text style={styles.labelShortCut}>
                      {clientData.records.total_directories} Total Directories
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.roundArrow}
                    onPress={() => navigation.push('DirectoryScreen')}>
                    <Image
                      source={IMAGES.IC_ARROW_RIGHT}
                      style={styles.rightIconArr}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.shortcutTab}>
                <View style={styles.shortcutWrapper}>
                  <View style={styles.titleIcon}>
                    <Image
                      source={IMAGES.IC_TEMPLATE}
                      style={styles.shortIcons}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.titleIconText}>
                    <Text style={styles.labelShortCutBig}>Create Template</Text>
                    <Text style={styles.labelShortCut}>
                      {clientData.records.total_templates} Total Templates
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.roundArrow}
                    onPress={() => navigation.push('TemplateScreen')}>
                    <Image
                      source={IMAGES.IC_ARROW_RIGHT}
                      style={styles.rightIconArr}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  rowStyle: {
    flexDirection: 'column',
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  creditBalStyle: {
    flexDirection: 'row',
    height: 80,
    margin: 0,
    backgroundColor: '#2583E6',
    borderRadius: 3,
    justifyContent: 'space-between',
    padding: 20,
  },
  shortcutTab: {
    flexDirection: 'row',
    height: 70,
    marginVertical: 3,
    backgroundColor: '#DFEDFB',
    borderRadius: 3,
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  startedTab: {
    flexDirection: 'row',
    height: 60,
    margin: 0,
    justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 0,
  },
  labelShortCut: {
    color: '#2583E6',
    fontSize: 11,
  },
  labelShortCutBig: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  shortcutWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  letStartStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 10,
    flexBasis: 154,
  },
  labelCredit: {
    color: '#fff',
    fontSize: 11,
  },
  labelAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 3,
  },
  sectionStyle: {
    flexDirection: 'column',
    marginTop: 40,
    marginHorizontal: 5,
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderWidth: 0,
    color: '#2583E6',
    borderColor: '#2583E6',
    height: 35,
    alignItems: 'center',
    borderRadius: 3,
    paddingHorizontal: 15,
    marginVertical: '5%',
  },
  buttonTextStyle: {
    color: '#2583E6',
    marginTop: 12,
    fontSize: 10,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 8,
    maxHeight: 400,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 8,
    maxHeight: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundArrow: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderColor: '#2583E6',
    backgroundColor: '#2583E6',
    borderWidth: 1,
    marginRight: 5,
  },
  roundBell: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    borderColor: '#2583E6',
    borderWidth: 1,
    marginRight: 5,
  },
  roundButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#2583E6',
  },
  icons: {
    width: '100%',
    height: '100%',
  },
  titleIcon: {
    width: '12%',
  },
  titleIconText: {
    width: '50%',
  },
  shortIcons: {
    width: '60%',
    height: '60%',
  },
  rightIconArr: {
    width: '100%',
    height: '100%',
  },
  buyApiButtonBox: {
    height: 20,
    marginTop: 25,
  },
  buyApiButton: {
    flexDirection: 'row',
    backgroundColor: '#3D2DD9',
    borderWidth: 0,
    height: 50,
    borderRadius: 3,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buyApiText: {
    color: 'white',
    paddingVertical: 15,
    fontSize: 16,
  },
  buyApiIcon: {
    height: 20,
    width: 20,
    marginLeft: '70%',
    marginTop: '5%',
  },
});
