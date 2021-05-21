import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { Icon } from 'react-native-elements';
import IEvent from '../../domain/event';
import ItemsList from '../../ItemsList';
import { getFavoriteEvents, updateEvent } from '../../repositories/EventsRepository';

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

const FavoritesScreen = () => {

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
        <View
            style={styles.eventContainer}>
            <Image
                source={require('../../../images/placeholder-image.png')}
                style={styles.eventImage} />
            <View
                style={styles.eventDetails}>
                <Text
                    style={styles.eventTitle}>
                    {event.title}
                </Text>
                <Text>
                    {event.location}
                </Text>
                <Text>
                    {event.date.toLocaleDateString()}
                </Text>
            </View>
            <View
                style={styles.followIconContainer}>
                <Icon
                    name={event.following
                        ? "star"
                        : "star-outline"}
                    type="ionicon"
                    size={50}
                    onPress={() => toggleFollow(event)} />
            </View>
        </View>
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

const styles = StyleSheet.create({
    eventContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eventDetails: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    eventTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: -5,
    },
    eventImage: {
        height: 90,
        width: 90,
        borderRadius: 10,
    },
    followIconContainer: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: '5%',
    },
});

export default FavoritesScreen;