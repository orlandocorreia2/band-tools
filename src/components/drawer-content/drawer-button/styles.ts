import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const PressableStyled = styled.Pressable`
  margin-bottom: 24px;
  flex-direction: row;
  align-items: center;
`;

type TitleProps = {
  isFocused: boolean;
};

export const Title = styled.Text<TitleProps>`
  font-size: 20px;
  color: ${({ isFocused }) => (isFocused ? "#999999" : "#FFFFFF")};
`;

type IconProps = {
  isFocused: boolean;
};

export const Icon = styled(Feather)<IconProps>`
  color: ${({ isFocused }) => (isFocused ? "#999999" : "#FFFFFF")};
  font-size: 18px;
  margin-right: 4px;
`;
