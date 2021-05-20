import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from './FavoritesScreen';
import DiscoverScreen from './DiscoverScreen';
import OrganizersScreen from './OrganizersScreen';
import { Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

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
                        <Icon
                            name="star"
                            type="ionicon"
                            size={size} />
                    )
                }} />
            <Tab.Screen
                name='Discover'
                component={DiscoverScreen}
                options={{
                    tabBarIcon: ({size}) => (                            
                        <Icon
                            name="search"
                            type="ionicon"
                            size={size} />
                    )
                }} />
            <Tab.Screen
                name='Organizers'
                component={OrganizersScreen}
                options={{
                    tabBarIcon: ({size}) => (                            
                        <Icon
                            name="people-outline"
                            type="ionicon"
                            size={size} />
                    )
                }} />
        </Tab.Navigator>
    );
}

export default EventsScreen;