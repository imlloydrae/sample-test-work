import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Loader from '../../../Components/Loader';
import IMAGES from '../../../../constants/images';
import {listTransactions} from '../../../../actions/client';

const TransactionHistoryScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchTransactions = () => dispatch(listTransactions);

  const {clientData} = useSelector(state => state.clientReducer);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [creditSpent, setCreditSpent] = useState(0);

  /* INIT */
  useEffect(() => {
    if (
      clientData.transactions.length == 0 &&
      creditSpent == 0 &&
      !hasFetched
    ) {
      Promise.all([setLoading(true), fetchTransactions()])
        .then(() => {
          setLoading(false);
          setHasFetched(true);
        })
        .catch(() => {
          setLoading(false);
          setHasFetched(true);
        });
    }

    if (clientData.transactions.length > 0) {
      let spent = clientData.transactions.reduce((a, b) => {
        return a + parseInt(b['total_amount']);
      }, 0);

      setCreditSpent(
        parseFloat(spent).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
      );
    }
  }, [clientData, hasFetched]);

  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchTransactions()])
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
              onPress={() => navigation.navigate('TopUpScreen')}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Transaction History</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <View style={styles.creditBalStyle}>
            <View>
              <Text style={styles.labelCredit}>Credit Spent:</Text>
              <Text style={styles.labelAmount}>{creditSpent}</Text>
            </View>
          </View>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={clientData.transactions}
              renderItem={({item, index}) => (
                <View style={styles.listTyle} key={index}>
                  <View style={styles.rowStyle}>
                    <Text style={styles.labelText}>{item.name}</Text>
                    <Text style={styles.labelText}>
                      -
                      {parseFloat(item.total_amount).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </Text>
                  </View>
                  <View style={styles.hrStyle}></View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.subLabeltext}>{item.created_at}</Text>
                  </View>
                </View>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionHistoryScreen;

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
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colMiddle: {
    flex: 1,
  },
  labelText: {
    fontWeight: 'bold',
    color: '#000',
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
  creditBalStyle: {
    flexDirection: 'row',
    height: 80,
    marginTop: 20,
    margin: 0,
    backgroundColor: '#DFEDFB',
    borderRadius: 3,
    justifyContent: 'space-between',
    padding: 20,
  },
  labelCredit: {
    color: '#2583E6',
    fontSize: 11,
  },
  labelAmount: {
    color: '#2583E6',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listTyle: {
    height: 90,
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
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
});
