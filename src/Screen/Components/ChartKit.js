import React, {useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import dayjs from 'dayjs';

import Dropdown from './Dropdown';

const ChartKit = ({loader, data, totalSent, onChangeWeek}) => {
  const [weeks, setWeeks] = useState([1, 2, 3, 4]);

  return (
    <>
      {data.length > 0 ? (
        <View style={styles.sectionStyle}>
          <View>
            <Text style={styles.labelText}>
              The month of {dayjs().format('MMM')}
            </Text>
          </View>

          <LineChart
            style={{marginLeft: -43, marginTop: 15}}
            data={{
              labels: data.map(item => dayjs(item.x).format('MM/DD')),
              datasets: [
                {
                  data: data.map(item => item.y),
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={165}
            chartConfig={{
              color: (opacity = 255) => `rgba(38,131,230, ${opacity})`,
              strokeWidth: 2,
              decimalPlaces: 0,
              labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
            }}
            bezier
            withHorizontalLines={false}
            withDots={false}
            transparent={true}
          />

          <View
            style={{
              flex: 0,
              flexDirection: 'row',
              alignContent: 'space-between',
              marginTop: 15,
              height: 30,
              width: '100%',
            }}>
            <Dropdown
              ddButtonStyle={{height: '100%', marginLeft: 20}}
              ddButtonTextStyle={{fontSize: 10}}
              ddRowTextStyle={{fontSize: 11}}
              iconSize={7}
              data={weeks.map(i => `Week ${i}`)}
              defaultSelected={`Week ${weeks[0]}`}
              onSelect={value => onChangeWeek(value)}
            />
            <Text style={styles.labelSms}>
              Total SMS Sent: {totalSent.toLocaleString('en-US')}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.sectionStyle}>
          <View>
            <Text style={styles.labelText}>
              The month of {dayjs().format('MMM')}
            </Text>
            <Text style={styles.loader}>
              {loader ? 'Loading...' : 'No available data'}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ChartKit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 5,
  },
  sectionStyle: {
    height: 300,
    marginTop: 15,
    backgroundColor: '#F5FBFF',
    borderRadius: 3,
    borderColor: '#DFEDFB',
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 20,
  },
  labelText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  labelCredit: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  labelSms: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 10,
    textAlign: 'left',
  },
  loader: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 100,
  },
});
