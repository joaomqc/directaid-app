import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EventsScreen from 'app/screens/events/EventsScreen';
import ForumScreen from 'app/screens/ForumScreen';
import MessagesScreen from 'app/screens/MessagesScreen';
import MutualAidScreen from 'app/screens/MutualAidScreen';
import SidebarMenu from 'app/sidebar/SidebarMenu';
import ProfileScreen from 'app/screens/ProfileScreen';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from 'react-native-dotenv';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'app/screens/LoginScreen';
import RegisterScreen from 'app/screens/RegisterScreen';
import SplashScreen from 'app/screens/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const theme = {
    colors: {
        primary: 'orange',
        accent: 'yellow'
    },
    Icon: {
        color: 'orange'
    },
    SpeedDial: {
        color: 'orange'
    }
};

const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    fetchOptions: {
        credentials: "same-origin"
    }
});

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

const Auth = () => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }} >
            <Stack.Screen
                name='Login'
                component={LoginScreen} />
            <Stack.Screen
                name='Register'
                component={RegisterScreen} />
        </Stack.Navigator>
    );
}

const Main = () => {
    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='Events'
            backBehavior='none'
            drawerContent={(props: any) => <SidebarMenu {...props} />}>
            <Drawer.Screen name='Events' component={EventsScreen} />
            <Drawer.Screen name='Forum' component={ForumScreen} />
            <Drawer.Screen
                name='MutualAid'
                component={MutualAidScreen}
                options={{
                    drawerLabel: 'Mutual Aid'
                }} />
            <Drawer.Screen name='Messages' component={MessagesScreen} />
            <Drawer.Screen name='Profile' component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

const App = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <ApolloProvider client={apolloClient}>
                    <NavigationContainer>
                        <Stack.Navigator
                            initialRouteName='Splash'
                            screenOptions={{ headerShown: false }} >
                            <Stack.Screen
                                name='Splash'
                                component={SplashScreen} />
                            <Stack.Screen
                                name='Auth'
                                component={Auth} />
                            <Stack.Screen
                                name='Main'
                                component={Main} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </ApolloProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}

export default App;
