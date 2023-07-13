import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
    navigation,
    selectionMode,
    roundCorner,
    option1,
    option2,
    onSelectSwitch,
    selectionColor
}) => {
const [getSelectionMode, setSelectionMode] = useState(selectionMode);
const [getRoundCorner, setRoundCorner] = useState(roundCorner);

const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
};

    return (
        <View>
            <View
                style={{
                    height: 40,
                    width: '100%',
                    borderRadius: getRoundCorner ? 3 : 0,
                    borderColor: selectionColor,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    padding: 2,
            }}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData(1)}
                    style={{
                        flex: 1,

                        backgroundColor: getSelectionMode == 1 ? selectionColor : '#C8E0F9',
                        borderRadius: getRoundCorner ? 3 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                    <Text
                        style={{
                        color: getSelectionMode == 1 ? 'white' : selectionColor,
                        fontSize: 12
                    }}>
                        {option1}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    TouchableOpacity
                    activeOpacity={1}
                    onPress={() => updatedSwitchData(2)}
                    style={{
                        flex: 1,
                        backgroundColor: getSelectionMode == 2 ? selectionColor : '#C8E0F9',
                        borderRadius: getRoundCorner ? 3 : 0,
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                    <Text
                        style={{
                            color: getSelectionMode == 2 ? 'white' : selectionColor,
                            fontSize: 12
                    }}>
                        {option2}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    };
export default CustomSwitch;