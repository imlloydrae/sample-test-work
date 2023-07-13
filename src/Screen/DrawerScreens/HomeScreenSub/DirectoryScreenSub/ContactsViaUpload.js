import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';

import {
  updateDirectoryForm,
  downloadTemplate,
} from '../../../../actions/directory';
import {formatBytes, textLimiter} from '../../../../libraries/helpers';

const ContactsViaUpload = ({navigation}) => {
  const dispatch = useDispatch();
  const [uploadInfo, setUploadInfo] = useState({
    name: '',
    size: '',
    percentage: 0,
  });

  const selectFile = async () => {
    setUploadInfo({
      name: '',
      size: '',
      percentage: 0,
    });

    try {
      const doc = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.csv,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
        ],
      });

      if (formatBytes(doc.size) > 10) {
        Alert.alert('Error', 'Maximum file exceeded!');
        return;
      } else {
        dispatch(
          updateDirectoryForm({
            contacts: doc,
          }),
        );

        setUploadInfo({
          name: textLimiter(doc.name),
          size: `${formatBytes(doc.size)} MB`,
          percentage: 1,
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // do nothing
      } else {
        Alert.alert('Unknown Error', JSON.stringify(err));
      }
    }
  };

  return (
    <View style={{marginLeft: 10, marginTop: 5}}>
      <View style={styles.descriptionContainer}>
        <View styles={styles.descriptionText}>
          <Text style={styles.description}>
            Upload excel format maximum of{' '}
            <Text style={styles.highlightText}>10MB size.</Text>
          </Text>
          <Text style={styles.description}>
            Download sample file{' '}
            <Text
              style={styles.ancLink}
              onPress={() =>
                Linking.openURL('https://diy.itexmo.com/api/contacts/dl/format')
              }>
              here.
            </Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonUploadStyle} onPress={selectFile}>
          <Text style={styles.buttonUploadTextStyle}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.uploadSection}>
        <View style={styles.uploadContainer}>
          <Text style={styles.labelText}>Upload</Text>
          <ProgressBar
            progress={uploadInfo.percentage}
            color={MD3Colors.error50}
          />
          <View style={styles.infoStyle}>
            <Text style={styles.description}>Filename: {uploadInfo.name}</Text>
            <Text style={styles.description}>Size: {uploadInfo.size}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ContactsViaUpload;

const styles = StyleSheet.create({
  uploadSection: {
    height: 100,
    marginVertical: 20,
    width: '100%',
  },
  uploadContainer: {
    backgroundColor: '#F5FBFF',
    borderRadius: 3,
    justifyContent: 'space-between',
    borderColor: '#DFEDFB',
    borderStyle: 'dotted',
    borderWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: '100%',
  },
  labelText: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  descriptionText: {
    textAlign: 'left',
    paddingTop: '3%',
    fontSize: 13,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  description: {
    textAlign: 'left',
    fontSize: 11,
    color: '#000',
  },
  buttonUploadStyle: {
    backgroundColor: '#C8E0F9',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#C8E0F9',
    alignItems: 'center',
    borderRadius: 3,
    paddingTop: 8,
    paddingBottom: 8,
    width: '20%',
    marginLeft: 23,
  },
  buttonUploadTextStyle: {
    color: '#2583E6',
    fontSize: 10,
    fontWeight: 'bold',
  },
  highlightText: {
    fontWeight: 'bold',
    fontSize: 10,
    color: '#000',
  },
  ancLink: {
    color: '#2583E6',
    textDecorationColor: 'underline',
  },
  infoStyle: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});
