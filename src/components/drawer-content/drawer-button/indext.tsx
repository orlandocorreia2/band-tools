import { useCallback } from "react";
import { TabBarButtonProps } from "./types";
import { PressableStyled, Title } from "./styles";
import { Icon } from "@/src/shared/styles";

export default function DrawerButton({
  title = "",
  isFocused = false,
  ...rest
}: TabBarButtonProps) {
  const renderIcon = useCallback(
    (title: TabBarButtonProps["title"]) => {
      if (!title) return;
      const iconNames = {
        Início: <Icon name="home" isFocused={isFocused} />,
        Agenda: <Icon name="calendar" isFocused={isFocused} />,
        SetLists: <Icon name="music" isFocused={isFocused} />,
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
