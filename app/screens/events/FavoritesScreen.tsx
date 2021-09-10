import React, { useEffect, useState } from 'react';
import {
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import IEvent from 'app/domain/event';
import ItemsList from 'app/shared/ItemsList';
import { getFavoriteEvents, updateEvent } from 'app/repositories/EventsRepository';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';

const sortProps = [
    {
        label: 'Alphabetical',
        property: 'title'
    },
    {
        label: 'Coming up',
        property: 'date',
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

type EventScreenProp = NavigationProp<NavigationParamList, 'Event'>;

const FavoritesScreen = () => {

    const eventNavigation = useNavigation<EventScreenProp>();

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date')
    const [events, setEvents] = useState<IEvent[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const toggleFollow = (event: IEvent) => {
        const updatedEvent = {
            ...event,
            following: !event.following
        };

        setEvents(events.map(evt => {
            if (event.id == evt.id) {
                return updatedEvent;
            }

            return evt;
        }));

        updateEvent(updatedEvent);
    };

    const renderEvent = (event: IEvent) => (

        <ListItem
            bottomDivider
            onPress={() => { eventNavigation.navigate('Event') }}
            Component={Component}>
            <Avatar
                size="large"
                source={require('../../../images/placeholder-image.png')} />
            <ListItem.Content>
                <ListItem.Title>{event.title}</ListItem.Title>
                <ListItem.Subtitle>{event.location}</ListItem.Subtitle>
                <ListItem.Subtitle>{event.date.toLocaleDateString()}</ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                name={event.following
                    ? "star"
                    : "star-outline"}
                type="ionicon"
                size={40}
                color="gold"
                onPress={() => toggleFollow(event)} />
        </ListItem>
    );

    const updateEvents = () => {
        setRefreshing(true);

        getFavoriteEvents(searchTerm, sortBy)
            .then((newEvents: IEvent[]) => {
                setEvents(newEvents);
                setRefreshing(false);
            });
    }

    useEffect(() => {
        updateEvents();
    }, [searchTerm, sortBy]);

    return (
        <View
            style={{ flex: 1 }}>
            <ItemsList
                sortProps={sortProps.map(sortProp => sortProp)}
                items={events}
                render={renderEvent}
                keyExtractor={event => event.title + event.creationDate}
                onSort={setSortBy}
                onSearch={setSearchTerm}
                searchTerm={searchTerm}
                onRefresh={updateEvents}
                refreshing={refreshing} />
        </View>
    );
}

export default FavoritesScreen;