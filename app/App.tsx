import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EventsScreen from 'app/screens/events/EventsScreen';
import ForumScreen from 'app/screens/ForumScreen';
import MessagesScreen from 'app/screens/MessagesScreen';
import MutualAidScreen from 'app/screens/MutualAidScreen';
import SidebarMenu from 'app/SidebarMenu';
import ProfileScreen from 'app/screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Drawer.Navigator
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
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
