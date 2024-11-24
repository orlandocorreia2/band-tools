import { useCallback } from "react";
import { TabBarButtonProps } from "./types";
import { Icon, PressableStyled, Title } from "./styles";

export default function DrawerButton({
  title = "",
  isFocused = false,
  ...rest
}: TabBarButtonProps) {
  const renderIcon = useCallback(
    (title: "" | "Início" | "SetList") => {
      if (!title) return;
      const iconNames = {
        Início: <Icon name="home" isFocused={isFocused} />,
        Agenda: <Icon name="calendar" isFocused={isFocused} />,
        SetList: <Icon name="music" isFocused={isFocused} />,
        Repertório: <Icon name="list" isFocused={isFocused} />,
      };
      return iconNames[title];
    },
    [isFocused]
  );

  return (
    <PressableStyled {...rest}>
      {renderIcon(title)}
      <Title isFocused={isFocused}>{title}</Title>
    </PressableStyled>
  );
}
