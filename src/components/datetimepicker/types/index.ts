import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { StyleProp, ViewStyle } from "react-native";

export type DateTimePickerProps = {
  value: Date;
  testID?: string;
  label?: string;
  placeholder?: string;
  mode?: "countdown" | "date" | "datetime" | "time";
  is24Hour?: boolean;
  onChange: (event: DateTimePickerEvent, value: Date | undefined) => void;
  style?: StyleProp<ViewStyle>;
};
