import { PressableProps } from "react-native";

export interface TabBarButtonProps extends PressableProps {
  title?: string;
  isFocused?: boolean;
}
