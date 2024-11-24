import { DrawerToggleButton } from "@react-navigation/drawer";

import { Container, Title, ContainerButtonMenu } from "./styles";
import { HeaderProps } from "./types";

export default function Header({ title = "BAND TOOLS" }: HeaderProps) {
  return (
    <Container>
      <Title>{title.toUpperCase()}</Title>

      <ContainerButtonMenu>
        <DrawerToggleButton tintColor="#FFF" />
      </ContainerButtonMenu>
    </Container>
  );
}
