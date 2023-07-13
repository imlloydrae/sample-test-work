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

import CustomModal from '../../../Components/CustomModal';
import EmptyList from '../../../Components/EmptyList';
import Loader from '../../../Components/Loader';
import IMAGES from '../../../../constants/images';
import {
  listDirectoryContacts,
  deleteAllDirectoryContacts,
} from '../../../../actions/directory';
import {getContact, deleteContact} from '../../../../actions/contact';

const DirectoryContactListScreen = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const fetchDirectoryContacts = (id, page = 1) =>
    dispatch(listDirectoryContacts(id, page)).catch(err => Alert.alert(err));

  const {directoryContacts} = useSelector(
    state => state.directoryContactReducer,
  );
  const {directoryDetails} = useSelector(state => state.directoryReducer);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState();

  /* INIT */
  useEffect(() => {
    if (navigation.isFocused()) {
      Promise.all([
        setLoading(true),
        fetchDirectoryContacts(directoryDetails.id),
      ])
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [isFocused]);

  /* FUNCTIONS */
  const onAddContact = () => {
    dispatch({
      type: TYPES.UPDATE_CONTACT_FORM,
      payload: {
        contactForm: {
          mobile_no: '',
          custom_records: {},
          directory_id: 0,
        },
      },
    });
    navigation.navigate('AddDirectoryContact');
  };

  const onEditItem = id => {
    dispatch(getContact(directoryDetails.id, id)).then(() => {
      navigation.navigate('EditDirectoryContact', {id: id});
    });
  };

  const onConfirm = id => {
    setConfirmVisible(!confirmVisible);
    setSelectedItem(id);
  };

  const onDeleteItem = id => {
    setConfirmVisible(!confirmVisible);

    setLoading(true);
    dispatch(deleteContact(id))
      .then(() => {
        fetchDirectoryContacts(directoryDetails.id).then(() =>
          setLoading(false),
        );
      })
      .catch(err => {
        Alert.alert(err);
      });
  };

  const onRefresh = () => {
    Promise.all([
      setRefreshing(true),
      fetchDirectoryContacts(directoryDetails.id),
    ])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  const onLoadMore = nextPage => {
    if (nextPage <= directoryContacts.meta.last_page) {
      Promise.all([
        setLoadingMore(true),
        fetchDirectoryContacts(directoryDetails.id, nextPage),
      ]).then(() => setLoadingMore(false));
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
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => navigation.navigate('DirectoryListScreen')}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.pageLabel}>
                {directoryDetails.directory_name}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onAddContact()}>
              <Text style={styles.buttonTextStyle}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <Text style={styles.listLabel}>Contacts</Text>
          <View style={{height: '100%', marginBottom: 20}}>
            <FlatList
              data={directoryContacts.data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.listTyle}
                  key={index}
                  onPress={() => onEditItem(item.id)}>
                  <View style={styles.rowStyle}>
                    <View style={styles.subRowStyle}>
                      <Image
                        source={IMAGES.IC_EDIT}
                        style={styles.editButton}
                      />
                      <Text style={styles.labelText}>{item.mobile_no}</Text>
                    </View>
                    <Text
                      style={styles.labelText}
                      onPress={() => onConfirm(item.id)}>
                      <FontAwesome name="trash" color={'red'} size={15} />
                    </Text>
                  </View>
                  <View style={styles.hrStyle}></View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.subLabeltext}>{item.date_created}</Text>
                  </View>
                </TouchableOpacity>
              )}
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              ListEmptyComponent={() => <EmptyList />}
              ListFooterComponent={() =>
                loadingMore &&
                directoryContacts.meta.last_page > 1 && (
                  <ActivityIndicator style={{marginVertical: 10}} />
                )
              }
              scrollEventThrottle={100}
              onEndReachedThreshold={0.01}
              onEndReached={() =>
                !loadingMore &&
                onLoadMore(directoryContacts.meta.current_page + 1)
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DirectoryContactListScreen;

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
    marginBottom: 20,
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
  radioItem: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
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
  pageLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    width: 200,
    color: '#000',
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
  listLabel: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 10,
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
    fontSize: 11,
    fontWeight: 'bold',
  },
  subStatustext: {
    fontSize: 11,
    color: '#000',
  },
});
