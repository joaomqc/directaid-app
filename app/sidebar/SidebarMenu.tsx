import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import UserInfoHeader from 'app/sidebar/UserInfoHeader';
import { Divider, ThemeProps, withTheme } from 'react-native-elements';
import DrawerItemList from './DrawerItemList';

const CustomSidebarMenu = (props: DrawerContentComponentProps & ThemeProps<{}>) => {
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
            <DrawerContentScrollView>
                <DrawerItemList {...filteredProps} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

export default withTheme(CustomSidebarMenu, "default");