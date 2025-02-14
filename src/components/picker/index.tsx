import { PickerProps } from "./types";
import { Container, Title, PickerStyled, PickerItem } from "./styles";

export default function Picker({
  title,
  items,
  selectedValue,
  onValueChange = () => {},
  enabled = true,
}: PickerProps) {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <PickerStyled
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        enabled={enabled}
        dropdownIconColor={`${enabled ? "#999" : "#fff"}`}
      >
        {items.map((item) => (
          <PickerItem
            key={`${title}-${item.value}`}
            label={item.label}
            value={item.value}
          />
        ))}
      </PickerStyled>
    </Container>
  );
}
