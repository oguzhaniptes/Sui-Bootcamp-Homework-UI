import { ChevronLeftIcon } from "@radix-ui/react-icons";

const BackButton = (props: { handleBack: () => void }) => {
  return <ChevronLeftIcon onClick={props.handleBack}></ChevronLeftIcon>;
};

export default BackButton;

