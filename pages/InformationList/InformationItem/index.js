import React, { useEffect, useState  } from 'react';
import { 
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';


export default function Login({ description, level}) {

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.description}>Descrição</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.level}>Nível acesso</Text>
          <Text style={styles.level}>{level}</Text>
        </View>
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderWidth: 2,
    marginVertical: 5,
    width: 280,
    height: 60,
    borderRadius: 12,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  description: {
    color: "#fff",
  },
  level: {
    color: '#fff',
    textAlign: 'center'
  },
  header: {

  }
});