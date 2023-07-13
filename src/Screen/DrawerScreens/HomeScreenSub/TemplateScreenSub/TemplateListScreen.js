import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Loader from '../../../Components/Loader';
import CustomModal from '../../../Components/CustomModal';
import EmptyList from '../../../Components/EmptyList';
import IMAGES from '../../../../constants/images';
import {resetScreenState, stringLimiter} from '../../../../libraries/helpers';
import {
  listTemplates,
  deleteTemplate,
  getTemplate,
} from '../../../../actions/template';

const TemplateListScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const fetchTemplates = (page = 1) => dispatch(listTemplates(page));

  const {templates} = useSelector(state => state.templateReducer);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState();

  /* INIT */
  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([setLoading(true), fetchTemplates()])
        .then(() => {
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isFocused]);

  /* FUNCTIONS */
  const onEditItem = id => {
    setLoading(true);
    dispatch(getTemplate(id)).then(() => {
      setLoading(false);
      navigation.navigate('EditTemplateScreen', {id: id});
    });
  };

  const onConfirm = id => {
    setConfirmVisible(!confirmVisible);
    setSelectedItem(id);
  };

  const onDeleteItem = id => {
    setConfirmVisible(!confirmVisible);

    setLoading(true);
    dispatch(deleteTemplate(id))
      .then(() => {
        fetchTemplates()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchTemplates()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= templates.meta.last_page) {
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
              <Text style={styles.pageLabel}>Template</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                resetScreenState(navigation, 'TemplateScreen');
                navigation.navigate('TemplateScreen');
              }}>
              <Text style={styles.buttonTextStyle}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={templates.data}
              renderItem={({item, index}) => (
                <View style={styles.listStyle} key={`item_${item.id}`}>
                  <View style={styles.rowStyle}>
                    <View style={styles.subRowStyle}>
                      {/* <Image
                            source={IMAGES.IC_EDIT}
                            style={styles.editButton}
                          /> */}
                      <Text style={styles.labelText}>
                        {stringLimiter(item.template_name)}
                      </Text>
                    </View>
                    <Text
                      style={styles.labelText}
                      onPress={() => onConfirm(item.id)}>
                      <FontAwesome name="trash" color={'red'} size={15} />
                    </Text>
                  </View>

                  <View style={styles.hrStyle}></View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.subLabeltext}>{item.date_updated}</Text>
                  </View>
                  <View style={styles.hrStyle}></View>

                  <TouchableOpacity
                    style={styles.subRowStyle}
                    onPress={() => onEditItem(item.id)}>
                    <Image source={IMAGES.IC_EDIT} style={styles.editButton} />
                    <Text style={styles.editText}>Edit Template</Text>
                  </TouchableOpacity>
                  <View style={styles.rowStyle}>
                    <Text style={styles.descriptionText} numberOfLines={3}>
                      {item.template_message}
                    </Text>
                  </View>
                </View>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
              ListFooterComponent={() =>
                loadingMore &&
                templates.meta.last_page > 1 && (
                  <ActivityIndicator style={{marginVertical: 10}} />
                )
              }
              scrollEventThrottle={100}
              onEndReachedThreshold={0.01}
              onEndReached={() =>
                !loadingMore && onLoadMore(templates.meta.current_page + 1)
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TemplateListScreen;

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
  image: {
    width: '85%',
    height: '80%',
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
  listStyle: {
    height: 170,
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
  subRowStyle: {
    flex: 0,
    flexDirection: 'row',
    width: 270,
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 11,
    color: '#000',
  },
  editButton: {
    height: 13,
    width: 13,
    marginRight: 5,
    marginTop: 2,
    color: '#2583E6',
  },
  editText: {
    fontWeight: 'bold',
    color: '#2583E6',
    fontSize: 13,
  },
});
