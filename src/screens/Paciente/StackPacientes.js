import { createStackNavigator } from '@react-navigation/stack';
import FormPaciente from './FormPaciente';
import ListaPacientes from './ListaPacientes';

const Stack = createStackNavigator()

export default function StackPacientes() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaPacientes'
        >

            <Stack.Screen name='ListaPacientes' component={ListaPacientes} />

            <Stack.Screen name='FormPaciente' component={FormPaciente} />

        </Stack.Navigator>

    )
}