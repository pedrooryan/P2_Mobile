import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Button, IconButton, TextInput } from 'react-native-paper';

export default function ListaSenhasAsyncStorage() {
  const [senhas, setSenhas] = useState([]);
  const [site, setSite] = useState('');
  const [senha, setSenha] = useState('');
  const [editando, setEditando] = useState(false);
  const [senhaSendoEditado, setSenhaSendoEditado] = useState(null);

  useEffect(() => {
    loadSenhas();
  }, []);

  async function loadSenhas() {
    const response = await AsyncStorage.getItem('senhas');
    const senhasStorage = response ? JSON.parse(response) : [];
    setSenhas(senhasStorage);
  }

  async function adicionarSenha() {
    const novaSenha = { site, senha };
    const novaListaSenhas = [...senhas, novaSenha];
    await AsyncStorage.setItem('senhas', JSON.stringify(novaListaSenhas));
    setSenhas(novaListaSenhas);
    setSite('');
    setSenha('');
  }

  async function editarSenha() {
    const index = senhas.indexOf(senhaSendoEditado);
    const novaListaSenhas = [...senhas];
    novaListaSenhas[index] = { site, senha };

    await AsyncStorage.setItem('senhas', JSON.stringify(novaListaSenhas));
    setSenhas(novaListaSenhas);
    setEditando(false);
    setSite('');
    setSenha('');
  }

  async function excluirSenha(senha) {
    const novaListaSenhas = senhas.filter((item) => item !== senha);
    await AsyncStorage.setItem('senhas', JSON.stringify(novaListaSenhas));
    setSenhas(novaListaSenhas);
  }

  function handleEditarSenha(senha) {
    setSenhaSendoEditado(senha);
    setSite(senha.site);
    setSenha(senha.senha);
    setEditando(true);
  }

  function handleButton() {
    if (editando) {
      editarSenha();
    } else {
      adicionarSenha();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 4 }}
          mode='outlined'
          label='local'
          value={site}
          onChangeText={(text) => setSite(text)}
        />
        <TextInput
          style={{ flex: 4 }}
          mode='outlined'
          label='valor'
          value={senha}
          onChangeText={(text) => setSenha(text)}
        />
        <Button style={styles.button} mode='elevated' onPress={handleButton}>
          {editando ? 'Editar' : 'Adicionar'}
        </Button>
      </View>

      <FlatList
        style={styles.list}
        data={senhas}
        renderItem={({ item, index }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
              <View style={styles.cardText}>
                <Text>{`local: ${item.site}`}</Text>
                <Text>{`valor: ${item.senha}`}</Text>
              </View>
              <IconButton icon='pen' onPress={() => handleEditarSenha(item)} />
              <IconButton icon='trash-can-outline' onPress={() => excluirSenha(item)} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#886A08',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 10,
    gap: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '95%',
    marginTop: 10,
  },
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8, // Borda arredondada para um visual mais amigável
    padding: 10,
    backgroundColor: 'white', // Cor de fundo
    elevation: 4, // Adiciona sombra para uma aparência elevada
    shadowColor: 'black', // Cor da sombra
    shadowOpacity: 0.2, // Opacidade da sombra
    shadowRadius: 2, // Raio da sombra
    shadowOffset: {
      width: 0,
      height: 2,
    }, },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardText: {
    flex: 1,
  },
});
