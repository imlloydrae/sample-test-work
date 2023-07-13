import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

const SpinnerLoader = props => {
  const {visible, ...attr} = props;

  return (
    <ActivityIndicator
      //visibility of Overlay Loading Spinner
      visible={visible}
      //Text with the Spinner
      textContent={'Loading...'}
      //Text style of the Spinner Text
      style={attr.style}
      textStyle={styles.spinnerTextStyle}
    />
  );
};

export default SpinnerLoader;

const styles = StyleSheet.create({
  spinnerTextStyle: {},
});
