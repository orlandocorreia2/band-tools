import { TabBarButtonProps } from "./types";

import { PressableStyled, Title } from "./styles";

export default function DrawerButton({
  title = "",
  isFocused = false,
  ...rest
}: TabBarButtonProps) {
  return (
    <PressableStyled {...rest}>
      <Title isFocused={isFocused}>{title}</Title>
    </PressableStyled>
  );
}
