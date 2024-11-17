import { useCallback } from "react";
import { TabBarButtonProps } from "./types";
import { Icon, PressableStyled, Title } from "./styles";
import {} from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

export default function DrawerButton({
  title = "",
  isFocused = false,
  ...rest
}: TabBarButtonProps) {
  const renderIcon = useCallback((title: "" | "Início" | "SetList") => {
    if (!title) return;
    const iconNames = {
      Início: <Icon name="home" />,
      SetList: <Icon name="music" />,
    };
    return iconNames[title];
  }, []);

  return (
    <PressableStyled {...rest}>
      {renderIcon(title)}
      <Title isFocused={isFocused}>{title}</Title>
    </PressableStyled>
  );
}
