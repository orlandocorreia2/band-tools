import { KeyboardTypeOptions } from "react-native";

export type InputProps = {
  title?: string;
  value?: string;
  onChangeText: (value: any) => void;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  maxLength?: number;
};
