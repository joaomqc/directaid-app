import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { isLoggedIn, ME } from 'app/repositories/UsersRepository';
import { useLazyQuery } from '@apollo/client';
import { NavigationProps } from 'app/shared/NavigationProps';

const UserInfoHeader = ({ navigation }: NavigationProps) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [loadOptions, { data, loading: loadingQuery, error }] = useLazyQuery<{ me: { name: string } }>(ME);

    useEffect(() => {
        isLoggedIn()
            .then(value => {
                if (value) {
                    loadOptions();
                } else {
                    setLoading(false);
                }
            })
    }, [])

    useEffect(() => {
        if (!loadingQuery) {
            if (!!data) {
                setLoading(false);
            }
            if (!!error) {
                setLoading(false);
                Alert.alert(
                    "Error",
                    error.message
                )
            }
        }
    }, [data, loadingQuery, error])

    return (
        <Button
            icon={<Icon
                name="person-circle-outline"
                type="ionicon"
                size={50} />}
            onPress={() => {
                if (!!data) {
                    navigation.navigate('Profile')
                } else {
                    navigation.navigate('Auth')
                }
            }}
            title={!!data ? data.me.name : "Log in"}
            loading={loading}
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
