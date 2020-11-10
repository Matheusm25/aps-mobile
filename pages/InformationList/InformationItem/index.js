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
  const levels = {
    1: 'Público',
    2: 'Diretor',
    3: 'Ministro',
  };

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.description}>Descrição</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.level}>Nível acesso</Text>
          <Text style={styles.level}>{levels[level]}</Text>
        </View>
      </View>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#2ed573",
    borderWidth: 2,
    marginVertical: 5,
    width: 280,
    minHeight: 60,
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
    fontSize: 14,
    width: 150,
  },
  level: {
    color: '#fff',
    textAlign: 'center'
  },
  header: {

  }
});