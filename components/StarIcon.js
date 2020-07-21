import React from 'react'
import { FlatList } from 'react-native'
import {StarIcon} from '../Icons/StarIcon';
import {View} from 'react-native-ui-lib'

{/*
        <View>
            <FlatList
                data={props.staricons}
                horizontal={true}
                renderItem={({ item }) =>
                    <Layout style={{ flexDirection: 'row', paddingBottom: 8 }}>
                        <StarIcon Fill={props.Fill} height={15} width={15} Color={Colors.primary} />
                    </Layout>
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
            */}

export default (props) => {
    // props.staricons is an array of boolean
    return (
        <View></View>
    )
}
