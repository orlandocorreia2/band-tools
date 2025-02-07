import React, { useCallback } from "react";
import { Pressable } from "react-native";
import * as Linking from "expo-linking";
import {
  Container,
  ContainerInfo,
  ContainerLogo,
  ContainerSocialButtons,
  Divisor,
  Logo,
  Title,
} from "./styles";
import { Icon } from "@/src/shared/styles";

export default function DrawerHeader() {
  const onPress = useCallback((name: string) => {
    if (name === "instagram") {
      Linking.openURL("https://www.instagram.com/electric_grave/");
    }
    if (name === "youtube") {
      Linking.openURL("https://www.youtube.com/@electric_grave");
    }
    if (name === "site") {
      Linking.openURL("https://www.electricgrave.com.br/");
    }
  }, []);

  return (
    <>
      <Container>
        <ContainerLogo>
          <Logo source={require("../../../assets/images/logo-band.png")} />
        </ContainerLogo>

        <ContainerInfo>
          <Title>Electric Grave</Title>
          <ContainerSocialButtons>
            <Pressable onPress={() => onPress("instagram")}>
              <Icon name="instagram" color="#fff" />
            </Pressable>
            <Pressable onPress={() => onPress("youtube")}>
              <Icon name="youtube" color="#fff" />
            </Pressable>
            <Pressable onPress={() => onPress("site")}>
              <Icon name="link" color="#fff" />
            </Pressable>
          </ContainerSocialButtons>
          <Title>Ver: 1.0.0</Title>
        </ContainerInfo>
      </Container>
      <Divisor />
    </>
  );
}
