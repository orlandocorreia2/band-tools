import { Icon, PressableStyled } from "./styles";
import { BtnAddProps } from "./types";

export default function BtnAdd({ onPress }: BtnAddProps) {
  return (
    <PressableStyled onPress={onPress}>
      <Icon name="plus-circle" />
    </PressableStyled>
  );
}
