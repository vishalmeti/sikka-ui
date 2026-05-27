import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  type ViewProps,
} from "react-native";
import { colors } from "@/lib/theme";

interface ScreenWrapperProps extends ViewProps {
  avoidKeyboard?: boolean;
}

/**
 * Root wrapper for every screen: safe area + dark background + optional
 * keyboard-avoiding behaviour. Screens should not set their own background.
 */
export function ScreenWrapper({
  children,
  avoidKeyboard = false,
  style,
  ...rest
}: ScreenWrapperProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={avoidKeyboard && Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.flex, style]} {...rest}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
});
