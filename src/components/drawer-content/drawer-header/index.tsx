import { useCallback } from "react";
import { Pressable } from "react-native";
import * as Linking from "expo-linking";
import {
  Container,
  ContainerInfo,
  ContainerLogo,
  ContainerSocialButtons,
  Divisor,
  Icon,
  Logo,
  Title,
} from "./styles";

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
              <Icon name="instagram" />
            </Pressable>
            <Pressable onPress={() => onPress("youtube")}>
              <Icon name="youtube" />
            </Pressable>
            <Pressable onPress={() => onPress("site")}>
              <Icon name="link" />
            </Pressable>
          </ContainerSocialButtons>
        </ContainerInfo>
      </Container>
      <Divisor />
    </>
  );
}
