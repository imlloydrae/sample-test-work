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
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import EmptyList from '../../Components/EmptyList';
import IMAGES from '../../../constants/images';
import {listApiCodes} from '../../../actions/client';
import {
  listPackages,
  increaseCount,
  decreaseCount,
} from '../../../actions/package';

const BuyApiScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchApiCodes = () => dispatch(listApiCodes);
  const fetchPackagePlans = () => dispatch(listPackages);

  const [isComingSoon, setIsComingsoon] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const {clientData} = useSelector(state => state.clientReducer);
  const {packagePlans} = useSelector(state => state.packageReducer);
  const [buyApiForm, setBuyApiForm] = useState({
    apicode: {},
    package: {},
  });

  /* INIT */
  useEffect(() => {
    if (
      Object.keys(buyApiForm.apicode).length === 0 &&
      Object.keys(buyApiForm.package).length === 0
    ) {
      fetchApiCodes();
      fetchPackagePlans();
    }

    if (
      Object.keys(buyApiForm.apicode).length > 0 &&
      Object.keys(buyApiForm.package).length > 0
    )
      navigation.navigate('CartSummaryScreen', {data: buyApiForm});
  }, [buyApiForm]);

  /* FUNCTIONS */
  const onSelectApicode = apicode => {
    setBuyApiForm({...buyApiForm, apicode: apicode});
  };

  const onAddItem = item => {
    setItemCount(itemCount + 1);
    setTotalPrice(totalPrice + item.amount);
    dispatch(increaseCount(item.package_id));
  };

  const onSubtractItem = item => {
    setItemCount(itemCount - 1);
    setTotalPrice(totalPrice - item.amount);
    dispatch(decreaseCount(item.package_id));
  };

  const goToCartSummary = async packagePlan => {
    console.log(packagePlans.filter(i => i.count > 0));
    // if (Object.keys(buyApiForm.apicode).length === 0)
    //   Alert.alert('Please select an API!');
    // else setBuyApiForm({...buyApiForm, package: packagePlan});
  };

  return isComingSoon ? (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.goBack()}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>New API</Text>
            </TouchableOpacity>
          </View>
        </View>

        <EmptyList headerText="Coming Soon.." subText=" "></EmptyList>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.goBack()}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>New API</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <ScrollView>
            <View style={styles.sectionStyle}>
              <Text style={styles.labelText}>Choose API</Text>
              <SelectDropdown
                defaultButtonText={' '}
                data={clientData.apiCodes.map(code => code.apicode)}
                onSelect={(code, index) =>
                  onSelectApicode(clientData.apiCodes[index])
                }
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={styles.dropdownStyle}
                buttonTextStyle={styles.dropTextStyle}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#2583E6'}
                      size={11}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                dropdownStyle={styles.dropdownBoxStyle}
              />
            </View>

            <View style={styles.sectionStyle}>
              <Text style={styles.labelText}>Choose Package</Text>
              <View style={styles.cardStyle}>
                <Text style={styles.labelText}>All Plans Include</Text>
                <Text style={styles.dividerStyle}>__</Text>

                <View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>
                      7,200 Outgoing Sending Rate Per Minute
                    </Text>
                  </View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>
                      640 Max Characters Per SMS
                    </Text>
                  </View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>No Daily Limit</Text>
                  </View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>Direct SMS Server</Text>
                  </View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>No Receive Replies</Text>
                  </View>
                  <View style={styles.bulletRowStyle}>
                    <Image
                      source={IMAGES.IC_CHAT_TIC}
                      style={styles.bulletStyle}
                    />
                    <Text style={styles.bulletText}>Clean Footer</Text>
                  </View>
                </View>
              </View>

              <View style={styles.listContainer}>
                {packagePlans.map((item, index) => {
                  return (
                    <View style={styles.cardListStyle} key={index}>
                      <View style={styles.cardListHeader}>
                        <Text style={styles.cardLabelText}>{item.name}</Text>
                        <Text style={styles.boldText}>
                          {' '}
                          {'\u20B1'}
                          <Text style={styles.priceText}>
                            {parseFloat(item.amount).toLocaleString()}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.cardListHeader}>
                        <Text style={styles.dividerStyle}>__</Text>
                        <Text style={styles.subDescripton}>Prepaid</Text>
                      </View>

                      <Text style={styles.labelText}>Package Includes:</Text>
                      <View style={styles.packageDetails}>
                        <View style={{flexBasis: 215}}>
                          <View style={styles.bulletRowStyle}>
                            <Image
                              source={IMAGES.IC_CHAT_TIC}
                              style={styles.bulletStyle}
                            />
                            <Text style={styles.bulletText}>
                              <Text style={styles.boldText}>
                                {parseFloat(item.sms_credits).toLocaleString()}
                              </Text>{' '}
                              SMS Credits
                            </Text>
                          </View>
                          <View style={styles.bulletRowStyle}>
                            <Image
                              source={IMAGES.IC_CHAT_TIC}
                              style={styles.bulletStyle}
                            />
                            <Text style={styles.bulletText}>
                              <Text style={styles.boldText}>
                                {parseFloat(
                                  item.price_per_sms,
                                ).toLocaleString()}{' '}
                                price
                              </Text>{' '}
                              per sms
                            </Text>
                          </View>
                        </View>
                        <View style={styles.counterBox}>
                          {item.count > 0 ? (
                            <View style={styles.counterWrapper}>
                              <Text
                                style={styles.counterSign}
                                onPress={() => onSubtractItem(item)}>
                                -
                              </Text>
                              <Text style={styles.counterText}>
                                {item.count}
                              </Text>
                              <Text
                                style={styles.counterSign}
                                onPress={() => onAddItem(item)}>
                                +
                              </Text>
                            </View>
                          ) : (
                            <TouchableOpacity
                              style={styles.addToCartBtn}
                              onPress={() => onAddItem(item)}>
                              <Text style={styles.addToCartText}>+</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.checkoutStyle}>
        <TouchableOpacity
          style={styles.cartButtonStyle}
          onPress={() => goToCartSummary()}>
          <View style={{width: 100}}>
            <View style={styles.totalItems}>
              <Text style={styles.totalItemsText}>{itemCount}</Text>
            </View>
          </View>
          <Text style={styles.cartButtonTextStyle}>View Your Cart</Text>
          <View style={{width: 100}}>
            <Text style={styles.totalText}>
              {' '}
              {'\u20B1'}
              {parseFloat(totalPrice).toLocaleString()}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BuyApiScreen;

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
  labelText: {
    fontWeight: 'bold',
    color: '#000',
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
    padding: 8,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionStyle: {
    flexDirection: 'column',
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
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
    borderRadius: 5,
    borderColor: '#DDD',
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
    height: 10,
    width: 10,
    marginTop: 3,
  },
  bulletText: {
    marginLeft: 7,
    width: 300,
    color: '#000',
  },
  cardListStyle: {
    height: 180,
    color: 'white',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
  },
  cardListHeader: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButtonStyle: {
    width: '100%',
    backgroundColor: '#2583E6',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 8,
    marginTop: 15,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  priceText: {
    fontSize: 25,
    color: '#000',
  },
  cardLabelText: {
    marginTop: 10,
    color: '#000',
  },
  subDescripton: {
    fontSize: 15,
    color: '#2583E6',
    fontWeight: 'bold',
  },
  packageDetails: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  addToCartBtn: {
    width: 40,
    height: 40,
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: '#2583E6',
    borderRadius: 40,
    marginLeft: 56,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  counterBox: {
    flexBasis: 100,
    alignItems: 'flex-start',
  },
  counterWrapper: {
    flexDirection: 'row',
    height: 40,
    width: 95,
    borderWidth: 0.5,
    borderColor: '#2583E6',
    borderRadius: 20,
  },
  counterSign: {
    fontSize: 20,
    marginHorizontal: 13,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#2583E6',
  },
  counterText: {
    fontSize: 14,
    marginTop: 10,
    color: '#2583E6',
    textAlign: 'center',
    width: 17,
  },
  checkoutStyle: {
    height: 85,
    width: '100%',
    color: 'white',
    paddingHorizontal: 25,
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: '#2583E6',
  },
  cartButtonStyle: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#2583E6',
    borderWidth: 0,
    borderColor: '#2583E6',
    alignItems: 'center',
    borderRadius: 3,
    padding: 10,
    marginTop: 15,
  },
  cartButtonTextStyle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  totalItems: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'white',
  },
  totalItemsText: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: 'white',
    fontSize: 12,
  },
  totalText: {
    textAlign: 'right',
    color: 'white',
  },
});
