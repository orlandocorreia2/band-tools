import { PressableStyled, Title } from "./styles";
import { ButtonProps } from "./types";

export default function Button({
  title,
  onPress,
  onPressOut,
  color = "transparent",
  borderColor = "transparent",
}: ButtonProps) {
  return (
    <PressableStyled
      onPress={onPress}
      color={color}
      onPressOut={onPressOut}
      borderColor={borderColor}
    >
      <Title>{title}</Title>
    </PressableStyled>
  );
}
