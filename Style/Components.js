import {ThemeManager} from 'react-native-ui-lib';
import Colors from './Colors';

ThemeManager.setComponentTheme(
    'Text', {
        text80:true
    },
);

ThemeManager.setComponentTheme(
    'Button', {
        borderRadius:50,
        backgroundColor:'#FFFFFF',
        color:Colors.primary,
        activeBackgroundColor: Colors.shadow
    },
);

ThemeManager.setComponentTheme(
    'View', {
        backgroundColor:Colors.white,
    },
);

ThemeManager.setComponentTheme(
    'TextField', {
        borderRadius:40,

    },
);

ThemeManager.setComponentTheme(
    'TouchableOpacity', {
        backgroundColor:Colors.white,
    },
);

