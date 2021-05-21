import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import UserInfoHeader from 'app/UserInfoHeader';

const CustomSidebarMenu = (props:DrawerContentComponentProps) => {
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
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <UserInfoHeader {...props} />
        <View
            style={{
                backgroundColor: 'black',
                height: StyleSheet.hairlineWidth,
            }}
        />
        <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
};
  
export default CustomSidebarMenu;