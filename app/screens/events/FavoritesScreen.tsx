import React, { useEffect, useState } from 'react';
import Event from 'app/domain/event';
import { GET_EVENTS } from 'app/repositories/EventsRepository';
import EventsList from './EventsList';
import { useLazyQuery } from '@apollo/client';

const FavoritesScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);

    const [loadOptions, { data, loading, error }] = useLazyQuery<Event[]>(GET_EVENTS);

    const updateEvents = (searchTerm: string, sortBy: string) => {
        loadOptions({ variables: { searchTerm, sortBy, following: true } });
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
        if(loading === false && data){
            setEvents(data);
        }
    }, [loading, data])

    return (
        <EventsList
            events={events}
            onUpdateList={updateEvents}
            onUpdateEvent={updateEvent}
            refreshing={loading} />
    );
}

export default FavoritesScreen;