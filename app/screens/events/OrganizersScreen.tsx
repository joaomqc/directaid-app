import React, { useEffect, useState } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight,
    Alert
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Organizer from 'app/domain/organizer';
import ItemsList from 'app/shared/ItemsList';
import { GET_ORGANIZERS, UPDATE_ORGANIZER_FOLLOW } from 'app/repositories/OrganizersRepository';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';
import FollowIcon from 'app/shared/FollowIcon';
import { useLazyQuery, useMutation } from '@apollo/client';

const sortProps = [
    {
        label: 'By Name',
        property: 'name'
    },
    {
        label: 'Most Popular',
        property: 'followers',
    },
    {
        label: 'Most Recent',
        property: 'creationDate',
    },
];

const Component = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableHighlight,
});

type OrganizerScreenProp = NavigationProp<NavigationParamList, 'Organizer'>;

const OrganizersScreen = () => {

    const organizerNavigation = useNavigation<OrganizerScreenProp>();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name')
    const [organizers, setOrganizers] = useState<Organizer[]>([]);

    const [loadOptions, { data, loading, error }] = useLazyQuery<{ organizers: Organizer[] }, any>(GET_ORGANIZERS);

    const toggleFollow = (organizer: Organizer) => {
        const updatedOrganizer = {
            ...organizer,
            following: !organizer.following
        };

        setOrganizers(organizers.map(org => {
            if (organizer.id == org.id) {
                return updatedOrganizer;
            }

            return org;
        }));

        useMutation(UPDATE_ORGANIZER_FOLLOW, { variables: { id: organizer.id, follow: updatedOrganizer.following } });
    };

    const renderEvent = (organizer: Organizer) => (

        <ListItem
            bottomDivider
            onPress={() => { organizerNavigation.navigate('Organizer') }}
            Component={Component}>
            <Avatar
                size="large"
                source={require('../../../images/placeholder-image.png')} />
            <ListItem.Content>
                <ListItem.Title>{organizer.name}</ListItem.Title>
            </ListItem.Content>
            <FollowIcon
                following={organizer.following}
                toggleFollow={() => toggleFollow(organizer)} />
        </ListItem>
    );

    const updateOrganizers = () => {
        loadOptions({
            variables: {
                searchTerm,
                sortBy,
                followingOnly: false //TODO: dependent on user login
            }
        });
    }

    useEffect(() => {
        if (!loading) {
            if (data) {
                setOrganizers(data.organizers);
            }

            if (error) {
                Alert.alert(
                    "Error",
                    error.message
                )
            }
        }
    }, [loading, data, error])

    useEffect(() => {
        updateOrganizers();
    }, [searchTerm, sortBy]);

    return (
        <View
            style={{ flex: 1 }}>
            <ItemsList
                sortProps={sortProps}
                items={organizers}
                render={renderEvent}
                keyExtractor={organizer => organizer.id}
                onSort={setSortBy}
                onSearch={setSearchTerm}
                searchTerm={searchTerm}
                onRefresh={updateOrganizers}
                refreshing={loading} />
        </View>
    );
}

export default OrganizersScreen;