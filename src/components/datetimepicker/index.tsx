import { DateTimePickerProps } from "./types";
import DateTimePickerCommunity, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useCallback, useState } from "react";
import {
  Container,
  InputText,
  InputContainer,
  Icon,
  LabelContainer,
  LabelText,
} from "./styles";

export default function DateTimePicker({
  value,
  label = "Selecione a data",
  placeholder,
  testID = "dateTimePicker",
  mode = "datetime",
  style = { zIndex: 1000 },
  onChange,
}: DateTimePickerProps) {
  const [show, setShow] = useState(false);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, value: Date | undefined) => {
      if (value) onChange(event, value);
      setShow(false);
    },
    []
  );

  const handleToggle = useCallback(() => {
    setShow(true);
  }, []);

  return (
    <Container>
      <LabelContainer>
        <LabelText>{label}</LabelText>
      </LabelContainer>
      <InputContainer onPress={handleToggle}>
        <Icon name={"calendar"} />
        <InputText>{placeholder}</InputText>
      </InputContainer>
      {show && (
        <DateTimePickerCommunity
          testID={testID}
          value={value}
          mode={mode}
          onChange={handleChange}
          style={style}
          display={"default"}
          minimumDate={new Date()}
        />
      )}
    </Container>
  );
}
