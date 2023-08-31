import Image from "next/image";
import RepaymentCalculator from "../components/RepaymentCalculator";

export default function Page() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <RepaymentCalculator />
    </>
  );
}
