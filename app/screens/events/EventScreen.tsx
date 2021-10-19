import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GET_EVENT, UPDATE_EVENT_FOLLOW } from 'app/repositories/EventsRepository';
import NavigationParamList from 'app/shared/NavigationParamList';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { Icon, SpeedDial, ThemeProps, withTheme } from 'react-native-elements';
import AutoHeightImage from 'react-native-auto-height-image';
import { ScrollView } from 'react-native-gesture-handler';
import Event from 'app/domain/Event';
import FollowIcon from 'app/shared/FollowIcon';
import { RouteProp } from '@react-navigation/core';
import { useMutation, useQuery } from '@apollo/client';

var width = Dimensions.get('window').width;

type EventsScreenProp = NavigationProp<NavigationParamList, 'Events'>;

type Props = {
    route: RouteProp<NavigationParamList, 'Event'>
} & ThemeProps<{}>

const EventScreen = ({ theme, route }: Props) => {

    const { eventId } = route.params;

    const [event, setEvent] = useState<Event>();
    const { data, loading, error } = useQuery<Event>(GET_EVENT, { variables: { id: eventId } })

    const [optionsOpen, setOptionsOpen] = useState(false);

    const navigation = useNavigation<EventsScreenProp>();

    useEffect(() => {
        if (!loading && data) {
            setEvent(data);
        } else if (!loading && error) {
            onPressBack();
        }
    }, [loading, data, error])

    const onPressBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate('Events');
        }
    }

    const toggleFollow = () => {
        if (!event) {
            return;
        }

        const updatedEvent = {
            ...event,
            following: !event.following
        };

        setEvent(updatedEvent);
        useMutation(UPDATE_EVENT_FOLLOW, { variables: { id: event.id, follow: updatedEvent.following } })
    }

    return (
        <View>
            {!event
                ? (
                    <View>
                        <Text>Loading</Text>
                    </View>
                )
                : (
                    <View style={styles.screenContainer}>
                        <View
                            style={{ ...styles.header }}>
                            <Icon
                                name="chevron-back-outline"
                                type="ionicon"
                                size={40}
                                onPress={onPressBack} />
                        </View>
                        <ScrollView style={styles.scrollContainer}>
                            <View>
                                <AutoHeightImage
                                    width={width}
                                    source={require('../../../images/placeholder-image.png')} />
                            </View>
                            <View
                                style={styles.eventInfo} >
                                <View>
                                    <Text style={styles.title}>{event.title}</Text>
                                    <Text style={styles.organizer}>{event.organizer.name}</Text>
                                </View>
                                <View>
                                    <FollowIcon
                                        following={event.following}
                                        toggleFollow={toggleFollow} />
                                </View>
                            </View>
                            <View style={StyleSheet.flatten([
                                styles.eventDetails,
                                {
                                    backgroundColor: `rgba(${theme.colors?.primary}, 0.12)`
                                }
                            ])}>
                                <Text style={styles.eventDetailsItem}>{event.location}</Text>
                                <Text style={styles.eventDetailsItem}>{event.date.toLocaleString()}</Text>
                            </View>
                        </ScrollView>
                        <SpeedDial
                            buttonStyle={styles.speedDialButton}
                            isOpen={optionsOpen}
                            icon={{ name: 'add', color: 'white' }}
                            openIcon={{ name: 'close', color: 'white' }}
                            onOpen={() => setOptionsOpen(true)}
                            onClose={() => setOptionsOpen(false)}
                        >
                            <SpeedDial.Action
                                buttonStyle={styles.speedDialButton}
                                color='orange'
                                icon={{ name: 'map', color: 'white' }}
                                onPress={() => console.log('Map')}
                            />
                            <SpeedDial.Action
                                buttonStyle={styles.speedDialButton}
                                color='orange'
                                icon={{ name: 'event', color: 'white' }}
                                onPress={() => console.log('Calendar')}
                            />
                            <SpeedDial.Action
                                buttonStyle={styles.speedDialButton}
                                color='orange'
                                icon={{ name: 'share', color: 'white' }}
                                onPress={() => console.log('Share')}
                            />
                        </SpeedDial>
                    </View>)}
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        minHeight: '100%'
    },
    header: {
        alignItems: 'flex-start',
        height: 50,
        paddingLeft: 10,
        top: 0,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        flex: 1,
        justifyContent: 'center'
    },
    speedDialButton: {
        borderRadius: 50
    },
    scrollContainer: {
        marginTop: 50
    },
    eventInfo: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    title: {
        fontSize: 40
    },
    organizer: {
        fontSize: 20
    },
    eventDetails: {
        padding: 20,
    },
    eventDetailsItem: {
        fontSize: 15,
        color: 'orange',
        margin: 5
    }
});

export default withTheme(EventScreen, 'default');