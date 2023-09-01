import React, { useState } from "react";

interface RepaymentItem {
  month: number;
  interestRate: string;
  monthlyPayment: string;
  principalPayment: string;
  interestPayment: string;
  remainingBalance: string;
}

const CarRepaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [initialRate, setInitialRate] = useState<number | null>(null);
  const [rateIncrease, setRateIncrease] = useState<number | null>(null);
  const [loanTerm, setLoanTerm] = useState<number | null>(null);
  const [repaymentSchedule, setRepaymentSchedule] = useState<RepaymentItem[]>(
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loanAmount && initialRate && rateIncrease && loanTerm) {
      let remainingBalance = loanAmount;
      let interestRate = initialRate;
      const newRepaymentSchedule: RepaymentItem[] = [];

      for (let month = 1; month <= loanTerm * 12; month++) {
        if (month % 12 === 0) {
          interestRate += rateIncrease;
        }

        const monthlyRate = interestRate / 1200;
        const monthlyPayment =
          (loanAmount * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -loanTerm * 12));
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;

        remainingBalance -= principalPayment;

        newRepaymentSchedule.push({
          month,
          interestRate: interestRate.toFixed(2) + "%",
          monthlyPayment: monthlyPayment.toFixed(2),
          principalPayment: principalPayment.toFixed(2),
          interestPayment: interestPayment.toFixed(2),
          remainingBalance: remainingBalance.toFixed(2),
        });
      }

      setRepaymentSchedule(newRepaymentSchedule);
    }
  };

  return (
    <>
      <div className="alert alert-success" role="alert">
        <h3 className="text-center">Interest Car Loan Calculator</h3>
      </div>
      <form onSubmit={handleSubmit} className="container">
        <div className="card p-5">
          <div className="form-group">
            <label htmlFor="loanAmount">Loan Amount:</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              className="form-control"
              onChange={(e) =>
                setLoanAmount(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          {/* More input fields with similar structure */}
          <div className="form-group">
            <label htmlFor="initialRate">Initial Interest Rate (%):</label>
            <input
              type="number"
              id="initialRate"
              name="initialRate"
              className="form-control"
              onChange={(e) =>
                setInitialRate(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="rateIncrease">Annual Rate Increase (%):</label>
            <input
              type="number"
              id="rateIncrease"
              name="rateIncrease"
              className="form-control"
              onChange={(e) =>
                setRateIncrease(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="loanTerm">Loan Term (years):</label>
            <input
              type="number"
              id="loanTerm"
              name="loanTerm"
              className="form-control"
              onChange={(e) =>
                setLoanTerm(e.target.value ? Number(e.target.value) : null)
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Calculate
          </button>
        </div>
      </form>

      {repaymentSchedule.length > 0 && (
        <>
          <h2 className="text-center mt-5">Repayment Schedule</h2>
          <div className="container mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Interest Rate</th>
                  <th>Payment</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {repaymentSchedule.map((item, index) => (
                  <tr key={index}>
                    <td>{item.month}</td>
                    <td>{item.interestRate}</td>
                    <td>{item.monthlyPayment}</td>
                    <td>{item.principalPayment}</td>
                    <td>{item.interestPayment}</td>
                    <td>{item.remainingBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default CarRepaymentCalculator;
