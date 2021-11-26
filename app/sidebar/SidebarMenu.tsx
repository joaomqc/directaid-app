import React, { useEffect, useState } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import UserInfoHeader from 'app/sidebar/UserInfoHeader';
import { Divider, ThemeProps, withTheme } from 'react-native-elements';
import DrawerItemList from './DrawerItemList';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import NavigationParamList from 'app/shared/NavigationParamList';
import { isLoggedIn, logout } from 'app/repositories/UsersRepository';

type SplashScreenProp = NavigationProp<NavigationParamList, 'Splash'>;

const CustomSidebarMenu = (props: DrawerContentComponentProps & ThemeProps<{}>) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        isLoggedIn()
            .then(value => {
                setIsUserLoggedIn(value);
            })
    }, [])

    const splashNavigation = useNavigation<SplashScreenProp>();

    const filteredProps = {
        ...props,
        state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
                routeName => routeName !== 'Profile'
            ),
            routes: props.state.routes.filter(
                route => route.name !== 'Profile'
            ),
        },
        activeTintColor: props.theme.colors?.primary,
        inactiveTintColor: props.theme.colors?.primary,
        pressColor: props.theme.colors?.primary
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <UserInfoHeader {...props} />
            <Divider />
            <DrawerContentScrollView contentContainerStyle={styles.container}>
                <View>
                    <DrawerItemList {...filteredProps} />
                </View>
                <View>
                    {isUserLoggedIn &&
                        <DrawerItem label="Log Out" onPress={() => {
                            logout();
                            splashNavigation.reset({
                                routes: [{ name: 'Splash' }]
                            })
                        }} />
                    }
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

export default withTheme(CustomSidebarMenu, "default");