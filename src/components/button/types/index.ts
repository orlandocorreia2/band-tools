export type ButtonProps = {
  title: string;
  onPress: () => void;
  onPressOut?: () => void;
  color?: string;
  borderColor?: string;
};
