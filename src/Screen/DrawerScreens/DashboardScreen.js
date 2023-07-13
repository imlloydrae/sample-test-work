import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import IMAGES from '../../constants/images';
import Loader from '../Components/Loader';
import ChartKit from '../Components/ChartKit';
import Dropdown from '../Components/Dropdown';
import {getPersonalInfo, listApiCodes} from '../../actions/client';
import {getCreditsLeft} from '../../actions/apicode';
import {getCampaignChart, getTodaysCampaign} from '../../actions/campaign';

const DashboardScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchClientInfo = () => dispatch(getPersonalInfo);
  const fetchApiCodes = () => dispatch(listApiCodes);
  const fetchCampaignChartSent = (week = 1) => dispatch(getCampaignChart(week));
  const fetchTodaysCampaign = code => dispatch(getTodaysCampaign(code));

  const {apicodeCredits} = useSelector(state => state.apicodeReducer);
  const {clientData} = useSelector(state => state.clientReducer);
  const {campaignChart, todaysCampaign} = useSelector(
    state => state.dashboardReducer,
  );

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);

  /* INIT */
  useEffect(() => {
    if (campaignChart.length == 0) {
      Promise.all([
        setLoading(true),
        setChartLoading(true),
        fetchCampaignChartSent(1),
      ])
        .then(() => {
          setLoading(false);
          setChartLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setChartLoading(false);
        });
    }

    if (apicodeCredits.id != 0 && !refreshing) {
      Promise.all([setLoading(true), fetchTodaysCampaign(apicodeCredits.id)])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [campaignChart, apicodeCredits]);

  /* FUNCTIONS */
  const getCreditBalance = apiCode =>
    dispatch(getCreditsLeft(apiCode))
      .then(() => fetchTodaysCampaign(apiCode.id))
      .catch(err => {
        Alert.alert('Error', err);
      });

  const onRefresh = () => {
    Promise.all([
      setRefreshing(true),
      fetchClientInfo(),
      fetchApiCodes(),
      fetchCampaignChartSent(),
      fetchTodaysCampaign(
        Object.keys(apicodeCredits).length > 0 ? apicodeCredits.id : 0,
      ),
    ])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onChangeWeek = value => {
    let week = value.split(' ')[1];

    setChartLoading(true);
    fetchCampaignChartSent(week).then(() => {
      setChartLoading(false);
    });
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
              <Text style={{fontWeight: 'bold', color: '#000'}}>Dashboard</Text>
            </View>

            <View style={styles.menuContainer}>
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
            <View style={styles.sectionStyle}>
              <View style={styles.overviewTab}>
                <View style={styles.overviewStyle}>
                  <Text style={{color: '#2583E6', fontWeight: 'bold'}}>
                    SMS Overview
                  </Text>
                </View>
                <View>
                  <Dropdown
                    data={clientData.apiCodes.map(code => code.apicode)}
                    disabled={clientData.apiCodes.length == 0}
                    defaultSelected={
                      clientData.apiCodes.length == 0
                        ? 'No available data'
                        : apicodeCredits.code
                    }
                    onSelect={(code, index) =>
                      getCreditBalance(clientData.apiCodes[index])
                    }></Dropdown>
                </View>
              </View>
            </View>

            <View style={styles.sectionStyle}>
              <View style={styles.todayCreditStyle}>
                {todaysCampaign.length > 0 ? (
                  <View>
                    <View style={styles.todayCreditRow}>
                      <Text style={styles.labelText}>Today's Credit</Text>
                      <Text style={styles.dateCredit}>
                        {dayjs(new Date()).format('MMM DD, YYYY hh:mm A')}
                      </Text>
                    </View>

                    <View style={styles.campaignHeader}>
                      <View style={styles.campaignHeaderRow}>
                        <Text style={styles.campaignText}>Campaign</Text>
                        <Text style={styles.campaignCreditText}>Credit</Text>
                      </View>
                    </View>
                    <View style={{marginTop: 5}}>
                      {todaysCampaign.map((item, index) => {
                        return (
                          <View style={styles.listRowStyle} key={index}>
                            <Text style={styles.listText}>
                              {item.campaign_name}
                            </Text>
                            <Text style={styles.listText}>
                              -{item.credits_used}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.todayCreditRow}>
                      <Text style={styles.labelText}>Today's Credit</Text>
                    </View>
                    <Image
                      source={IMAGES.IC_EMPTY}
                      style={styles.image}
                      resizeMode="contain"
                    />
                    <View style={styles.emptyCredit}>
                      <Text style={styles.emptyCreditLabel}>
                        You haven't used your credits today.
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              <ChartKit
                loader={chartLoading}
                data={campaignChart}
                totalSent={
                  Object.keys(apicodeCredits).length > 0
                    ? apicodeCredits.total_sent
                    : 0
                }
                onChangeWeek={val => onChangeWeek(val)}
              />
            </View>
          </View>
          <View style={styles.colBottom}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;

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
  sectionStyle: {
    flexDirection: 'column',
    height: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  todayCreditStyle: {
    flexDirection: 'column',
    height: 180,
    marginTop: 20,
    margin: 0,
    backgroundColor: '#F5FBFF',
    borderRadius: 3,
    justifyContent: 'space-between',
    borderColor: '#DFEDFB',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  emptyCredit: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  todayCreditRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    marginHorizontal: 15,
  },
  emptyCreditLabel: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelText: {
    color: '#000',
    fontSize: 11,
    fontWeight: 'bold',
  },
  dateCredit: {
    color: '#999',
    fontSize: 11,
    textAlign: 'right',
  },
  campaignHeader: {
    backgroundColor: '#D4EAFF',
    height: 32,
    paddingVertical: 10,
  },
  campaignHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  campaignText: {
    textAlign: 'left',
    fontSize: 11,
    color: '#999',
  },
  campaignCreditText: {
    textAlign: 'right',
    fontSize: 11,
    color: '#999',
  },
  listRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 2,
  },
  listText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  menuContainer: {
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
  image: {
    width: '100%',
    height: '50%',
  },
  overviewTab: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 12,
    paddingLeft: 0,
  },
  overviewStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    paddingTop: 10,
    flexBasis: 154,
  },
});
