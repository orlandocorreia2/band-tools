import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  margin-bottom: 16px;
`;

export const LabelContainer = styled.TouchableOpacity`
  width: 100%;
`;

export const LabelText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const InputContainer = styled.TouchableOpacity`
  flex-direction: row;
  gap: 8px;
  align-items: center;
  padding-left: 12px;
  background: #fff;
  height: 50px;
`;

export const InputText = styled.Text`
  color: #000;
  font-size: 18px;
`;

export const Icon = styled(Feather)`
  color: #000;
  font-size: 18px;
`;
