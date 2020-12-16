import {Colors, Typography} from 'react-native-ui-lib';

Colors.loadColors({
    primary: '#FF0080',
    secondary: Colors.grey30,
    black: '#000000',
    textSecondary: '#A5B5C9',
    shadow: '#E7EAF0',
    white: '#FFFFFF'
});


Typography.loadTypographies({
    h1: {fontSize: 16, fontFamily: 'Mulish-Regular'},
    hb1: {fontSize: 16, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
    h2: {fontSize: 14, fontFamily: 'Mulish-Regular'},
    hb2: {fontSize: 14, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
    h3: {fontSize: 12, fontFamily: 'Mulish-Regular'},
    hb3: {fontSize: 12, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
    h4: {fontSize: 10, fontFamily: 'Mulish-Regular'},
    hb4: {fontSize: 10, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
    b1: {fontSize: 20, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
    b2: {fontSize: 20, fontFamily: 'Mulish-Regular'},
    f1: {fontSize: 22, fontFamily: 'Mulish-ExtraBold', fontWeight: 'bold'},
});


export default Colors;