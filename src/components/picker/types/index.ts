type ItemProps = {
  label: string;
  value: any;
};

export type PickerProps = {
  title?: string;
  items: ItemProps[];
  selectedValue: string;
  onValueChange?: (value: any) => void;
  enabled?: boolean;
};
