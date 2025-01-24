import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

type MenuContextProps = {
  menuIdOpened: string;
  handleMenuIdOpened: (id: string) => void;
};

type MenuProviderProps = {
  children: ReactNode;
};

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps
);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [idOpened, setIdOpened] = useState("");

  const handleMenuIdOpened = useCallback((id: string) => {
    setIdOpened(id);
  }, []);
  return (
    <MenuContext.Provider
      value={{ menuIdOpened: idOpened, handleMenuIdOpened }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export function useMenu(): MenuContextProps {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be userd within an Menu Provider");
  }
  return context;
}
