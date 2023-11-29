import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
export default function ListaLembretesAsyncStorage() {

    const [lembretes, setLembretes] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [editando, setEditando] = useState(false)
    const [lembreteSendoEditado, setLembreteSendoEditado] = useState(null)

    useEffect(() => {
        loadLembretes()
    },[])

    async function loadLembretes() {
        const response =  await AsyncStorage.getItem('lembretes')
        console.log("🚀 ~ file: ListaLembretes.js:21 ~ loadLembretes ~ response:", response)
        const lembretesStorage = response ? JSON.parse(response) : []
        setLembretes(lembretesStorage)
    }

    async function adicionarLembrete() {
        console.log('ADICIONAR LEMBRETE')
        let novaListaLembretes = lembretes
        novaListaLembretes.push(inputValue)
        await AsyncStorage.setItem('lembretes', JSON.stringify(novaListaLembretes));
        setLembretes(novaListaLembretes)
        setLembreteSendoEditado(null)
        setInputValue('')
    }

    async function editarLembrete() {
        console.log('EDITAR LEMBRETE')
        console.log('lembreteSendoEditado: ', lembreteSendoEditado)
        console.log('lembreteASerEditado inputValue: ', inputValue)

        let index = lembretes.indexOf(lembreteSendoEditado)
        let novaListaLembretes = lembretes

        novaListaLembretes.splice(index, 1, inputValue)

        await AsyncStorage.setItem('lembretes', JSON.stringify(novaListaLembretes));
        setLembretes(novaListaLembretes)
        setEditando(false)
        setInputValue('')
    }

    async function excluirLembrete(lembrete) {
        let novaListaLembretes = lembretes.filter(item => item !== lembrete)
        await AsyncStorage.setItem('lembretes', JSON.stringify(novaListaLembretes));
        setLembretes(novaListaLembretes)
    }

    function handleEditarLembrete(lembrete) {
        setLembreteSendoEditado(lembrete)
        setInputValue(lembrete)
        setEditando(true)
    }

    function handleButton() {
        console.log('HANDLE BUTTON -> editando: ', editando)
        if (editando) {
            editarLembrete()
        } else {
            adicionarLembrete()
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputContainer}>

                <TextInput
                    style={{ flex: 4 }}
                    mode='outlined'
                    label='Lembrete'
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />


                <Button
                    style={styles.button}
                    mode='elevated'
                    onPress={handleButton}
                >
                    {editando ? 'Editar' : 'Adicionar'}
                </Button>
            </View>

            <FlatList
                style={styles.list}
                data={lembretes}
                renderItem={({ item }) => (
                    <Card
                        style={styles.card}
                        mode='outlined'
                    >
                        <Card.Content style={styles.cardContent}>
                            <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
                            <IconButton icon='pen' onPress={() => {
                                handleEditarLembrete(item)
                            }} />
                            <IconButton icon='trash-can-outline' onPress={() => {
                                excluirLembrete(item)
                            }} />
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    )
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
        gap: 5
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        width: '95%',
        marginTop: 10
    },
    card: {
        margin: 10
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});