export type ActionProps = {
  title: string;
  action: (id: string, fn?: () => void) => void;
  color?: string;
  iconName?: "edit" | "trash";
  showModal?: boolean;
};

export type MenuProps = {
  id?: string;
  actions: ActionProps[];
  showModal?: () => void;
  isLastItem?: boolean;
};
