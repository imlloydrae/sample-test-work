import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Loader from '../../../Components/Loader';
import EmptyList from '../../../Components/EmptyList';
import CustomModal from '../../../Components/CustomModal';
import CustomSwitch from '../../../Components/CustomSwitch';
import {resetScreenState, stringLimiter} from '../../../../libraries/helpers';
import {
  listCampaigns,
  getCampaign,
  deleteCampaign,
  resetCampaignForm,
} from '../../../../actions/campaign';

const CampaignListScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const fetchCampaigns = (page = 1) => dispatch(listCampaigns(page));

  const {campaigns} = useSelector(state => state.campaignReducer);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [campaignType, setCampaignType] = useState(1);
  const [selectedItem, setSelectedItem] = useState();

  /* INIT */
  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([setLoading(true), fetchCampaigns()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [isFocused]);

  /* FUNCTIONS */
  const onCreateCampaign = () => {
    dispatch(resetCampaignForm());
    resetScreenState(navigation, 'CampaignScreen');
    navigation.navigate('CampaignScreen');
  };

  const onViewCampaign = item => {
    dispatch(getCampaign(item.id)).then(() => {
      navigation.navigate('CampaignSummary');
    });
  };

  const onSelectSwitch = index => {
    setCampaignType(index);
  };

  const onConfirm = id => {
    setConfirmVisible(!confirmVisible);
    setSelectedItem(id);
  };

  const onDeleteItem = id => {
    setConfirmVisible(!confirmVisible);

    setLoading(true);
    dispatch(deleteCampaign(id))
      .then(() => {
        fetchCampaigns()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchCampaigns()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= campaigns.meta.last_page) {
      Promise.all([setLoadingMore(true), fetchCampaigns(nextPage)]).then(() =>
        setLoadingMore(false),
      );
    } else {
      setLoadingMore(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainBody}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <CustomModal
          isVisible={!confirmVisible}
          alertLabel="Are you sure you want to delete this?"
          status={2}
          buttonText="Delete"
          isClosed={() => setConfirmVisible(!confirmVisible)}
          onPress={() => onDeleteItem(selectedItem)}
        />
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity style={styles.radioItem}>
              <Text style={styles.pageLabel}>Campaign</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onCreateCampaign()}>
              <Text style={styles.buttonTextStyle}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colMiddle}>
          <View style={styles.switchBg}>
            <CustomSwitch
              selectionMode={1}
              roundCorner={true}
              option1={'SMS Blast'}
              option2={'Two-Way SMS'}
              onSelectSwitch={onSelectSwitch}
              selectionColor={'#2583E6'}
            />
          </View>

          {campaignType == 1 ? (
            <View style={{height: '100%', marginBottom: 20}}>
              <FlatList
                data={campaigns.data}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    style={styles.listStyle}
                    key={`item_${item.id}`}
                    onPress={() => onViewCampaign(item)}>
                    <View style={styles.rowStyle}>
                      <Text style={styles.labelText}>
                        {stringLimiter(item.campaign_name)}
                      </Text>
                      <Text
                        style={styles.labelText}
                        onPress={() => onConfirm(item.id)}>
                        <FontAwesome name="trash" color={'red'} size={15} />
                      </Text>
                    </View>
                    <View style={styles.hrStyle}></View>
                    <View style={styles.rowStyle}>
                      <View>
                        <Text style={styles.subLabeltext}>
                          {item.date_created}
                        </Text>
                        <Text style={styles.subLabeltext}>
                          {item.sender_id}
                        </Text>
                      </View>

                      <Text style={styles.subStatustext}>
                        {item.campaign_status}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
                  !loadingMore && onLoadMore(campaigns.meta.current_page + 1)
                }
              />
            </View>
          ) : (
            <EmptyList headerText="Coming soon.." subText=" "></EmptyList>
          )}
        </View>
        <View style={styles.colBottom}></View>
      </View>
    </SafeAreaView>
  );
};

export default CampaignListScreen;

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
  radioItem: {
    flexDirection: 'row',
    width: '100%',
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
    padding: 5,
    width: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listStyle: {
    height: 90,
    marginTop: 10,
    padding: 15,
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
  subStatustext: {
    fontSize: 11,
    color: '#2583E6',
  },
  labelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  switchBg: {
    backgroundColor: '#C8E0F9',
    padding: 3,
    borderRadius: 5,
    marginBottom: 20,
  },
});
