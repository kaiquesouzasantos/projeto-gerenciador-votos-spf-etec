import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reports from './pages/Reports';
import Leaderboard from './pages/Leaderboard';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export type TabParamList = {
  Reports: undefined;
  Leaderboard: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigation() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused, size }) => {
          let iconName =
            route.name === 'Reports' ? 'newspaper-outline' : 'leaderboard';

          if (iconName === 'newspaper-outline') {
            return (
              <MaterialCommunityIcons
                name='clipboard-text-outline'
                size={24}
                color={focused ? '#b20000' : '#444'}
              />
            );
          } else {
            return (
              <MaterialIcons
                name='leaderboard'
                size={24}
                color={focused ? '#b20000' : '#444'}
              />
            );
          }
        },
        tabBarActiveTintColor: '#b20000',
        tabBarInactiveTintColor: '#444',
      })}
    >
      <Tab.Screen
        name='Reports'
        component={Reports}
        options={{
          tabBarLabel: 'Relatorios',
        }}
      />
      <Tab.Screen
        name='Leaderboard'
        component={Leaderboard}
        options={{
          tabBarLabel: 'Classificação',
        }}
      />
    </Tab.Navigator>
  );
}
