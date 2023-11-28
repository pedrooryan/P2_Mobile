import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Home from '../screens/Home';
import ListaCarros from '../screens/Lembrete/Lembrete';
import Senhas from '../screens/Senhas/Senhas';
import StackPessoas from '../screens/Paciente/StackPacientes';
import Cadastro from '../screens/Cadastro/Cadastro';
import Videos from '../screens/Videos/Videos';

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Home'>

            <Drawer.Screen name="Início" component={Home} />
            <Drawer.Screen name="Cadastro" component={Cadastro} />
            <Drawer.Screen name="Lembretes" component={ListaCarros} />
            <Drawer.Screen name="Senhas" component={Senhas} />
            <Drawer.Screen name="Cadastro Pacientes" component={StackPessoas} />
            <Drawer.Screen name="Videos" component={Videos} />

        </Drawer.Navigator>

    )
}