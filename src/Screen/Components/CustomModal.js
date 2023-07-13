import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import IMAGES from '../../constants/images';

const CustomModal = props => {
  const {isVisible, onPress, isClosed, ...attr} = props;

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Image
          source={
            attr.status == 1
              ? IMAGES.IC_ERROR
              : attr.status == 2
              ? IMAGES.IC_WARNING
              : IMAGES.IC_SUCCESS
          }
          resizeMode="contain"
          style={styles.imgSrc}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.labelText}>{attr.alertLabel}</Text>
          <Text style={styles.msgText}>{attr.alertMsg}</Text>
        </View>

        {/* 1 = error, 2 = warning/confirmation */}
        {attr.status == 1 || attr.status == 2 ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={isClosed}>
              <View
                style={{
                  ...styles.button,
                  borderWidth: 1,
                  borderColor: 'red',
                  backgroundColor: 'white',
                }}>
                <Text style={{...styles.buttonTextStyle, color: 'red'}}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <View style={{...styles.button, backgroundColor: 'red'}}>
                <Text style={styles.buttonTextStyle}>{attr.buttonText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
              <Text style={styles.buttonTextStyle}>{attr.buttonText}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2583E6',
    padding: 12,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 5,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  imgSrc: {
    height: 120,
    width: 120,
    marginBottom: 15,
  },
  textWrapper: {
    textAlign: 'left',
    paddingLeft: 5,
    paddingRight: 5,
  },
  labelText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  msgText: {
    fontSize: 15,
    color: '#000',
  },
});
