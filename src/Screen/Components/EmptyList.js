import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import IMAGES from '../../constants/images';

const EmptyList = attributes => {
  return (
    <View style={styles.blankDisplay}>
      <Image source={IMAGES.TODAY_CREDIT} style={styles.blankImage} />
      <Text style={styles.textStyle}>
        {attributes.headerText || 'No Data?'}
      </Text>
      <Text style={styles.textStyle}>
        {attributes.subText || 'Start Creating Now!'}
      </Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  blankDisplay: {
    padding: 100,
    marginTop: 150,
  },
  textStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    textAlign: 'center',
  },
  blankImage: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginLeft: -10,
    marginBottom: 10,
  },
});
