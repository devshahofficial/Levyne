import { Typography } from 'react-native-ui-lib';
import { Platform } from 'react-native';

const Constants = {
    isIOS : Platform.OS === 'ios'
}

const text10 = {
    fontSize: 64,
    lineHeight: 76,
    fontFamily: 'Mulish-Regular'
}; // text20

const text20 = {
    fontSize: 48,
    lineHeight: Constants.isIOS ? 60 : 62,
    fontFamily: 'Mulish-Regular'
}; // text30

const text30 = {
    fontSize: 36,
    lineHeight: Constants.isIOS ? 43 : 46,
    fontFamily: 'Mulish-Regular'
}; // text40

const text40 = {
    fontSize: 28,
    lineHeight: 32,
    fontFamily: 'Mulish-Regular'
}; // text50

const text50 = {
    fontSize: 24,
    lineHeight: 28,
    fontFamily: 'Mulish-Regular'
}; // text60

const text60 = {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Mulish-Regular'
}; // text65

const text65 = {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Mulish-Regular'
}; // text70

const text70 = {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Mulish-Regular'
}; // text80

const text80 = {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Mulish-Regular'
}; // text90

const text90 = {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Mulish-Regular'
}; // text100

const text100 = {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: 'Mulish-Regular'
};

Typography.loadTypographies({
    h1: { fontSize: 16, fontFamily: 'Mulish-Regular' },
    hb1: { fontSize: 16, fontFamily: 'Mulish-ExtraBold' },
    h2: { fontSize: 14, fontFamily: 'Mulish-Regular' },
    hb2: { fontSize: 14, fontFamily: 'Mulish-ExtraBold' },
    h3: { fontSize: 12, fontFamily: 'Mulish-Regular' },
    hb3: { fontSize: 12, fontFamily: 'Mulish-ExtraBold' },
    h4: { fontSize: 10, fontFamily: 'Mulish-Regular' },
    hb4: { fontSize: 10, fontFamily: 'Mulish-ExtraBold' },
    b1: { fontSize: 20, fontFamily: 'Mulish-ExtraBold' },
    b2: { fontSize: 20, fontFamily: 'Mulish-Regular' },
    f1: { fontSize: 22, fontFamily: 'Mulish-ExtraBold' },
    text10,
    text20,
    text30,
    text40,
    text50,
    text60,
    text65,
    text70,
    text80,
    text90,
    text100
});