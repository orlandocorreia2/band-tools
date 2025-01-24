import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

type IconProps = { isFocused?: boolean; color?: string; fontSize?: number };
export const Icon = styled(Feather)<IconProps>`
  color: ${({ isFocused }) => (isFocused ? "#999" : "#FFF")};
  color: ${({ color }) => color ?? "#000"};
  font-size: ${({ fontSize }) => fontSize ?? 18}px;
`;
