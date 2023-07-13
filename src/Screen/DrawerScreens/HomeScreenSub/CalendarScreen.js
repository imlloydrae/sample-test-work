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

const CalendarScreen = ({navigation}) => {
  const [isComingSoon, setIsComingsoon] = useState(true);

  return isComingSoon ? (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <Text style={styles.pageLabel}>Calendar</Text>
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
            <Text style={styles.pageLabel}>Calendar</Text>
          </View>
        </View>

        <View style={styles.colMiddle}>
          <ScrollView>
            <View style={styles.sectionStyle}>
              <View style={styles.calenderContainer}>
                <View style={styles.calendarHeader}>
                  <Text style={styles.calendarHeaderText}>January 2023</Text>
                  <View style={styles.calendarNavigator}>
                    <View style={styles.arrowWrapper}>
                      <FontAwesome
                        name="chevron-left"
                        color={'#2583E6'}
                        size={13}
                      />
                    </View>
                    <View style={styles.arrowWrapper}>
                      <FontAwesome
                        name="chevron-right"
                        color={'#2583E6'}
                        size={13}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.sectionStyle}>
              <View>
                <Text style={styles.labelText}>TODAY</Text>
                <View style={styles.todayContainer}>
                  <View style={styles.dateWrapper}>
                    <Text style={styles.dateText}>1</Text>
                  </View>
                  <View style={{flex: 12, marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        marginVertical: 2,
                      }}>
                      Campaign 1
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#fff',
                        marginVertical: 2,
                      }}>
                      Prepaid: SMS Blast
                    </Text>
                    <Text
                      style={{fontSize: 12, color: '#fff', marginVertical: 2}}>
                      Campaign Name: Test
                    </Text>
                  </View>
                  <View style={{flex: 1, marginVertical: 22}}>
                    <FontAwesome
                      name="chevron-right"
                      color={'#FFF'}
                      size={13}
                    />
                  </View>
                </View>
              </View>

              <View>
                <Text style={styles.labelText}>JANUARY</Text>
                <View style={styles.monthListContainer}>
                  <View style={styles.monthlyDateWrapper}>
                    <Text style={styles.monthlyDateText}>1</Text>
                  </View>
                  <View style={{flex: 12, marginHorizontal: 10}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: '#000',
                        marginVertical: 2,
                      }}>
                      Campaign 1
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 'bold',
                        color: '#777',
                        marginVertical: 2,
                      }}>
                      Prepaid: SMS Blast
                    </Text>
                    <Text
                      style={{fontSize: 12, color: '#999', marginVertical: 2}}>
                      Campaign Name: Test
                    </Text>
                  </View>
                  <View style={{flex: 1, marginVertical: 22}}>
                    <FontAwesome
                      name="chevron-right"
                      color={'#2583E6'}
                      size={13}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

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
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  calenderContainer: {
    height: 250,
    width: '100%',
    borderWidth: 0.2,
    borderRadius: 3,
    borderColor: '#aaa',
    alignSelf: 'center',
    padding: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarHeaderText: {
    flex: 4,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  calendarNavigator: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowWrapper: {
    height: 30,
    width: 30,
    backgroundColor: '#DFEDFB',
    paddingHorizontal: 9.5,
    paddingVertical: 8,
  },
  todayContainer: {
    flexDirection: 'row',
    height: 80,
    margin: 0,
    backgroundColor: '#2583E6',
    borderRadius: 3,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  monthListContainer: {
    flexDirection: 'row',
    height: 80,
    margin: 0,
    borderWidth: 0.2,
    borderColor: '#aaa',
    borderRadius: 3,
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
  },
  dateWrapper: {
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 3,
    paddingVertical: 13,
    paddingHorizontal: 17,
    width: 50,
  },
  dateText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#2583E6',
  },
  monthlyDateWrapper: {
    backgroundColor: '#DFEDFB',
    borderRadius: 3,
    paddingVertical: 13,
    paddingHorizontal: 17,
    width: 50,
  },
  monthlyDateText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#2583E6',
  },
});
