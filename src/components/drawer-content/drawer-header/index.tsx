import { useCallback } from "react";
import { Pressable } from "react-native";
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
    console.log(name);
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
            <Pressable onPress={() => onPress("youtube")}>
              <Icon name="youtube" />
            </Pressable>
            <Pressable onPress={() => onPress("instagram")}>
              <Icon name="instagram" />
            </Pressable>
            <Pressable onPress={() => onPress("curtir")}>
              <Icon name="thumbs-up" />
            </Pressable>
          </ContainerSocialButtons>
        </ContainerInfo>
      </Container>
      <Divisor />
    </>
  );
}
