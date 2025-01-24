import { MenuProps } from "../../menu/types";

export type listItemProps = {
  id: string;
  title: string;
  menu?: MenuProps;
  showModal?: () => void;
};
