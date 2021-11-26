import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Platform, TouchableNativeFeedback, TouchableHighlight, Alert } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import Event from 'app/domain/Event';
import EventsList from './EventsList';
import { GET_EVENTS } from 'app/repositories/EventsRepository';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import NavigationParamList from 'app/shared/NavigationParamList';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { useLazyQuery, useQuery } from '@apollo/client';

const Component = Platform.select<typeof React.Component>({
    android: TouchableNativeFeedback,
    default: TouchableHighlight,
});

type EventScreenProp = NavigationProp<NavigationParamList, 'Event'>;

const DiscoverScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [loadOptions, { data, loading, error }] = useLazyQuery<Event[]>(GET_EVENTS);

    const eventNavigation = useNavigation<EventScreenProp>();

    const { data: organizerEventsData, loading: organizerEventsLoading, error: organizerEventsError } = useQuery<Event[]>(GET_EVENTS, { variables: { take: 5 } });
    const { data: popularEventsData, loading: popularEventsLoading, error: popularEventsError } = useQuery<Event[]>(GET_EVENTS, { variables: { take: 5 } });

    useEffect(() => {
        if (!loading) {
            if (data) {
                setEvents(data);
            }
            if (error) {
                Alert.alert(
                    "Error",
                    error.message
                )
            }
        }
    }, [loading, data, error])

    const updateEvents = (searchTerm: string, sortBy: string) => {
        if (!!searchTerm) {
            loadOptions({ variables: { searchTerm, sortBy, following: true } });
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
            refreshing={loading}>
            <View>
                <Card>
                    <Card.Title
                        style={styles.cardTitle}>
                        From organizers you follow
                    </Card.Title>
                    {renderList(organizerEventsData || [])}
                </Card>
                <Card>
                    <Card.Title
                        style={styles.cardTitle}>
                        Popular events
                    </Card.Title>
                    {renderList(popularEventsData || [])}
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