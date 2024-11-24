import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  position: absolute;
  bottom: 10px;
  right: 16px;
`;

export const PressableStyled = styled.Pressable`
  position: absolute;
  bottom: 10px;
  right: 16px;
`;

export const Icon = styled(Feather)`
  color: #fff;
  font-size: 40px;
`;
