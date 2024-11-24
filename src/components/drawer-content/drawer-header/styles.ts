import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

export const ContainerLogo = styled.View`
  z-index: 1;
`;

export const ContainerInfo = styled.View`
  flex: 1;
`;

export const Logo = styled(Image).attrs({ resizeMode: "stretch" })`
  width: 70px;
  height: 70px;
  border: 2px;
  border-color: #fff;
  border-radius: 35px;
`;

export const Title = styled.Text`
  color: #fff;
  font-weight: 600;
  text-align: center;
`;

export const ContainerSocialButtons = styled.View`
  height: 30px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 16px;
`;

export const Icon = styled(Feather)`
  color: #fff;
  font-size: 18px;
`;

export const Divisor = styled.View`
  margin: 16px 0px;
  width: 100%;
  height: 4px;
  border-radius: 5px;
  background-color: #fff;
`;
