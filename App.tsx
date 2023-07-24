import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/views/HomeScreen';
import DetailsClient from './src/views/DetailsClient';
import NewClient from './src/views/NewClient';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import Nav from './src/components/ui/Nav';
function App(): JSX.Element {


  const Stack = createNativeStackNavigator();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
    }
  }


  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.surface,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            // options={({ navigation, route }) => ({
            //   headerLeft: (props) => <Nav
            //     {...props}
            //     navigation={navigation}
            //     route={route}
            //   />,
            // })}
          />
          <Stack.Screen
            name="NewClient"
            component={NewClient}
            options={{
              title: 'New Client',
            }}
          />
          <Stack.Screen
            name="DetailsClient"
            component={DetailsClient}
            options={{
              title: 'Client Details',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});

export default App;
