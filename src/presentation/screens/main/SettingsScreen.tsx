import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ThemedView, ThemedText, Button, ListItem } from '@components/index';
import { useTheme } from '@themes/index';
import { spacing } from '@themes/spacing';
import { useRouter } from 'expo-router';
import { AuthService } from '@services/AuthService';
import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const SettingsScreen = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.replace('/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ThemedText variant="headlineSmall" style={{ paddingHorizontal: spacing.lg, marginTop: spacing.lg }}>
          Account Settings
        </ThemedText>

        <ListItem
          title="Profile"
          subtitle="Edit your profile information"
          leftElement={<MaterialIcons name="account" size={24} color={theme.colors.primary} />}
          onPress={() => {}}
        />

        <ListItem
          title="Privacy"
          subtitle="Manage your privacy settings"
          leftElement={<MaterialIcons name="shield" size={24} color={theme.colors.primary} />}
          onPress={() => {}}
        />

        <ListItem
          title="Notifications"
          subtitle="Configure notification preferences"
          leftElement={<MaterialIcons name="bell" size={24} color={theme.colors.primary} />}
          onPress={() => {}}
        />

        <ListItem
          title="Theme"
          subtitle="Change app appearance"
          leftElement={<MaterialIcons name="palette" size={24} color={theme.colors.primary} />}
          onPress={() => {}}
        />

        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.xl }}>
          <Button
            label="Sign Out"
            variant="outlined"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
