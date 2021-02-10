import { CommonActions } from '@react-navigation/native';


const RoutesType = {
    1 : ['Product', 'ProductID'],
    2 : ['Fabric', 'FabricID'],
    3 : ['DesignScreen', 'DesignID'],
    4 : ['ThreeDModel', 'ModelID'],
    5 : ['BrandProfile', 'BrandID']
}

/**
 * @param {1 | 2 | 3 | 4 | 5 } Type
 * @param {string | number} TypeID
 * @param {{ dispatch: (arg0: CommonActions.Action) => void; }} navigation
 * @param {string | undefined} [BrandUserName]
 * 
 */
const HandleShareURL = (Type, TypeID, navigation, BrandUserName) => {
    if(Type && TypeID) {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {
                        name: 'Auth',
                        state: {
                            routes: [
                                { name: 'Login' },
                            ],
                            index: 1,
                        }
                    },
                    {
                        name: 'MainHomeStack',
                        state: {
                            routes: [
                                { name: 'Home' },
                                { name: RoutesType[Type][0], params: { [RoutesType[Type][1]]: TypeID, BrandUserName: BrandUserName } },
                            ],
                            index: 1,
                        }
                    },
                ]
            })
        );
    }  
}

export default HandleShareURL;