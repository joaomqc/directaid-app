import React from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { PixelRatio, SafeAreaView, StyleSheet, View } from 'react-native';
import UserInfoHeader from 'app/sidebar/UserInfoHeader';

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
                height: PixelRatio.getPixelSizeForLayoutSize(StyleSheet.hairlineWidth),
            }}
        />
        <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
};
  
export default CustomSidebarMenu;