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
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Loader from '../../../Components/Loader';
import EmptyList from '../../../Components/EmptyList';
import IMAGES from '../../../../constants/images';
import {getEncodingDetails, stringLimiter} from '../../../../libraries/helpers';
import {listTemplates} from '../../../../actions/template';
import {updateCampaignForm} from '../../../../actions/campaign';

const CampaignTemplatesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const fetchTemplates = (page = 1) => dispatch(listTemplates(page));

  const {campaignTemplates} = useSelector(state => state.campaignReducer);
  const FORM = useSelector(state => state.campaignFormReducer);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /* INIT */
  useEffect(() => {
    Promise.all([setLoading(true), fetchTemplates()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  /* FUNCTIONS */
  const onSelectTemplate = item => {
    let msgData = getEncodingDetails(item.template_message);
    if (msgData.totalSegment > msgData.maxLimit) {
      Alert.alert('Template has reached the maximum limit of characters!');
      return;
    }

    dispatch(
      updateCampaignForm({
        smsLength: msgData.messageLength,
        smsParts: msgData.totalSegment,
        campaignForm: {
          ...FORM.campaignForm,
          campaign_message: item.template_message,
        },
      }),
    );

    navigation.goBack('CampaignScreen');
  };
  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchTemplates()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= campaignTemplates.meta.last_page) {
      Promise.all([setLoadingMore(true), fetchTemplates(nextPage)]).then(() =>
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
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.navigate('CampaignScreen')}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>Choose A Template</Text>
            </TouchableOpacity>
          </View>

          {/* <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => console.log('add')}>
              <Text style={styles.buttonTextStyle}>Add</Text>
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={styles.colMiddle}>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={campaignTemplates.data}
              renderItem={({item, index}) => (
                <TouchableHighlight
                  style={styles.listStyle}
                  key={`item_${item.id}`}
                  underlayColor={'#BAD8F7'}
                  onPress={() => onSelectTemplate(item)}>
                  <View style={styles.rowStyle}>
                    <Text style={styles.labelText}>
                      {stringLimiter(item.template_name)}
                    </Text>
                  </View>
                </TouchableHighlight>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
              ListFooterComponent={() =>
                loadingMore &&
                campaignTemplates.meta.last_page > 1 && (
                  <ActivityIndicator style={{marginVertical: 10}} />
                )
              }
              scrollEventThrottle={100}
              onEndReachedThreshold={0.7}
              onEndReached={() =>
                !loadingMore &&
                onLoadMore(campaignTemplates.meta.current_page + 1)
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CampaignTemplatesScreen;

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
  labelText: {
    fontWeight: 'bold',
    color: '#000',
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
  backButton: {
    height: 15,
    width: 15,
    paddingTop: 15,
    marginTop: 1,
  },
  listStyle: {
    height: 50,
    marginTop: 10,
    padding: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#BAD8F7',
    backgroundColor: '#FFF',
  },
  rowStyle: {
    flex: 0,
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
});
