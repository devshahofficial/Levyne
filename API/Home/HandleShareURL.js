import { CommonActions } from '@react-navigation/native';

const HandleShareURL = (Type, TypeID, navigation, BrandUserName) => {
    if(Type && TypeID) {
        switch (Type) {
            case 1 :
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MainHomeStack',
                                state: {
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'Product', params: { ProductID: TypeID } },
                                    ],
                                    index: 1,
                                }
                            },
                        ]
                    })
                );
                break;
            case 2 :
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MainHomeStack',
                                state: {
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'Fabric', params: { FabricID: TypeID } },
                                    ],
                                    index: 1,
                                }
                            },
                        ]
                    })
                );
                break;
            case 3 :
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MainHomeStack',
                                state: {
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'ProductDetailsPage', params: { DesignID: TypeID } },
                                    ],
                                    index: 1,
                                }
                            },
                        ]
                    })
                );
                break;
            case 4 :
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MainHomeStack',
                                state: {
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'ThreeDModel', params: { ModelID: TypeID, BrandUserName: BrandUserName } },
                                    ],
                                    index: 1,
                                }
                            },
                        ]
                    })
                );
                break;
            case 5 :
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            {
                                name: 'MainHomeStack',
                                state: {
                                    routes: [
                                        { name: 'Home' },
                                        { name: 'BrandProfile', params: { BrandID: TypeID } },
                                    ],
                                    index: 1,
                                }
                            },
                        ]
                    })
                );
                break;
        }
    }  
}

export default HandleShareURL;