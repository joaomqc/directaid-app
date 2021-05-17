import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import EventsScreen from './screens/events/EventsScreen';
import ForumScreen from './screens/ForumScreen';
import MessagesScreen from './screens/MessagesScreen';
import MutualAidScreen from './screens/MutualAidScreen';
import SidebarMenu from './SidebarMenu';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const App = () => {
    return (
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
    );
}

export default App;
