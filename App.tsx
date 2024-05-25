import { useKeepAwake } from "expo-keep-awake";
import "./src/infra/database/firebase";
import Setlist from "./src/pages/Setlist";
import * as ScreenOrientation from "expo-screen-orientation";
import { useCallback, useEffect } from "react";

export default function App() {
  useKeepAwake();

  const init = useCallback(async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT
    );
  }, []);

  useEffect(() => {
    init();
  }, []);

  return <Setlist />;
}
