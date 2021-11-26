import React, { useEffect, useState } from 'react';
import Event from 'app/domain/event';
import { GET_EVENTS } from 'app/repositories/EventsRepository';
import EventsList from './EventsList';
import { useLazyQuery } from '@apollo/client';
import { Alert } from 'react-native';

const FavoritesScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [loadOptions, { data, loading, error }] = useLazyQuery<{ events: Event[] }>(GET_EVENTS);

    const updateEvents = (searchTerm: string, sortBy: string) => {
        loadOptions({
            variables: {
                searchTerm,
                sortBy,
                followingOnly: false //TODO: dependant on user login
            }
        });
    }

    const updateEvent = (updatedEvent: Event) => {
        setEvents(oldEvents => oldEvents.map(evt => {
            if (updatedEvent.id == evt.id) {
                return updatedEvent;
            }

            return evt;
        }));
    }

    useEffect(() => {
        if (!loading) {
            if (data) {
                setEvents(data.events);
            }

            if (error) {
                Alert.alert(
                    "Error",
                    error.message
                )
            }
        }
    }, [loading, data, error])

    return (
        <EventsList
            events={events}
            onUpdateList={updateEvents}
            onUpdateEvent={updateEvent}
            refreshing={loading} />
    );
}

export default FavoritesScreen;