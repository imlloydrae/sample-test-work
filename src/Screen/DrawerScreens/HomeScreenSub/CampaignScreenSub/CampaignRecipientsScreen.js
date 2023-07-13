import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import IMAGES from '../../../../constants/images';
import Loader from '../../../Components/Loader';
import EmptyList from '../../../Components/EmptyList';
import {getCampaignRecipients} from '../../../../actions/campaign';

const CampaignRecipientsScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {directory_id} = route.params;
  const fetchCampaignRecipients = (customNos, id, page = 1) =>
    dispatch(getCampaignRecipients(customNos, id, page));

  const {apicodeCampaignSummary} = useSelector(state => state.apicodeReducer);
  const {campaignRecipients} = useSelector(state => state.campaignReducer);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  /* INIT */
  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([
        setLoading(true),
        fetchCampaignRecipients(
          apicodeCampaignSummary.custom_recipients,
          directory_id,
        ),
      ])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [isFocused]);

  const onRefresh = () => {
    Promise.all([
      setRefreshing(true),
      fetchCampaignRecipients(
        apicodeCampaignSummary.custom_recipients,
        directory_id,
      ),
    ])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= campaignRecipients.meta.last_page) {
      Promise.all([
        setLoadingMore(true),
        fetchCampaignRecipients(
          apicodeCampaignSummary.custom_recipients,
          directory_id,
          nextPage,
        ),
      ]).then(() => setLoadingMore(false));
    } else {
      setLoadingMore(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.goBack('VerificationScreen')}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Recipients</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={campaignRecipients.data}
              renderItem={({item, index}) => (
                <View style={styles.listTyle} key={index}>
                  <View style={styles.rowStyle}>
                    <Text style={styles.labelText}>{item.mobile_no}</Text>
                    {/* <Text style={styles.labelText}>{item}</Text> */}
                  </View>
                  <View style={styles.hrStyle}></View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.subLabeltext}>
                      Credit Used:{' '}
                      {apicodeCampaignSummary.credits_used_per_recipient}
                    </Text>
                    <Text style={styles.subLabeltext}>
                      Price: {apicodeCampaignSummary.price_per_recipient}
                    </Text>
                  </View>
                </View>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
              ListFooterComponent={() =>
                loadingMore && (
                  <ActivityIndicator style={{marginVertical: 10}} />
                )
              }
              scrollEventThrottle={100}
              onEndReachedThreshold={0.01}
              onEndReached={() =>
                !loadingMore &&
                onLoadMore(campaignRecipients.meta.current_page + 1)
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CampaignRecipientsScreen;

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
