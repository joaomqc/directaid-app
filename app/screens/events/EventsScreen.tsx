import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import FavoritesScreen from 'app/screens/events/FavoritesScreen';
import DiscoverScreen from 'app/screens/events/DiscoverScreen';
import OrganizersScreen from 'app/screens/events/OrganizersScreen';
import EventScreen from 'app/screens/events/EventScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const EventsScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName='Favorites'
            backBehavior='none'
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false
            }}
            screenOptions={({ route }) => ({
              tabBarButton: [
                "Event"
              ].includes(route.name)
                ? () => {
                    return null;
                  }
                : undefined,
            })}
            >
            <Tab.Screen
                name='Favorites'
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name="star"
                            type="ionicon"
                            size={size}
                            color={color} />
                    )
                }} />
            <Tab.Screen
                name='Discover'
                component={DiscoverScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name="search"
                            type="ionicon"
                            size={size}
                            color={color} />
                    )
                }} />
            <Tab.Screen
                name='Organizers'
                component={OrganizersScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name="people-outline"
                            type="ionicon"
                            size={size}
                            color={color} />
                    )
                }} />
            <Tab.Screen
                name='Event'
                component={EventScreen} />
        </Tab.Navigator>
    );
}

export default EventsScreen;