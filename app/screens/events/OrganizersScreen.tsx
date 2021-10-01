import React, { useEffect, useState } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Organizer from 'app/domain/organizer';
import ItemsList from 'app/shared/ItemsList';
import { getFavoriteOrganizers, updateOrganizer } from 'app/repositories/OrganizersRepository';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';
import FollowIcon from 'app/shared/FollowIcon';

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
    const [refreshing, setRefreshing] = useState(false);

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

        updateOrganizer(updatedOrganizer);
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
        setRefreshing(true);

        getFavoriteOrganizers(searchTerm, sortBy)
            .then((newOrganizers: Organizer[]) => {
                setOrganizers(newOrganizers);
                setRefreshing(false);
            });
    }

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
                keyExtractor={organizer => organizer.name + organizer.creationDate}
                onSort={setSortBy}
                onSearch={setSearchTerm}
                searchTerm={searchTerm}
                onRefresh={updateOrganizers}
                refreshing={refreshing} />
        </View>
    );
}

export default OrganizersScreen;