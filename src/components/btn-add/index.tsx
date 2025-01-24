import { Icon } from "@/src/shared/styles";
import { PressableStyled } from "./styles";
import { BtnAddProps } from "./types";

export default function BtnAdd({ onPress }: BtnAddProps) {
  return (
    <PressableStyled onPress={onPress}>
      <Icon name="plus-circle" color="#fff" fontSize={36} />
    </PressableStyled>
  );
}
