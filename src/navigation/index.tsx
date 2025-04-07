import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HeaderButton, Text } from '@react-navigation/elements';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, StyleSheet, View } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';

import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Updates } from './screens/Updates';
import { NotFound } from './screens/NotFound';
import SequenceMemory from './screens/SequenceMemory';
import ReactionTime from './screens/ReactionTime';
import NumberMemory from './NumberMemory';
import Chaintest from './screens/Chaintest';


// First define styles
const styles = StyleSheet.create({
  // Header Styles
  headerStyle: {
    backgroundColor: '#0411FB', // Blue color for header
  },
  headerButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginRight: 15,
  },
  headerText: {
    fontSize: 20, // Increased text size
    fontWeight: '600',
    color: '#fff',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  screenTitle: {
    fontSize: 32, // Increased text size for titles
    fontWeight: '700',
    color: '#0411FB', // Blue title text
    marginBottom: 20,
  },
  // Drawer Styles
  drawerContent: {
    backgroundColor: '#333',
    paddingTop: 70,
    paddingHorizontal: 15,
    flex: 1,
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatarImage: {
    width: 80, // Size of the avatar
    height: 80,
    borderRadius: 40, // Circular shape
    borderWidth: 2,
    borderColor: '#fff', // White border around avatar
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 18, // Larger font size for drawer items
    paddingVertical: 15, // Larger padding for better touch area
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginBottom: 8,
    borderRadius: 8,
    paddingLeft: 20,
  },
  drawerItemActive: {
    backgroundColor: '#0411FB', // Active drawer item with blue color
    color: '#fff',
    borderRadius: 8,
  },
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 15, // Added margin for better spacing between cards
  },
  tabBarStyle: {
    backgroundColor: '#0411FB', // Blue tab bar
    borderTopWidth: 0,
    elevation: 10,
  },
  tabBarIcon: {
    width: 35, // Increased icon size
    height: 35,
    tintColor: '#fff',
  },
  // New button styles
  buttonStyle: {
    backgroundColor: '#0411FB', // Blue background for buttons
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18, // Increased font size for button text
    color: '#fff',
    fontWeight: '600',
  },
});

// Create Drawer Navigator with styles
const Drawer = createDrawerNavigator({
  screens: {
    Home: {
      screen: Home,
      options: { 
        title: 'Home',
        drawerItemStyle: styles.drawerItem,
        drawerActiveTintColor: styles.drawerItemActive.color,
        drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor,
      },
    },
    ReactionTime: {
      screen: ReactionTime,
      options: { 
        title: 'Reaction Time',
        drawerItemStyle: styles.drawerItem,
        drawerActiveTintColor: styles.drawerItemActive.color,
        drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor,
      },
    },
    SequenceMemory: {
      screen: SequenceMemory,
      options: { 
        title: 'Sequence Memory',
        drawerItemStyle: styles.drawerItem,
        drawerActiveTintColor: styles.drawerItemActive.color,
        drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor,
      },
    },
    NumberMemory: {
      screen: NumberMemory,
      options: { 
        title: 'Number Memory',
        drawerItemStyle: styles.drawerItem,
        drawerActiveTintColor: styles.drawerItemActive.color,
        drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor,
      },
    },
    Chaintest: {
      screen: Chaintest,
      options: { 
        title: 'Chain Test',
        drawerItemStyle: styles.drawerItem,
        drawerActiveTintColor: styles.drawerItemActive.color,
        drawerActiveBackgroundColor: styles.drawerItemActive.backgroundColor,
      },
    },
  },
  options: {
    drawerStyle: styles.drawerContent,
    drawerType: 'front',
    overlayColor: 'transparent',
    headerStyle: styles.headerStyle,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  drawerContentOptions: {
    drawerIcon: () => (
      <View style={styles.avatarContainer}>
        <Image source={bell} style={styles.avatarImage} />
      </View>
    ),
  },
});

// Create Root Stack Navigator
const RootStack = createNativeStackNavigator({
  screens: {
    Drawer: {
      screen: Drawer,
      options: { headerShown: false },
    },
    ReactionTime: {
      screen: ReactionTime,
      options: { 
        headerShown: true,
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
      },
    },
    SequenceMemory: {
      screen: SequenceMemory,
      options: { 
        headerShown: true,
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
      },
    },
    NumberMemory: {
      screen: NumberMemory,
      options: { 
        headerShown: true,
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
      },
    },
    Chaintest: {
      screen: Chaintest,
      options: { 
        headerShown: true,
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack} style={styles.headerButton}>
            <Text style={styles.headerText}>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: { 
        title: '404',
        headerStyle: styles.headerStyle,
        headerTintColor: '#fff',
      },
      linking: { path: '*' },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
