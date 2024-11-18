import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const PressableStyled = styled.Pressable`
  padding-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

type TitleProps = {
  isFocused: boolean;
};

export const Title = styled.Text<TitleProps>`
  font-size: 20px;
  color: #fff;
  /* color: ${({ isFocused }) => isFocused && "#727D98"}; */
`;

export const Icon = styled(Feather)`
  color: #fff;
  font-size: 18px;
  margin-right: 4px;
`;
