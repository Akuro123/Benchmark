import 'react-native-gesture-handler';
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';
import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        
        await Asset.loadAsync([
          ...NavigationAssets,
          require('./assets/newspaper.png'),
          require('./assets/bell.png'),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <View />; 
  }

  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'helloworld://',
        ],
      }}
    />
  );
}
