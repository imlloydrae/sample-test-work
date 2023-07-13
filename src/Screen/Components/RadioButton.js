import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text,  } from 'react-native';


export default function RadioButton({ data, onSelect}) {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    }

    return (
        <View>
            {data.map((item) => {
                return (
                    <Pressable 
                        style={item.value === userOption ? styles.selected : styles.unselected }
                        onPress={() => selectHandler(item.value)}>
                        <Text> {item.value} </Text>
                    </Pressable>
                )
            })}
            <Text style={styles.option}>User Option: {userOption}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    option: {
      fontSize: 20,
      color: 'white',
      textAlign: 'center',
    },
    unselected: {
      backgroundColor: 'red',
      margin: 5,
    },
    selected: {
      backgroundColor: 'blue',
      margin: 6,
      padding: 10,
      borderRadius: 10,
    },
  });