import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from 'app/screens/events/FavoritesScreen';
import DiscoverScreen from 'app/screens/events/DiscoverScreen';
import OrganizersScreen from 'app/screens/events/OrganizersScreen';
import EventScreen from 'app/screens/events/EventScreen';
import { Icon, ThemeProps, withTheme } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const EventsScreen = withTheme(({ theme }: ThemeProps<{}>) => {
    return (
        <Tab.Navigator
            initialRouteName='Favorites'
            backBehavior='none'
            screenOptions={{
                tabBarActiveTintColor: theme.colors?.primary,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        display: "flex"
                    },
                    null
                ]
            }}
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
        </Tab.Navigator>
    );
}, 'default');

const EventsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="EventsTabs" component={EventsScreen} />
            <Stack.Screen name="Event" component={EventScreen} />
        </Stack.Navigator>
    )
};

export default EventsStack;