import { useApp } from "@/contexts/AppContextProvider";
import Send from "./Send";
import RencentTx from "./RencentTx";

const Content = () => {
  const { formVisible } = useApp();

  if (formVisible) {
    return <Send></Send>;
  }
  return <RencentTx></RencentTx>;
};

export default Content;
