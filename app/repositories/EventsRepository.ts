import IEvent from "app/domain/event";

var events: IEvent[] = [
    {
        id: 1,
        title: 'Protest',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 5,
    },
    {
        id: 2,
        title: 'Protest2',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 10,
    },
    {
        id: 3,
        title: 'Protest3',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: false,
        picture: '',
        followers: 7,
    },
    {
        id: 4,
        title: 'Protest4',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 1,
    },
    {
        id: 5,
        title: 'Protest5',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 15,
    },
    {
        id: 6,
        title: 'Protest6',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 8,
    },
    {
        id: 7,
        title: 'Protest7',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: false,
        picture: '',
        followers: 11,
    },
    {
        id: 8,
        title: 'Protest8',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: '',
        followers: 3,
    }
]

export const getFavoriteEvents = (searchTerm: string, sortBy: string): Promise<IEvent[]> => {
    const favoriteEvents = events
        .filter(event => event.following);

    const filteredEvents =
        !searchTerm
            ? favoriteEvents
            : favoriteEvents
                .filter(event => event.title.indexOf(searchTerm) > 0);

    const orderedEvents =
        filteredEvents
            .sort((event: IEvent) => event[sortBy]);

    return new Promise((resolve) => {
        resolve(orderedEvents);
    });
}

export const updateEvent = (event: IEvent): Promise<void> => {
    const index = events.findIndex(evt => evt.id == event.id);
    events[index] = event;

    return Promise.resolve();
}
