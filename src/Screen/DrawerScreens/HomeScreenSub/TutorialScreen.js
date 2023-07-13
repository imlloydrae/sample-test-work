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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import EmptyList from '../../Components/EmptyList';
import IMAGES from '../../../constants/images';

const TutorialScreen = ({navigation}) => {
  const [isComingSoon, setIsComingsoon] = useState(true);

  return isComingSoon ? (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <Text style={styles.pageLabel}>Tutorial</Text>
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
            <Text style={styles.pageLabel}>Tutorial</Text>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <ScrollView>
            <View style={styles.sectionStyle}></View>

            <View style={styles.sectionStyle}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TutorialScreen;

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
    marginTop: 15,
    margin: 5,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
});
