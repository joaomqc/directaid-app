import IOrganizer from "app/domain/organizer";

var organizers: IOrganizer[] = [
    {
        id: 1,
        name: 'Porto Mutual Aid',
        creationDate: new Date(Date.now()),
        following: true,
        picture: '',
        followers: 5,
    },
    {
        id: 2,
        name: 'Rebellion Group',
        creationDate: new Date(Date.now()),
        following: true,
        picture: '',
        followers: 10,
    },
    {
        id: 3,
        name: 'Better Town',
        creationDate: new Date(Date.now()),
        following: false,
        picture: '',
        followers: 7,
    }
]

export const getFavoriteOrganizers = (searchTerm: string, sortBy: string): Promise<IOrganizer[]> => {
    const favoriteOrganizers = organizers
        .filter(organizer => organizer.following);

    const filteredOrganizers =
        !searchTerm
            ? favoriteOrganizers
            : favoriteOrganizers
                .filter(organizer => organizer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0);

    const orderedOrganizers =
        filteredOrganizers
            .sort((organizer: IOrganizer) => organizer[sortBy]);

    return new Promise((resolve) => {
        resolve(orderedOrganizers);
    });
}

export const updateOrganizer = (organizer: IOrganizer): Promise<void> => {
    const index = organizers.findIndex(org => org.id == organizer.id);
    organizers[index] = organizer;

    return Promise.resolve();
}
