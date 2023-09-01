import Image from "next/image";
import HouseRepaymentCalculator from "../components/HouseRepaymentCalculator";
import CarRepaymentCalculator from "../components/CarRepaymentCalculator";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [page, setPage] = useState<string>("house");
  // console.log(page);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
      />
      <div className="bg-warning text-center">
        <div className="container p-3  btn-group">
          <a
            className={`btn btn-primary ${page === "house" ? "active" : ""}`}
            onClick={(e) => setPage("house")}
          >
            House Loan
          </a>
          <a
            className={`btn btn-primary ${page === "car" ? "active" : ""}`}
            onClick={(e) => setPage("car")}
          >
            Car Loan
          </a>
        </div>
      </div>
      {page === "house" && <HouseRepaymentCalculator />}
      {page === "car" && <CarRepaymentCalculator />}
    </>
  );
}
