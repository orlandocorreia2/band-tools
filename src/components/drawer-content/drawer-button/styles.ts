import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const PressableStyled = styled.Pressable`
  padding-bottom: 16;
  flex-direction: row;
  align-items: center;
`;

type TitleProps = {
  isFocused: boolean;
};

export const Title = styled.Text<TitleProps>`
  font-size: 20;
  color: #fff;
  /* color: ${({ isFocused }) => isFocused && "#727D98"}; */
`;

export const Icon = styled(Feather)`
  color: #fff;
  font-size: 18;
  margin-right: 4px;
`;
