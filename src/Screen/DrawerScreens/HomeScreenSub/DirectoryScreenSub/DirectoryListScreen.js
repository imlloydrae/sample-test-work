import React, {useEffect, useState} from 'react';
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
  listDirectories,
  deleteDirectory,
  getDirectory,
} from '../../../../actions/directory';

const DirectoryListScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const fetchDirectories = (page = 1) => dispatch(listDirectories(page));

  const {directories} = useSelector(state => state.directoryReducer);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState();

  /* INIT */
  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([setLoading(true), fetchDirectories()])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [isFocused]);

  /* FUNCTIONS */
  const onViewContact = id => {
    setLoading(true);
    dispatch(getDirectory(id)).then(() => {
      setLoading(false);
      navigation.navigate('DirectoryContactListScreen');
    });
  };

  const onEditDirectory = id => {
    setLoading(true);
    dispatch(getDirectory(id)).then(() => {
      setLoading(false);
      navigation.navigate('EditDirectory');
    });
  };

  const onConfirm = id => {
    setConfirmVisible(!confirmVisible);
    setSelectedItem(id);
  };

  const onDeleteItem = id => {
    setConfirmVisible(!confirmVisible);

    setLoading(true);
    dispatch(deleteDirectory(id))
      .then(() => {
        fetchDirectories()
          .then(() => setLoading(false))
          .catch(() => setLoading(false));
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const onRefresh = () => {
    Promise.all([setRefreshing(true), fetchDirectories()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= directories.meta.last_page) {
      Promise.all([setLoadingMore(true), fetchDirectories(nextPage)]).then(() =>
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
              <Text style={styles.pageLabel}>Directory</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                resetScreenState(navigation, 'DirectoryScreen');
                navigation.navigate('DirectoryScreen');
              }}>
              <Text style={styles.buttonTextStyle}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={directories.data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.listTyle}
                  key={`item_${item.id}`}
                  onPress={() => onViewContact(item.id)}>
                  <View style={styles.rowStyle}>
                    <TouchableOpacity
                      style={styles.subRowStyle}
                      onPress={() => onEditDirectory(item.id)}>
                      <Image
                        source={IMAGES.IC_EDIT}
                        style={styles.editButton}
                      />
                      <Text style={styles.labelText}>
                        {stringLimiter(item.directory_name)}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={styles.labelText}
                      onPress={() => onConfirm(item.id)}>
                      <FontAwesome name="trash" color={'red'} size={15} />
                    </Text>
                  </View>
                  <View style={styles.hrStyle}></View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.subLabeltext}>{item.date_created}</Text>
                    <Text style={styles.subStatustext}>
                      Total Contacts: {item.contacts_count}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
              ListFooterComponent={() =>
                loadingMore &&
                directories.meta.last_page > 1 && (
                  <ActivityIndicator style={{marginVertical: 10}} />
                )
              }
              scrollEventThrottle={100}
              onEndReachedThreshold={0.01}
              onEndReached={() =>
                !loadingMore && onLoadMore(directories.meta.current_page + 1)
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DirectoryListScreen;

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
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
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
  subRowStyle: {
    flex: 0,
    flexDirection: 'row',
    width: 200,
  },
  editButton: {
    height: 13,
    width: 13,
    marginRight: 5,
    marginTop: 2,
    color: '#2583E6',
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
  subStatustext: {
    fontSize: 11,
    color: '#000',
  },
});
