import { NetInfoState } from "@react-native-community/netinfo";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useEffect, useRef } from "react";
import { ColorSchemeName } from "react-native";

import NetInfo from "../network/NetInfo";
import AuthScreen from "../screens/hooks/Auth/AuthScreen";
import CreateAccountScreen from "../screens/hooks/Auth/CreateAccountScreen";
import LostPasswordScreen from "../screens/hooks/Auth/LostPasswordScreen";
import ExplorerFolderScreen from "../screens/hooks/Connected/ExplorerFolderScreen";
import HomeScreen from "../screens/hooks/Connected/HomeScreen";
import RevealPasswordScreen from "../screens/hooks/Connected/RevealPasswordScreen";
import { Sync } from "../Synchorization/Sync";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const isConnected = true; // en fonction de si la personne est connectée ou non.
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {isConnected ? ConnectedNavigator() : AuthNavigator()}
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  //Les screens pour l'auth
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: "Authentification" }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: "Création de compte" }}
      />
      <Stack.Screen
        name="LostPassword"
        component={LostPasswordScreen}
        options={{ title: "Mot de passe oublié" }}
      />
    </Stack.Navigator>
  );
}

function ConnectedNavigator() {
  // tous les autres screens en tant que connecté

  const networkInfo = useRef<NetInfoState | null>(); // évitons de faire changer le state de toute l'app

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (
        state?.isInternetReachable &&
        !networkInfo.current?.isInternetReachable
      ) {
        // si la valeur useRef précédente était à false alors on relance une vérification de synchro
        networkInfo.current = state;
        //Sync()
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Password Manager" }}
      />
      <Stack.Screen
        name="ExplorerFolder"
        component={ExplorerFolderScreen}
        options={{ title: "Folder" }}
      />
      <Stack.Screen
        name="RevealPassword"
        component={RevealPasswordScreen}
        options={{ title: "Password" }}
      />
    </Stack.Navigator>
  );
}
