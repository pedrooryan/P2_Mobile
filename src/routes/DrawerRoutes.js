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

            <Drawer.Screen name="Como fazer vitamina de banana:" component={Home} />
            <Drawer.Screen name="Cadastro da banana" component={Cadastro} />
            <Drawer.Screen name="Lembre da banana" component={ListaCarros} />
            <Drawer.Screen name="Comprar banana" component={Senhas} />
            <Drawer.Screen name="Cliente da banana" component={StackPessoas} />
            <Drawer.Screen name="Vídeo da banana" component={Videos} />

        </Drawer.Navigator>

    )
}