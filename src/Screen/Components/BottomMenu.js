import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';

const BottomMenu = ({navigation}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  _renderButtonOpen = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Image
          resizeMode={'contain'}
          source={IMAGES.IC_PLUS}
          style={styles.icons}
        />
      </View>
    </TouchableOpacity>
  );

  _renderButtonClose = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Image
          resizeMode={'contain'}
          source={IMAGES.IC_CLOSE}
          style={styles.icons}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {this._renderButtonOpen('Bottom half modal', () => setVisibleModal(true))}
      <Modal isVisible={visibleModal} style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View style={styles.menuBar}></View>
          <Text style={styles.menuHeader}>Menu</Text>
          <View style={styles.containerMenu}>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('CampaignListScreen');
              }}>
              <Image source={IMAGES.IC_CAMPAIGN} style={styles.icons} />
              <Text style={styles.menuTitle}>Campaign</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('TemplateListScreen');
              }}>
              <Image source={IMAGES.IC_TEMPLATE} style={styles.icons} />
              <Text style={styles.menuTitle}>Templates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.square}
              onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('DirectoryListScreen');
              }}>
              <Image source={IMAGES.IC_DIRECTORY} style={styles.icons} />
              <Text style={styles.menuTitle}>Directory</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerMenu}>
            <TouchableOpacity style={styles.square}>
              {/* onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('ReportScreen');
              }}> */}
              <Image source={IMAGES.IC_COMING_SOON} style={styles.icons} />
              <Text
                style={{...styles.menuTitle, color: '#2583E6', opacity: 0.4}}>
                Reports
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              {/* onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('CalendarScreen');
              }}> */}
              <Image source={IMAGES.IC_COMING_SOON} style={styles.icons} />
              <Text
                style={{...styles.menuTitle, color: '#2583E6', opacity: 0.4}}>
                Calendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.square}>
              {/* onPress={() => {
                setVisibleModal(false);
                navigation.navigation.navigate('TutorialScreen');
              }}> */}
              <Image source={IMAGES.IC_COMING_SOON} style={styles.icons} />
              <Text
                style={{...styles.menuTitle, color: '#2583E6', opacity: 0.4}}>
                Tutorial
              </Text>
            </TouchableOpacity>
          </View>
          {this._renderButtonClose('Close', () => setVisibleModal(false))}
        </View>
      </Modal>
    </View>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    margin: 4,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 25,
    marginBottom: 25,
    color: '#000',
  },
  menuBar: {
    borderWidth: 2,
    width: '10%',
    borderRadius: 5,
    marginVertical: 10,
    borderColor: '#2583E6',
    opacity: 0.3,
  },
  menuHeader: {
    fontSize: 20,
    marginBottom: 25,
    fontWeight: '600',
    color: '#2583E6',
  },
  button: {
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#F5FBFF',
    paddingBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  icons: {
    width: 30,
    height: 30,
  },
});
