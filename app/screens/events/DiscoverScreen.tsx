import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Event from 'app/domain/Event';
import EventsList from './EventsList';
import { getEvents } from 'app/repositories/EventsRepository';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';

const Component = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableHighlight,
});

type EventScreenProp = NavigationProp<NavigationParamList, 'Event'>;

const DiscoverScreen = () => {

    const eventNavigation = useNavigation<EventScreenProp>();

    const [organizerEvents, setOrganizerEvents] = useState<Event[]>([]);
    const [popularEvents, setPopularEvents] = useState<Event[]>([]);

    useEffect(() => {
        getEvents('', 'date')
            .then((newEvents: Event[]) => {
                setOrganizerEvents(newEvents);
                setPopularEvents(newEvents);
            });
    }, []);

    const [events, setEvents] = useState<Event[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const updateEvents = (searchTerm: string, sortBy: string) => {
        if (!!searchTerm) {
            setRefreshing(true);

            getEvents(searchTerm, sortBy)
                .then((newEvents: Event[]) => {
                    setEvents(newEvents);
                    setRefreshing(false);
                });
        } else {
            setEvents([]);
        }
    }

    const updateEvent = (updatedEvent: Event) => {
        setEvents(oldEvents => oldEvents.map(evt => {
            if (updatedEvent.id == evt.id) {
                return updatedEvent;
            }

            return evt;
        }));
    }

    const renderList = (events: Event[]) => (
        <FlatList
            horizontal
            data={events}
            renderItem={({ item }: any) =>
                <ListItem
                    onPress={() => { eventNavigation.navigate('Event', { eventId: item.id }) }}
                    Component={Component} >
                    <ListItem.Content style={styles.listItem}>
                        <Avatar
                            size="large"
                            source={require('../../../images/placeholder-image.png')} />
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            }
            keyExtractor={(item: any) => item.id} />
    )

    return (
        <EventsList
            events={events}
            onUpdateList={updateEvents}
            onUpdateEvent={updateEvent}
            refreshing={refreshing}>
            <View>
                <Card>
                    <Card.Title
                        style={styles.cardTitle}>
                        From organizers you follow
                    </Card.Title>
                    {renderList(organizerEvents)}
                </Card>
                <Card>
                    <Card.Title
                        style={styles.cardTitle}>
                        Popular events
                    </Card.Title>
                    {renderList(popularEvents)}
                </Card>
            </View>
        </EventsList>
    );
}

const styles = StyleSheet.create({
    cardTitle: {
        textAlign: 'left'
    },
    listItem: {
        alignItems: 'center'
    }
})

export default DiscoverScreen;