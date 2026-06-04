import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '@themes/index';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          borderTopWidth: 1,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.outline,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.primary,
        headerTitleStyle: {
          color: theme.colors.onSurface,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => <MaterialIcons name="message" size={24} color={color} />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: 'Status',
          tabBarIcon: ({ color }) => <MaterialIcons name="circle" size={24} color={color} />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />,
          headerShown: true,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons name="cog" size={24} color={color} />,
          headerShown: true,
        }}
      />
    </Tabs>
  );
}
