import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';


export default function ListaPacientes({ navigation, route }) {

  const [pacientes, setPacientes] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [pacienteASerExcluido, setPacienteASerExcluido] = useState(null)

  const showModal = () => setShowModalExcluirUsuario(true);
  const hideModal = () => setShowModalExcluirUsuario(false);

  function adicionarPaciente(paciente) {
    let novaListaPacientes = pacientes
    novaListaPacientes.push(paciente)
    setPacientes(novaListaPacientes)
  }

  function editarPaciente(pacienteAntiga, novosDados) {
    console.log('PACIENTE ANTIGA -> ', pacienteAntiga)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaPacientes = pacientes.map(paciente => {
      if (paciente == pacienteAntiga) {
        return novosDados
      } else {
        return paciente
      }
    })

    setPacientes(novaListaPacientes)

  }

  function excluirPaciente(paciente) {
    const novaListaPaciente = pacientes.filter(p => p !== paciente)
    setPacientes(novaListaPaciente)
    Toast.show({
      type: 'success',
      text1: 'Paciente excluido com sucesso!'
    })
  }

  function handleExluirPaciente() {
    excluirPaciente(pacienteASerExcluido)
    setPacienteASerExcluido(null)
    hideModal()
  }

  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de Pacientes</Text>

      <FlatList
        style={styles.list}
        data={pacientes}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Sexo: {item?.sexo}</Text>
                <Text variant='bodyLarge'>Idade: {item?.idade}</Text>
                <Text variant='bodyLarge'>Peso: {item.peso} kg</Text>
                <Text variant='bodyLarge'>Altura: {item?.altura} cm</Text>
              </View>


            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormPaciente', { acao: editarPaciente, paciente: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setPacienteASerExcluido(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormPaciente', { acao: adicionarPaciente })}
      />

      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir cadastro paciente?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Não</Button>
            <Button onPress={handleExluirPaciente}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#886A08',
  },
  title: {
    fontWeight: 'bold',
    margin: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})