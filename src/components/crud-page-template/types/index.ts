import { MenuProps } from "../../menu/types";

export type CrudPageTemplateProps = {
  init: (fn?: () => void) => void;
  closeModal: () => void;
  handleSave: () => void;
  modalBody: any;
  data: any;
  itemList: any;
  listMenu: MenuProps;
};
