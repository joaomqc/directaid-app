import React from 'react';
import { Icon } from 'react-native-elements/dist/icons/Icon';

type Props = {
    following: boolean,
    toggleFollow: () => void
}

const FollowIcon = ({ following, toggleFollow }: Props) => {

    return (
        <Icon
            name={following
                ? "star"
                : "star-outline"}
            type="ionicon"
            size={40}
            color="gold"
            onPress={toggleFollow} />
    );
}

export default FollowIcon;