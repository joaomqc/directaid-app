import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const UserInfoHeader = ({ navigation }: any) => {
    return (
        <Button
            icon={<Icon
                name="person-circle-outline"
                type="ionicon"
                size={50} />}
            onPress={() => navigation.navigate('Profile')}
            title="John Doe"
            buttonStyle={styles.button}
            titleStyle={styles.title}
            type="clear" />
    );
};

const styles = StyleSheet.create({
    button: {
        paddingBottom: 25,
        paddingTop: 25,
        justifyContent: 'flex-start',
    },
    title: {
        marginLeft: 10,
        fontSize: 20
    }
});

export default UserInfoHeader;
