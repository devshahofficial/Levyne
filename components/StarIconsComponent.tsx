import React from 'react'
import {StarIcon} from '../Icons/StarIcon';
import {Colors} from 'react-native-ui-lib';

const StarComponent: React.FunctionComponent<{ BrandRating: number; }> = (props: { BrandRating: number; }) => {

    const BrandRating = Math.round(props.BrandRating);

    let i;
    const stars = [];
    for (i = 0; i < BrandRating; i++) {
        stars.push(true);
    }
    for (i = BrandRating; i < 5; i++) {
        stars.push(false);
    }
    return (
        <>
            {
                stars.map((Fill, i) => {
                    return (
                        <StarIcon
                            key={i.toString()}
                            Fill={Fill}
                            height={15}
                            width={15}
                            Color={Colors.primary}
                        />
                    );
                })
            }
        </>
    )
}

export default StarComponent;