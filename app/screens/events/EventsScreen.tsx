import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './FavoritesScreen';
import DiscoverScreen from './DiscoverScreen';
import OrganizersScreen from './OrganizersScreen';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const EventsScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName='Favorites'
            backBehavior='none'>
            <Tab.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({size}) => (
                        <Image
                            source={require('../../../images/follow-icon.png')}
                            style={{width: size, height: size}} />
                    )
                }} />
            <Tab.Screen
                name='Discover'
                component={DiscoverScreen}
                options={{
                    tabBarIcon: ({size}) => (
                        <Image
                            source={require('../../../images/search.png')}
                            style={{width: size, height: size}} />
                    )
                }} />
            <Tab.Screen
                name='Organizers'
                component={OrganizersScreen}
                options={{
                    tabBarIcon: ({size}) => (
                        <Image
                            source={require('../../../images/users.png')}
                            style={{width: size, height: size}} />
                    )
                }} />
        </Tab.Navigator>
    );
}

export default EventsScreen;