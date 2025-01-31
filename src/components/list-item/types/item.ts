import { MenuProps } from "../../menu/types";

export type listItemProps = {
  id: string;
  title: string;
  onPress?: () => void;
  menu?: MenuProps;
  showModal?: () => void;
  isLastItem?: boolean;
};
