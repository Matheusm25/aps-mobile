import React, { useEffect, useState  } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import * as LocalAuthentication from 'expo-local-authentication';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { login, loginByUsername } from '../../services/login';

export default function Login() {
  const navigation = useNavigation();
  const [hasUsername, setHasUsername] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [loggedAccounts, setLoggedAccounts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordField, setShowPasswordField] = useState(false);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();

    if (!hasPassword) return;

    const { success, error } = await LocalAuthentication.authenticateAsync();

    if (success) {
      const token = await loginByUsername(username);
      sendUserToList(token);
    } else {
      setShowPasswordField(true);
    }
  }

  async function alreadyMadeLogin() {
		try {
      const savedLoggedAccounts = await AsyncStorage.getItem('@aps-mobile/loggedAccounts') || '[]';
      if (savedLoggedAccounts) {
        setLoggedAccounts(JSON.parse(savedLoggedAccounts));
      }
		} catch (err) {
			return false;
		}
  }
  
  async function sendUserToList(token) {
    navigation.navigate('InformationList', {
      token,
    });
  }

  async function addUsernameToStorage() {
    const savedLoggedAccounts = await AsyncStorage.getItem('@aps-mobile/loggedAccounts') || '[]';
    const savedLoggedAccountsArray = JSON.parse(savedLoggedAccounts) || [];
    savedLoggedAccountsArray.push(username);
    await AsyncStorage.setItem('@aps-mobile/loggedAccounts', JSON.stringify(savedLoggedAccountsArray));
  }
	
  async function handleLogin() {
    Keyboard.dismiss();
    if (loggedAccounts.includes(username) && !showPasswordField) {
      authenticate();
    } else if (!showPasswordField) {
      setShowPasswordField(true);
    } else {
      const token = await login(username, password);
      if (token) {
        addUsernameToStorage();
        sendUserToList(token);
      }
    }
  }

  useEffect(() => {
    setUsername('');
    setPassword('');
    setShowPasswordField(false);
		alreadyMadeLogin();
	}, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#444"
        value={username}
        onChangeText={text => setUsername(text)}
        autoCapitalize="none"
      />
      
      {
        showPasswordField && (
          <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCapitalize="none"
            placeholderTextColor="#444"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        )
      }

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19181f",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#2ed573",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    color: '#FFF',
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: "#2ed573",
    backgroundColor: "#2ed573",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#333",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%"
  },
  cancelText: {
    color: "red",
    fontSize: 16
  },
  authText: {
    color: "white",
    fontSize: 16
  }
});