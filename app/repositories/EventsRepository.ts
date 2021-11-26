import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
    query ($searchTerm: String, $sortBy: String, $followingOnly: Boolean, $skip: Int, $take: Int) {
        events (
            searchTerm: $searchTerm,
            sortBy: $sortBy,
            followingOnly: $followingOnly,
            skip: $skip,
            take: $take
        ){
            id,
            title,
            date,
            location,
            following,
            followers,
            organizer {
                id,
                name
            }
        }
    }
`;

export const GET_EVENT = gql`
    query ($id: Int!) {
        event (
            id: $id
        ){
            id,
            title,
            date,
            location,
            following,
            followers,
            organizer {
                id,
                name
            }
        }
    }
`;

export const UPDATE_EVENT_FOLLOW = gql`
    mutation ($id: Int!, $follow: Boolean!) {
        updateFollowEvent (
            followEventData: {
                eventID: $id,
                follow: $follow
            }
        )
    }
`;
