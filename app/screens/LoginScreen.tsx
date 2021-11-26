import { useMutation } from '@apollo/client';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { NavigationProps } from 'app/shared/NavigationProps';
import { LOGIN, login } from 'app/repositories/UsersRepository';
import NavigationParamList from 'app/shared/NavigationParamList';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

type RegisterScreenProp = NavigationProp<NavigationParamList, 'Register'>;
type MainScreenProp = NavigationProp<NavigationParamList, 'Main'>;

const LoginScreen = ({ navigation }: NavigationProps) => {
    const [mutateFunction, { data, loading, error }] = useMutation<{ login: string }>(LOGIN);

    // const registerNavigation = useNavigation<RegisterScreenProp>();
    // const mainNavigation = useNavigation<MainScreenProp>();

    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();

    useEffect(() => {
        if (!loading) {
            if (!!data) {
                login(data.login)
                    .then(() =>
                        navigation.reset({
                            routes: [
                                { name: 'Main' }
                            ],
                        })
                    ).catch((error) => {
                        setLoginLoading(false);
                        Alert.alert(
                            "Error",
                            error.message
                        )
                    });
            }
            if (!!error) {
                setLoginLoading(false);
                Alert.alert(
                    "Error",
                    error.message
                )
            }
        }
    }, [loading, data, error])

    const onLogin = () => {
        setLoginLoading(true);
        const a = mutateFunction({ variables: { email: email, password: password } });
        a.then((b) => {
            console.log(error)
            console.log(data)
        })
    }

    return (
        <View
            style={styles.container}>
            <View
                style={styles.loginContainer}>
                <Input
                    placeholder='Email'
                    leftIcon={{ type: 'ionicon', name: 'person' }}
                    onChangeText={value => setEmail(value)}
                />
                <Input
                    placeholder='Password'
                    secureTextEntry
                    leftIcon={{ type: 'ionicon', name: 'key' }}
                    onChangeText={value => setPassword(value)}
                />
                <Button
                    containerStyle={styles.topButton}
                    title='Login'
                    type='solid'
                    raised
                    loading={loginLoading}
                    onPress={onLogin} />
                <Button
                    title='Register'
                    type='solid'
                    raised
                    onPress={() => navigation.reset({
                        routes: [
                            { name: 'Register' }
                        ],
                    })} />
            </View>
            <View
                style={styles.skipButtonContainer}>
                <Button
                    title='Skip'
                    type='outline'
                    raised
                    onPress={() => navigation.reset({
                        routes: [
                            { name: 'Main' }
                        ],
                    })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    topButton: {
        marginBottom: 10,
    },
    skipButtonContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        marginBottom: 20
    }
});

export default LoginScreen;