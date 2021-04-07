export type MainStackParamList = {
    Auth: undefined,
    MainHomeStack: undefined,
}

export type BottomTabParamList = {
    Home: undefined,
    Messages: undefined,
    Customize: undefined,
    MyCart: undefined,
    Profile: undefined,
}

export type AuthStackParamList = {
    Index: undefined,
    Login: undefined,
    OTP: {
        OTP?: number,
        Mobile: number | string,
        OTPTokenHash: string,
        UUID: string
    },
    EditProfileAuth: undefined
}

export type HomeStackParamList = {
    Home: undefined,
    Customize: undefined,
    Product: {
        ProductID: number,
        onBackHome?: boolean
    },
    Fabric: {
        FabricID: number
    },
    FAQs: undefined,
    MyProfile: undefined,
    BrandProfile: {
        BrandID: number
    },
    EditProfile: undefined,
    Chat: {
        BucketID: number,
        ItemCount?: number,
        ShowBrandID: boolean | number,
        Status: number,
        BrandID?: number,
        Name: string,
        imageSource: {
            uri: string
        },
        initials: string
    },
    /*ChatWhenNoBucketID: {
        BucketID?: number,
        Message?: string,
        Status?: number,
        ImagePath?: string,
        BrandID: number,
        Name: string,
        imageSource: {
            uri: string
        }
    },*/
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
        PaymentSuccess?: boolean,
        OrderID?: number
    } | undefined,
    CheckOut: {
        Status: number,
        BrandName: string,
        BucketID: string,
    },
    BrandList: {
        BrandID: number
    },
    Order: {
        DecidedPrice: number,
        BrandName: number,
        ProfileImage: string,
        BrandID: number,
        BucketID: number,
    },
    ChatToOrder: undefined,
    ChatToOrderBrand: {
        BrandID: number,
        BrandName: string,
        BrandImage: string,
        Gender?: number
    },
    DesignScreen: {
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
            Index?: number,
            Gender?: number
        }
    },
    ThreeD: {
        CategoryID: number,
        Category: string
    },
    ThreeDModel: {
        BrandUserName: string,
        ModelID: number
    },
    FabricInThreeD: undefined,
    Call: undefined,
    AddReview: {
        Rating: number,
        OrderID: number
    },
    BrandsFor3DCart: {
        ThreeDModel: number,
        CategoryID: number
    },
    BrandsForDesignByLevyne: {
        DesignID: number
    },
    BrandListForChat: {
        Gender: 0 | 1,
        Budget: string,
        Occasion: string,
        Description: string,
        Image: string
    },
    FabricsFor3DCart: undefined
};