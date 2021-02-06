export type HomeStackParamList = {
    Customize: {
        Rating: number,
        OrderID: number
    },
    ProductDetailsPage: {
        DesignID: number
    },
    ThreeD: {
        CategoryID: number,
        Category: string
    },
    Home: undefined,
    Product: {
        ProductID: number
    },
    Fabric: {
        FabricID: number
    },
    FAQs: undefined,
    MyProfile: undefined,
    InitialProfile: undefined,
    BrandProfile: {
        BrandID: number
    },
    EditProfile: undefined,
    Chat: {
        BucketID: number,
        [BrandID]: number,
        Name: string,
        imageSource: {
            uri: string
        }
    },
    ChatWhenNoBucketID: {
        [BucketID]: number,
        BrandID: number,
        Name: string,
        imageSource: {
            uri: string
        }
    },
    BookMark: undefined,
    SearchText: undefined,
    Help: undefined,
    Bucket: {
        BucketID: number,
        BrandName: string,
        BrandID: number,
        imageSource: {
            uri: string
        },
        DecidedPrice: number
    },
    MyFashionDesigners: undefined,
    ProductAddToCart: {
        BrandID: number,
        ProductID: number
    },
    TermsAndCondition: undefined,
    InternetConnection: undefined,
    Cart: undefined,
    DesignedAtLevyne: undefined,
    Notifications: undefined,
    QRCodeReader: undefined,
    MyFits: undefined,
    MyOrders: {
        PaymentSuccess: boolean,
        [OrderID]: number
    },
    CheckOut: {
        BrandName: string,
        BucketID: string,
    },
    BrandList: {
        BrandID: number
    },
    OrderScreen: {
        DecidedPrice: number,
        BrandName: number,
        ProfileImage: string,
        BrandID: number,
        BucketID: number,
    },
    ChatToOrder: undefined,
    ProductDetailsPage: {
        DesignID: number
    },
    BlogPost: {
        PostID: number,
        Title: string,
        Image: string,
        Timestamp: string,
    },
    SearchScreen: {
        SearchFilter: {
            Label: string,
            Type: 0 | 1 | 2 | 3 | 4,
            Index: number,
            [Gender]: number
        }
    },
    ThreeDModel: {
        BrandUserName: string,
        ModelID: number
    },
    FabricInThreeD: undefined,
    Call: undefined,
    BrandsFor3DCart: {
        ThreeDModel: number,
        CategoryID: number
    },
    BrandsForDesignByLevyne: {
        DesignID: number
    },
    Auth: {
        screen: string
    }
};