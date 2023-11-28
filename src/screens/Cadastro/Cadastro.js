import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cadastro() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const validationSchema = Yup.object().shape({
    cpf: Yup
      .string()
      .min(11, "CPF deve conter 11 digitos")
      .required("Este campo obrigatório!"),
    telefone: Yup
      .string()
      .min(11, "Telefone deve conter 11 digitos")
      .required('Este campo obrigatório'),
    nome: Yup
      .string()
      .min(5, 'deve conter pelo menos 5 caracteres')
      .max(50, 'deve conter no máximo 50 caracteres')
      .required('Este campo obrigatório'),
    email: Yup
      .string()
      .email('E-mail inválido')
      .required('Este campo obrigatório'),
    senha: Yup
      .string()
      .min(8, 'deve conter pelo menos 8 caracteres')
      .max(12, 'deve conter no máximo 12 caracteres')
      .required('Este campo obrigatório'),
  });

  useEffect(() => {
    loadUsuarios();
  }, []);

  async function loadUsuarios() {
    try {
      const storedUsuarios = await AsyncStorage.getItem('usuarios');
      if (storedUsuarios) {
        setUsuarios(JSON.parse(storedUsuarios));
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  async function saveUsuarios(novosUsuarios) {
    try {
      await AsyncStorage.setItem('usuarios', JSON.stringify(novosUsuarios));
    } catch (error) {
      console.error('Erro ao salvar usuários:', error);
    }
  }

  function cadastrar(values) {
    console.log('Usuario: ', values);
    if (usuarioEditando !== null) {
      const novosUsuarios = [...usuarios];
      novosUsuarios[usuarioEditando] = values;
      setUsuarios(novosUsuarios);
      setUsuarioEditando(null);
      saveUsuarios(novosUsuarios);
    } else {
      const novosUsuarios = [...usuarios, values];
      setUsuarios(novosUsuarios);
      saveUsuarios(novosUsuarios);
    }
  }

  function editarUsuario(index) {
    setUsuarioEditando(index);
    const usuario = usuarios[index];
  }

  function excluirUsuario(index) {
    const novosUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(novosUsuarios);
    setUsuarioEditando(null);
    saveUsuarios(novosUsuarios);
  }

  return (
    <View style={styles.container}>
      <Text
        variant='headlineLarge'
        style=
        {{
          marginTop: '4%',
          color: 'white',
          textShadowColor: 'black',
          textShadowOffset: { width: 3, height: 3 }
        }}
      >
        Cadastre-se
      </Text>

      <Formik
        initialValues={{
          cpf: '',
          telefone: '',
          nome: '',
          email: '',
          senha: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => cadastrar(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors, values }) => (
          <>
            <View style={styles.inputContainer}>

              <TextInput
                style={styles.input}
                mode='outlined'
                label={'CPF'}
                placeholder='000.000.000-00'
                value={values.cpf}
                onChangeText={handleChange('cpf')}
                onBlur={handleBlur('cpf')}
                error={touched.cpf && errors.cpf}
                keyboardType='numeric'
                render={props =>
                  <TextInputMask
                    {...props}
                    type={'cpf'}
                  />
                }
              />

              {(touched.cpf && errors.cpf) && <Text style={{ color: 'red' }}>{errors.cpf}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label={'Telefone'}
                placeholder='(00)9.0000-0000'
                value={values.telefone}
                onChangeText={handleChange('telefone')}
                onBlur={handleBlur('telefone')}
                error={touched.telefone && errors.telefone}
                keyboardType='numeric'
                render={props =>
                  <TextInputMask
                    {...props}
                    type={'cel-phone'}
                  />
                }
              />

              {(touched.telefone && errors.telefone) && <Text style={{ color: 'red' }}>{errors.telefone}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label={'Nome'}
                value={values.nome}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                error={touched.nome && errors.nome}
              />

              {(touched.nome && errors.nome) && <Text style={{ color: 'red' }}>{errors.nome}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label={'Email'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType='email-address'
                error={touched.email && errors.email}
              />

              {(touched.email && errors.email) && <Text style={{ color: 'red' }}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                mode='outlined'
                label={'Senha'}
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                secureTextEntry
                error={touched.senha && errors.senha}
              />

              {(touched.senha && errors.senha) && <Text style={{ color: 'red' }}>{errors.senha}</Text>}
            </View>

            <Button
              mode='elevated'
              onPress={() => {
                handleSubmit();
              }}
              style={{ marginTop: '4%', }}
            >
              {usuarioEditando !== null ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </>
        )}
      </Formik>

      <FlatList
        data={usuarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Card style={styles.card} mode='outlined'>
            <Card.Content style={styles.cardContent}>
              <View style={styles.userDataContainer}>
                <Text variant='titleMedium'>{`Nome: ${item.nome}`}</Text>
                <Text variant='titleMedium'>{`CPF: ${item.cpf}`}</Text>
                <Text variant='titleMedium'>{`Email: ${item.email}`}</Text>
              </View>
              <View style={styles.iconButtonsContainer}>
                <IconButton icon='pen' onPress={() => editarUsuario(index)} />
                <IconButton icon='trash-can-outline' onPress={() => excluirUsuario(index)} />
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2%',
    backgroundColor: '#6c4ab6',
  },
  inputContainer: {
    width: '90%',
    paddingTop: 10,
    gap: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDataContainer: {
    marginRight: '30%',
  },
  iconButtonsContainer: {
    flexDirection: 'row',
  },
});