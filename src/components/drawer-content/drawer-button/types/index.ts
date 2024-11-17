import { PressableProps } from "react-native";

export interface TabBarButtonProps extends PressableProps {
  title?: "" | "Início" | "SetList";
  isFocused?: boolean;
}
