import React, { useState } from 'react';
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

    const renderList = () => (
        <FlatList
            horizontal
            data={[{ title: "Protest" }, { title: "Protest2" }, { title: "Protest3" }, { title: "Protest4" }, { title: "Protest5" }]}
            renderItem={({ item }: any) =>
                <ListItem
                    onPress={() => { eventNavigation.navigate('Event') }}
                    Component={Component} >
                    <ListItem.Content style={styles.listItem}>
                        <Avatar
                            size="large"
                            source={require('../../../images/placeholder-image.png')} />
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            }
            keyExtractor={(item: any) => item.title} />
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
                    {renderList()}
                </Card>
                <Card>
                    <Card.Title
                        style={styles.cardTitle}>
                        Popular events
                    </Card.Title>
                    {renderList()}
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