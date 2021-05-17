import React from 'react';
import { View } from 'react-native';
import { Image, StyleSheet, Text } from 'react-native';

const UserInfoHeader = ({navigation}: any) => {
    return (
        <View style={styles.container}
            onTouchEnd={() => navigation.navigate('Profile')}>
            <Image
                source={require('../images/user.png')}
                style={styles.userIcon} />
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
    userIcon: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    userName: {
        alignSelf: 'center',
        marginLeft: 10,
        fontSize: 20,
    }
});
  
export default UserInfoHeader;
