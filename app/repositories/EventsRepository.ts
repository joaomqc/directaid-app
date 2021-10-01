import Event from "app/domain/event";

const events: Event[] = [
    {
        id: 1,
        title: 'Protest',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 5,
        organizer: {
            id: 1,
            name: 'Porto Mutual Aid',
        }
    },
    {
        id: 2,
        title: 'Protest2',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 2)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 10,
        organizer: {
            id: 1,
            name: 'Porto Mutual Aid',
        }
    },
    {
        id: 3,
        title: 'Protest3',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 3)),
        location: 'City hall',
        following: false,
        picture: '',
        followers: 7,
        organizer: {
            id: 1,
            name: 'Porto Mutual Aid',
        }
    },
    {
        id: 4,
        title: 'Protest4',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 4)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 1,
        organizer: {
            id: 2,
            name: 'Rebellion Group',
        }
    },
    {
        id: 5,
        title: 'Protest5',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 5)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 15,
        organizer: {
            id: 2,
            name: 'Rebellion Group',
        }
    },
    {
        id: 6,
        title: 'Protest6',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 6)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 8,
        organizer: {
            id: 2,
            name: 'Rebellion Group',
        }
    },
    {
        id: 7,
        title: 'Protest7',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 7)),
        location: 'City hall',
        following: false,
        picture: '',
        followers: 11,
        organizer: {
            id: 3,
            name: 'Better Town',
        }
    },
    {
        id: 8,
        title: 'Protest8',
        creationDate: new Date(Date.now()),
        date: new Date(new Date().setDate(new Date().getDate() + 8)),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 3,
        organizer: {
            id: 3,
            name: 'Better Town',
        }
    }
]

export const getFavoriteEvents = (searchTerm: string, sortBy: string): Promise<Event[]> => {
    return searchEvents(searchTerm, sortBy, (event: Event) => event.following);
}

export const getEvents = (searchTerm: string, sortBy: string): Promise<Event[]> => {
    return searchEvents(searchTerm, sortBy);
}

const searchEvents = (searchTerm: string, sortBy: string, filter?: (event: Event) => boolean): Promise<Event[]> => {

    const filteredEvents = !filter
        ? [...events]
        : events.filter(filter);

    const searchedEvents =
        !searchTerm
            ? filteredEvents
            : filteredEvents
                .filter(event => event.title.indexOf(searchTerm) >= 0);

    const orderedEvents =
        searchedEvents
            .sort((a: Event, b: Event) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0));

    return new Promise((resolve) => {
        resolve(orderedEvents);
    });
}

export const updateEvent = (event: Event): Promise<void> => {
    const index = events.findIndex(evt => evt.id == event.id);
    events[index] = event;

    return Promise.resolve();
}

export const getEvent = (eventId: number): Promise<Event | null> => {
    const event = events.find(event => event.id === eventId);

    if(!event){
        return Promise.resolve(null);
    }

    return Promise.resolve({
        ...event
    });
}
