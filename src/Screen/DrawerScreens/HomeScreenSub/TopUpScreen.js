import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Loader from '../../Components/Loader';
import Dropdown from '../../Components/Dropdown';
import EmptyList from '../../Components/EmptyList';
import IMAGES from '../../../constants/images';
import {listApiCodes} from '../../../actions/client';
import {listPackages} from '../../../actions/package';

const TopUpScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchApiCodes = () => dispatch(listApiCodes);
  const fetchPackagePlans = () => dispatch(listPackages);

  const {clientData} = useSelector(state => state.clientReducer);
  const {packagePlans} = useSelector(state => state.packageReducer);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [topupForm, setTopupForm] = useState({apicode: {}, package: {}});

  /* INIT */
  useEffect(() => {
    if (clientData.apiCodes.length === 0 || packagePlans.length === 0) {
      Promise.all([setLoading(true), fetchApiCodes(), fetchPackagePlans()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }

    if (
      Object.keys(topupForm.apicode).length > 0 &&
      Object.keys(topupForm.package).length > 0
    ) {
      navigation.navigate('CartSummaryScreen', {data: topupForm});
    }
  }, [topupForm]);

  /* FUNCTIONS */
  const onSelectApicode = apicode => {
    setTopupForm({...topupForm, apicode: apicode});
  };

  const goToCartSummary = async packagePlan => {
    if (Object.keys(topupForm.apicode).length === 0)
      Alert.alert('Please select an API!');
    else setTopupForm({...topupForm, package: packagePlan});
  };

  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchApiCodes(), fetchPackagePlans()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.goBack()}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Top-Up</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => navigation.navigate('TransactionHistoryScreen')}>
              <Text style={styles.buttonTextStyle}>Transaction History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <View style={styles.fieldStyle}>
            <Text style={styles.labelText}>Choose API</Text>
            <Dropdown
              ddButtonStyle={{width: '100%', borderRadius: 5}}
              disabled={clientData.apiCodes.length == 0}
              data={clientData.apiCodes.map(code => code.apicode)}
              defaultSelected={
                clientData.apiCodes.length == 0 ? 'No available data' : ''
              }
              onSelect={(code, index) =>
                onSelectApicode(clientData.apiCodes[index])
              }
            />
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.sectionStyle}>
              <View style={styles.listContainer}>
                {packagePlans.length > 0 ? (
                  packagePlans.map((item, index) => {
                    return (
                      <View style={styles.cardListStyle} key={index}>
                        <View style={styles.cardListHeader}>
                          <Text style={styles.cardLabelText}>{item.name}</Text>
                          <Text style={styles.boldText}>
                            <Text style={styles.subscriptionText}>Prepaid</Text>
                          </Text>
                        </View>
                        <View style={styles.cardListHeader}>
                          <Text style={styles.dividerStyle}>__</Text>
                        </View>

                        <View style={styles.bulletRowStyle}>
                          <View style={styles.bullet1Style}>
                            <Image
                              source={IMAGES.IC_CHAT_TIC}
                              style={styles.bulletStyle}
                            />
                            <Text style={styles.bulletTextStyle}>
                              <Text style={styles.boldText}>
                                {parseFloat(item.sms_credits).toLocaleString()}
                              </Text>{' '}
                              SMS Credits
                            </Text>
                          </View>

                          <View style={styles.bullet2Style}>
                            <Image
                              source={IMAGES.IC_CHAT_TIC}
                              style={styles.bulletStyle}
                            />
                            <Text style={styles.bulletTextStyle}>
                              <Text style={styles.boldText}>
                                {parseFloat(
                                  item.price_per_sms,
                                ).toLocaleString()}{' '}
                                price
                              </Text>{' '}
                              per SMS
                            </Text>
                          </View>
                        </View>

                        <View>
                          <TouchableOpacity
                            style={styles.addButtonStyle}
                            onPress={() => goToCartSummary(item)}>
                            <Text style={styles.addButtonTextStyle}>
                              + {'\u20B1'}
                              {parseFloat(item.amount).toLocaleString()}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                ) : (
                  <EmptyList headerText="No available packages" subText=" " />
                )}
              </View>
            </View>
          </ScrollView>
        </View>

        {/* <View style={styles.colBottom}>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default TopUpScreen;

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
  image: {
    width: '85%',
    height: '80%',
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
    fontWeight: 'bold',
    fontSize: 11,
  },
  sectionStyle: {
    flexDirection: 'column',
    margin: 5,
  },
  fieldStyle: {
    height: 70,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  dropdownStyle: {
    flex: 1,
    color: 'gray',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    width: '100%',
  },
  dropTextStyle: {
    justifyContent: 'flex-start',
    textAlign: 'left',
    fontSize: 13,
  },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: {
    color: '#444',
    textAlign: 'left',
    fontSize: 13,
  },
  dropdownBoxStyle: {
    borderRadius: 2,
  },
  cardStyle: {
    height: 240,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 0.2,
    borderColor: '#DDD',
  },
  cardListStyle: {
    height: 170,
    color: 'white',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#DDD',
  },
  cardListHeader: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dividerStyle: {
    color: '#2583E6',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  bulletRowStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  bulletStyle: {
    height: 12,
    width: 12,
    marginTop: 1,
  },
  bulletTextStyle: {
    fontSize: 12,
    marginLeft: 5,
    color: '#000',
  },
  bullet1Style: {
    flex: 0,
    flexDirection: 'row',
  },
  bullet2Style: {
    flex: 0,
    flexDirection: 'row',
  },
  addButtonStyle: {
    width: '100%',
    backgroundColor: '#2583E6',
    borderWidth: 0,
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 15,
    marginTop: 15,
  },
  addButtonTextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  boldTextBlack: {
    fontWeight: 'bold',
    color: '#000',
  },
  subscriptionText: {
    fontSize: 15,
    color: '#2583E6',
  },
  cardLabelText: {
    fontSize: 15,
    color: '#000',
  },
});
