import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import IMAGES from '../../../../constants/images';

const PreviewScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.mainBody}>
      <View style={styles.container}>
        <View style={styles.colTop}>
          <View>
            <TouchableOpacity style={styles.radioItem}>
              <Image source={IMAGES.IC_BACK_BLACK} style={styles.backButton} />
              <Text style={styles.loginLabel}>Preview</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() =>
                navigation.navigate('VerificationScreen', route.params)
              }>
              <Text style={styles.buttonTextStyle}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.colMiddle}>
          <View>
            <Text style={styles.textNoti}>
              This is what your message may look like to your customers.
            </Text>
          </View>
          <View style={styles.previewHandler}>
            <Image
              source={IMAGES.PREVIEW_IMG}
              resizeMode="contain"
              style={styles.previewImg}
            />
          </View>
        </View>
        <View style={styles.colBottom}></View>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

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
  colExtra: {
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
  loginLabel: {
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
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  textNoti: {
    fontSize: 12,
    color: '#000',
  },
  previewImg: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewHandler: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
