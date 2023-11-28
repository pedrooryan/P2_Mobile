import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
export default function FormPaciente({ navigation, route }) {

    const { acao, paciente: pacienteAntiga } = route.params

    const [nome, setNome] = useState('')
    const [sexo, setSexo] = useState('')
    const [idade, setIdade] = useState('')
    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')

    const [showMensagemErro, setShowMensagemErro] = useState(false)


    useEffect(() => {

        console.log('paciente -> ', pacienteAntiga)

        if (pacienteAntiga) {
            setNome(pacienteAntiga.nome)
            setSexo(pacienteAntiga.sexo)
            setIdade(pacienteAntiga.idade)
            setPeso(pacienteAntiga.peso)
            setAltura(pacienteAntiga.altura)
        }

    }, [])


    function salvar() {

        if (nome === '' || sexo === '' || idade === '' || peso === '' || altura === '') {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const novaPaciente = {
                nome: nome,
                sexo: sexo,
                idade: idade,
                peso: peso,
                altura: altura
            }

            const objetoEmString = JSON.stringify(novaPaciente)
            console.log("🚀 ~ file: FormPaciente.js:47 ~ salvar ~ objetoEmString:", objetoEmString)
            console.log(typeof (objetoEmString))

            const objeto = JSON.parse(objetoEmString)
            console.log("🚀 ~ file: FormPaciente.js:52 ~ salvar ~ objeto:", objeto)
            console.log(typeof (objeto))

            if (pacienteAntiga) {
                acao(pacienteAntiga, novaPaciente)
            } else {
                acao(novaPaciente)
            }
            Toast.show({
                type: 'success',
                text1: 'Paciente cadastrado!'
            })
            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Text variant='titleLarge' style={styles.title} >{pacienteAntiga ? 'Editar Paciente' : 'Cadastrar Paciente'}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Sexo | M, F, Outro'}
                    mode='outlined'
                    value={sexo}
                    onChangeText={text => setSexo(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Idade'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={idade}
                    onChangeText={text => setIdade(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Peso | KG'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={peso}
                    onChangeText={text => setPeso(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Altura | cm'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={altura}
                    onChangeText={text => setAltura(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }
            </View>

            <View style={styles.buttonContainer}>

                <Button
                    style={styles.button}
                    mode='elevated'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

                <Button
                    style={styles.button}
                    mode='elevated'
                    onPress={salvar}
                >
                    Salvar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6c4ab6',
    },
    title: {
        fontWeight: 'bold',
        margin: '5%',
        color: 'white'
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1,
        
    }
})