import React, { useEffect, useState  } from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import { getInformations } from '../../services/informations';

import InformationItem from './InformationItem';

export default function Login() {
  const route = useRoute();
  const [informations, setInformations] = useState([]);

  async function loadInformations() {
    const informationsData = await getInformations(route.params.token);
    if (informationsData) {
      setInformations(informationsData || []);
    }
  }

  useEffect(() => {
    loadInformations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list}>
        {informations.map(info => (
          <InformationItem {...info} key={info.id} />
        ))}
      </ScrollView>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#19181f",
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
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
  list: {
    flex: 1,
  }
});