import React, { FunctionComponent } from 'react'
import { StarIcon } from '../Icons/StarIcon';
import { Colors, TouchableOpacity } from 'react-native-ui-lib';

/**
 * /**
 * @type {FunctionComponent<{Rating: number, UpdateRating: (arg0: number) => void}>}
 */

const StarIcons = (props) => {
    let i;
    const stars = [];
    for (i = 0; i < props.Rating; i++) {
        stars.push(true);
    }
    for (i = props.Rating; i < 5; i++) {
        stars.push(false);
    }
    return (
        <>
            {stars.map((name, i) => {
                const onPress = () => props.UpdateRating(i + 1);
                return (
                    <TouchableOpacity onPress={onPress} key={i.toString()}>
                        <StarIcon
                            Fill={name}
                            height={30}
                            width={30}
                            Color={Colors.primary}
                        />
                    </TouchableOpacity>
                );
            })}
        </>
    )
}


export default StarIcons;
