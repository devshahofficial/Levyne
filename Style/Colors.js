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
    h1: {fontSize: 16, fontWeight: 'normal'},
    hb1: {fontSize: 16, fontWeight: 'bold'},
    h2: {fontSize: 14, fontWeight: 'normal'},
    hb2: {fontSize: 14, fontWeight: 'bold'},
    h3: {fontSize: 12, fontWeight: 'normal'},
    hb3: {fontSize: 12, fontWeight: 'bold'},
    h4: {fontSize: 10, fontWeight: 'normal'},
    hb4: {fontSize: 10, fontWeight: 'bold'},
    b1: {fontSize: 20, fontWeight: 'bold'},
    b2: {fontSize: 20, fontWeight: 'normal'},
    f1: {fontSize: 22, fontWeight: 'bold'},
});


export default Colors;
