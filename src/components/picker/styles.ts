import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #fff;
`;

export const PickerStyled = styled(Picker)`
  width: 100%;
  background-color: #fff;
`;

export const PickerItem = styled(Picker.Item)`
  width: 100%;
`;
