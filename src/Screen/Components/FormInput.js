import React from 'react';
import {StyleSheet, View, Text, TextInput, ImageEditor} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FormInput = props => {
  const {onPress, onChangeText, onPressIn, ...attr} = props;

  return (
    /* NORMAL TEXTAREA */
    attr.isTextarea && !attr.isSmsMsg ? (
      <View style={{...styles.formInput, ...attr.formInputStyle}}>
        <View style={styles.textareaLabel}>
          <Text style={styles.labelText}>{attr.label.name}</Text>
        </View>
        <TextInput
          style={styles.textAreaBox}
          keyboardType="default"
          placeholder={attr.placeholder}
          placeholderTextColor="#8b9cb5"
          underlineColorAndroid="#f000"
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          multiline={true}
          numberOfLines={4}
          name={attr.inputName}
          value={attr.value}
          onChangeText={onChangeText}
          editable={attr.editable}
        />
        {attr.hasError && (
          <Text style={styles.errorText}>
            {attr.errorMsg || 'This field is required.'}
          </Text>
        )}
      </View>
    ) : /* SMS TEXT AREA */
    attr.isTextarea && attr.isSmsMsg ? (
      <View style={{...styles.formInput, ...attr.formInputStyle}}>
        <View style={styles.textareaLabel}>
          <Text style={styles.textareaLabelText}>{attr.label.name}</Text>
          {attr.isTemplateEnabled && (
            <View style={styles.templateStyle}>{attr.templateView}</View>
          )}
        </View>
        <TextInput
          style={styles.textAreaBox}
          keyboardType="default"
          placeholder={attr.placeholder}
          placeholderTextColor="#8b9cb5"
          underlineColorAndroid="#f000"
          autoCapitalize="none"
          returnKeyType="next"
          blurOnSubmit={false}
          multiline={true}
          numberOfLines={4}
          name={attr.inputName}
          value={attr.value}
          onChangeText={onChangeText}
          editable={attr.editable}
        />
        {attr.hasError && (
          <Text style={styles.errorText}>
            {attr.errorMsg || 'This field is required.'}
          </Text>
        )}
        <View style={styles.smsTextArea}>
          <Text style={styles.textareaLabelText}></Text>
          <Text style={styles.textareaSublabelText}>
            SMS Parts: {attr.smsDetails.smsParts}
          </Text>
          <Text style={styles.textareaSublabelText}>
            SMS Length: {attr.smsDetails.smsLength}
          </Text>
        </View>
      </View>
    ) : (
      /* TEXT INPUT */
      <View style={{...styles.formInput, ...attr.formInputStyle}}>
        <Text style={{...styles.labelText, ...attr.labelStyle}}>
          {attr.label.name}
          <Text style={styles.sublabelText}>{attr.label.subName}</Text>
        </Text>
        <View style={{...styles.inputStyle, ...attr.inputStyle}}>
          <TextInput
            ref={attr.ref}
            style={{...styles.inputBox, ...attr.inputBoxStyle}}
            keyboardType={attr.keyboardType || 'default'}
            placeholder={attr.placeholder}
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            returnKeyType="next"
            underlineColorAndroid="#f000"
            blurOnSubmit={false}
            name={attr.inputName}
            value={attr.value}
            secureTextEntry={attr.secureTextEntry}
            disabled={attr.disabled}
            editable={attr.editable}
            onChangeText={onChangeText}
            onPressIn={onPressIn}
            onSubmitEditing={attr.onSubmitEditing}
          />
          {attr.icon && (
            <FontAwesome
              name={attr.icon.icon}
              color={attr.icon.color}
              size={16}
              onPress={onPress}
            />
          )}
        </View>
        {attr.hasError && (
          <Text style={styles.errorText}>
            {attr.errorMsg || 'This field is required.'}
          </Text>
        )}
      </View>
    )
  );
};

export default FormInput;

const styles = StyleSheet.create({
  formInput: {
    marginTop: 15,
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  sublabelText: {
    fontSize: 10,
    fontWeight: 'normal',
    color: '#000',
  },
  inputStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    paddingRight: 20,
  },
  inputBox: {
    flex: 1,
    height: 43,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F5FBFF',
    backgroundColor: '#F5FBFF',
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  textareaLabel: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
    color: '#000',
  },
  textareaLabelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    flex: 11,
    color: '#000',
  },
  textareaSublabelText: {
    marginTop: 3,
    fontSize: 11,
    flexBasis: 100,
    color: '#000',
    marginLeft: -5,
  },
  textAreaBox: {
    flex: 1,
    height: 150,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BAD8F7',
    backgroundColor: '#F5FBFF',
    paddingTop: 15,
    minHeight: 100,
  },
  smsTextArea: {
    flex: 0,
    flexDirection: 'row',
    alignContent: 'space-between',
    color: '#000',
    marginTop: 5,
  },
  templateStyle: {
    flex: 5,
    marginTop: 3,
    color: '#000',
  },
});
