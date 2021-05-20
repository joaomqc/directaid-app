import React from 'react';
import { View } from 'react-native';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

const UserInfoHeader = ({navigation}: any) => {
    return (
        <View style={styles.container}
            onTouchEnd={() => navigation.navigate('Profile')}>
            <Icon
                name="person-circle-outline"
                type="ionicon"
                size={50}/>
            <Text
                style={styles.userName}>
                John Doe
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        paddingBottom: 25,
        paddingTop: 25,
        paddingLeft: 10,
    },
    userName: {
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 20,
    }
});
  
export default UserInfoHeader;
