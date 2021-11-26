import React, { useEffect, useState } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Event from 'app/domain/event';
import ItemsList from 'app/shared/ItemsList';
import { UPDATE_EVENT_FOLLOW } from 'app/repositories/EventsRepository';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';
import FollowIcon from 'app/shared/FollowIcon';
import { useMutation } from '@apollo/client';

const sortProps = [
    {
        label: 'By Name',
        property: 'title'
    },
    {
        label: 'By Date',
        property: 'date',
    },
    {
        label: 'Popular',
        property: 'followers',
    },
    {
        label: 'New',
        property: 'creationDate',
    },
];

const Component = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableHighlight,
});

type EventScreenProp = NavigationProp<NavigationParamList, 'Event'>;

type EventsListProps = {
    events: Event[],
    onUpdateList: (searchTerm: string, sortBy: string) => void,
    onUpdateEvent: (event: Event) => void,
    refreshing: boolean,
    children?: JSX.Element | JSX.Element[];
}

const EventsList = ({ events, onUpdateList, onUpdateEvent, refreshing, children }: EventsListProps) => {

    const eventNavigation = useNavigation<EventScreenProp>();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date')

    const toggleFollow = (event: Event) => {
        const updatedEvent = {
            ...event,
            following: !event.following
        };

        onUpdateEvent(updatedEvent);

        useMutation(UPDATE_EVENT_FOLLOW, { variables: { id: event.id, follow: updatedEvent.following } })
    };

    const renderEvent = (event: Event) => {
        return (
            <ListItem
                bottomDivider
                onPress={() => { eventNavigation.navigate('Event', { eventId: event.id }) }}
                Component={Component}
            >
                <Avatar
                    size="large"
                    source={require('../../../images/placeholder-image.png')} />
                <ListItem.Content>
                    <ListItem.Title>{event.title}</ListItem.Title>
                    <ListItem.Subtitle>{event.location}</ListItem.Subtitle>
                    <ListItem.Subtitle>{new Date(event.date).toLocaleDateString()}</ListItem.Subtitle>
                </ListItem.Content>
                <FollowIcon
                    following={event.following}
                    toggleFollow={() => toggleFollow(event)} />
            </ListItem>
        )
    };

    const updateEvents = () => {
        onUpdateList(searchTerm, sortBy);
    }

    useEffect(() => {
        updateEvents();
    }, [searchTerm, sortBy]);

    return (
        <View
            style={styles.listWrapper}>
            <ItemsList
                sortProps={sortProps}
                items={events}
                render={renderEvent}
                keyExtractor={event => event.id}
                onSort={setSortBy}
                onSearch={setSearchTerm}
                searchTerm={searchTerm}
                onRefresh={updateEvents}
                refreshing={refreshing} >
                {children}
            </ItemsList>
        </View>
    );
}

const styles = StyleSheet.create({
    listWrapper: {
        flex: 1
    }
});

EventsList.defaultProps = {
    hideOnEmptySearch: false
};

export default EventsList;