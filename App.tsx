import { useKeepAwake } from "expo-keep-awake";
import "./src/infra/database/firebase";
import Setlist from "./src/pages/Setlist";

export default function App() {
  useKeepAwake();
  return <Setlist />;
}
