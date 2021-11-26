import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

export const login = (token: string): Promise<void> => {
    return AsyncStorage.setItem('token', token);
}

export const logout = (): Promise<void> => {
    return AsyncStorage.removeItem('token');
}

export const isLoggedIn = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('token')
            .then(value => {
                if (!!value) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                reject(error)
            })
    });
}

export const ME = gql`
    query {
        me {
            id,
            name,
            email
        }
    }
`

export const LOGIN = gql`
    mutation ($email: String!, $password: String!) {
        login (
            loginData: {
                email: $email,
                password: $password
            }
        )
    }
`;

export const REGISTER_USER = gql`
    mutation ($name: String!, $email: String!, $password: String!) {
        addUser (
            newUserData: {
                name: $name,
                email: $email,
                password: $password
            }
        )
    }
`;

export const REGISTER_ORGANIZER = gql`
    mutation ($name: String!, $email: String!, $password: String!, $location: String!, $description: String!) {
        addUser (
            newUserData: {
                name: $name,
                email: $email,
                password: $password,
                organizer: {
                    location: $location,
                    description: $description
                }
            }
        )
    }
`