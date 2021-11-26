import { NavigationProp, useNavigation } from '@react-navigation/core';
import { isLoggedIn } from 'app/repositories/UsersRepository';
import NavigationParamList from 'app/shared/NavigationParamList';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet
} from 'react-native';
import { ThemeProps, withTheme } from 'react-native-elements';

type AuthScreenProp = NavigationProp<NavigationParamList, 'Auth'>;
type MainScreenProp = NavigationProp<NavigationParamList, 'Main'>;

const SplashScreen = ({ theme }: ThemeProps<{}>) => {
    const authNavigation = useNavigation<AuthScreenProp>();
    const mainNavigation = useNavigation<MainScreenProp>();

    useEffect(() => {
        isLoggedIn()
            .then(isLoggedIn => {
                if (isLoggedIn) {
                    mainNavigation.reset({
                        routes: [{ name: 'Main' }]
                    });
                } else {
                    authNavigation.reset({
                        routes: [{ name: 'Auth' }]
                    });
                }
            })
    }, []);

    return (
        <View style={StyleSheet.flatten([
            styles.container,
            {
                backgroundColor: theme.colors?.primary
            }
        ])}>
            <ActivityIndicator
                animating
                color='white'
                size='large'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default withTheme(SplashScreen, 'default');
