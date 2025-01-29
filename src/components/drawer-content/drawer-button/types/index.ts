import { PressableProps } from "react-native";

export interface TabBarButtonProps extends PressableProps {
  title?: "" | "Início" | "Agenda" | "SetLists" | "Repertório";
  isFocused?: boolean;
}
