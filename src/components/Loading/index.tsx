import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Loader from "../../assets/svg/loader";

type Props = {
  color: string;
  load: Boolean;
  children: any;
};

const Loading = ({ color = "#ffffff", load, children }: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(load);
  }, [load]);
  return <>{loading ? <Loader color={color} /> : <div>{children}</div>}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default Loading;
