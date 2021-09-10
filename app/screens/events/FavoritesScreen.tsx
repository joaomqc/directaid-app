import React, { useState } from 'react';
import Event from 'app/domain/event';
import { getFavoriteEvents } from 'app/repositories/EventsRepository';
import EventsList from './EventsList';

const FavoritesScreen = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const updateEvents = (searchTerm: string, sortBy: string) => {
        setRefreshing(true);

        getFavoriteEvents(searchTerm, sortBy)
            .then((newEvents: Event[]) => {
                setEvents(newEvents);
                setRefreshing(false);
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

    return (
        <EventsList
            events={events}
            onUpdateList={updateEvents}
            onUpdateEvent={updateEvent}
            refreshing={refreshing} />
    );
}

export default FavoritesScreen;