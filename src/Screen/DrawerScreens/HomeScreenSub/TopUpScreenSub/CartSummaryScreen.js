import React from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import dayjs from 'dayjs';

import IMAGES from '../../../../constants/images';
import {generatePaymentUrl} from '../../../../libraries/helpers';
import {getDeepLink} from '../../../../utilities';

const CartSummaryScreen = ({navigation, route}) => {
  const dataField = route.params.data;

  const onCheckoutPayment = async () => {
    const randomNum = dayjs(new Date()).format('YmdHis');
    let url = await generatePaymentUrl(dataField.package.amount, randomNum);
    openLink(url);
  };

  const openLink = async url => {
    const deeplink = getDeepLink('topup');
    const paymentUrl = `${url}&redirect_uri=${deeplink}`;
    try {
      const isAvailable = await InAppBrowser.isAvailable();
      if (isAvailable) {
        InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: 'gray',
          preferredControlTintColor: 'white',

          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
        }).then(response => {
          console.log(response.type);
        });
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => navigation.navigate('TopUpScreen')}>
            <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
            <Text style={styles.pageLabel}>Top-Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.colMiddle}>
          <View style={styles.fieldStyle}>
            <Text style={styles.labelText}>Summary</Text>
          </View>

          <ScrollView>
            <View style={styles.sectionStyle}>
              <View style={styles.listContainer}>
                <View style={styles.cardListStyle}>
                  <View style={styles.cardListHeader}>
                    <Text style={styles.cardLabelText}>
                      {dataField.package.name}
                    </Text>
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
                          {parseFloat(
                            dataField.package.amount,
                          ).toLocaleString()}
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
                            dataField.package.price_per_sms,
                          ).toLocaleString()}{' '}
                          price
                        </Text>{' '}
                        per SMS
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.colBottom}>
          <View>
            <View style={styles.totalViewStyle}>
              <Text style={styles.totalText1}>Total</Text>
              <Text style={styles.totalText2}>
                {'\u20B1'}
                {parseFloat(dataField.package.amount).toLocaleString(
                  undefined,
                  {minimumFractionDigits: 2},
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.checkoutStyle}>
        <TouchableOpacity
          style={styles.addButtonStyle}
          onPress={onCheckoutPayment}>
          <Text style={styles.addButtonTextStyle}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartSummaryScreen;

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
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  sectionStyle: {
    flexDirection: 'column',
    margin: 5,
  },
  fieldStyle: {
    height: 30,
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
  cardListStyle: {
    height: 110,
    color: 'white',
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
  boldText: {
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
  totalViewStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 7,
  },
  totalCreditsText1: {
    flex: 0,
    flexDirection: 'row',
    flexBasis: 240,
  },
  totalCreditsText2: {
    flex: 0,
    flexDirection: 'row',
    flexBasis: 100,
    textAlign: 'right',
  },
  totalText1: {
    flex: 0,
    flexDirection: 'row',
    flexBasis: 240,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  totalText2: {
    flex: 0,
    flexDirection: 'row',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#000',
  },
  checkoutStyle: {
    height: 85,
    width: '100%',
    color: 'white',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 15,
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 0.3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderColor: '#2583E6',
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
});
