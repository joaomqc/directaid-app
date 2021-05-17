import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ItemsList from '../../ItemsList';

const storedEvents = [
    {
        title: 'Protest',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest2',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest3',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest4',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest5',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest6',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest7',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    },
    {
        title: 'Protest8',
        creationDate: new Date(Date.now()),
        date: new Date(Date.now()),
        location: 'City hall',
        following: true,
        picture: require('../../../images/placeholder-image.png')
    }
]

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

interface IEvent {
    title: string,
    creationDate: Date,
    date: Date,
    location: string,
    following: boolean,
    picture: NodeRequire
}

const renderEvent = (event: any) => (
    <View
        style={styles.eventContainer}>
        <Image
            source={event.picture}
            style={styles.eventImage}/>
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
            <Image
                source={require('../../../images/follow-icon.png')}
                style={styles.followIcon}/>
        </View>
    </View>
);

const FavoritesScreen = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date')
    const [events, setEvents]= useState<IEvent[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const updateEvents = () => {
        setRefreshing(true);
        const filteredEvents = 
            searchTerm === ''
                ? storedEvents
                : storedEvents
                    .filter(event => event.title.indexOf(searchTerm) > 0);
    
        const orderedEvents =
            filteredEvents
                .sort((event:any) => event[sortBy]);
    
        setEvents(orderedEvents);
        setRefreshing(false);
    }

    useEffect(() => {
        updateEvents();
    }, [searchTerm, sortBy]);

    return (
        <View
            style={{flex: 1}}>
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

const styles= StyleSheet.create({
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
    followIcon: {
        height: 50,
        width: 50,
    },
});

export default FavoritesScreen;