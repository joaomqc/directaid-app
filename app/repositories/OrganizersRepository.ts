import { gql } from "@apollo/client";

export const GET_ORGANIZERS = gql`
    query ($searchTerm: String, $sortBy: String, $followingOnly: Boolean) {
        organizers (
            searchTerm: $searchTerm,
            sortBy: $sortBy,
            followingOnly: $followingOnly
        ){
            id,
            name
        }
    }
`;

export const UPDATE_ORGANIZER_FOLLOW = gql`
    mutation ($id: Int!, $follow: Boolean!){
        updateFollowOrganizer (
            followOrganizerData: {
                organizerID: $id,
                follow: $follow
            }
        )
    }
`;
