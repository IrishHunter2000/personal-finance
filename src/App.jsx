import React, { useState, useEffect, useMemo } from 'react';

// Main App component
const App = () => {
	const [income, setIncome] = useState(5000);
	const [downPayment, setDownPayment] = useState(30000);
	const [interestRate, setInterestRate] = useState(6.27);
	const [frontEndRatio, setFrontEndRatio] = useState(28);
	const [loanTerm, setLoanTerm] = useState(30);

	// Memoize the calculation for performance
	const affordability = useMemo(() => {
		const annualInterestRate = interestRate / 100;
		const monthlyInterestRate = annualInterestRate / 12;
		const totalPayments = loanTerm * 12;

		// Use a fixed DTI ratio as a guideline
		const maxMonthlyPayment = income * (frontEndRatio / 100);

		let maxLoanAmount = 0;
		if (monthlyInterestRate > 0 && totalPayments > 0) {
			maxLoanAmount = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -totalPayments)) / monthlyInterestRate);
		} else {
			// Handle the case of 0 interest rate
			maxLoanAmount = maxMonthlyPayment * totalPayments;
		}

		const affordableHousePrice = maxLoanAmount + downPayment;

		return {
			maxMonthlyPayment,
			maxLoanAmount,
			affordableHousePrice,
		};
	}, [income, downPayment, interestRate, frontEndRatio, loanTerm]);

	// Format currency values
	const formatCurrency = (value) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
		}).format(value);
	};

	return (
		<div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white font-sans w-screen">
			<div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-[50vw] transform transition-all duration-300">
				<h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-teal-300">
					Mortgage Affordability Calculator
				</h1>
				<p className="text-sm text-center mb-8 text-gray-400">
					Enter your financial details below to estimate the most expensive house you can afford.
				</p>

				<div className="space-y-6">
					<div className="flex flex-col sm:flex-row items-center justify-between">
						<label htmlFor="income" className="text-lg font-medium mb-2 sm:mb-0">
							Monthly Income
						</label>
						<div className="relative w-full sm:w-2/3">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
							<input
								id="income"
								type="number"
								value={income}
								onChange={(e) => setIncome(Number(e.target.value))}
								className="w-full pl-7 pr-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="0"
							/>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between">
						<label htmlFor="downPayment" className="text-lg font-medium mb-2 sm:mb-0">
							Available Down Payment
						</label>
						<div className="relative w-full sm:w-2/3">
							<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
							<input
								id="downPayment"
								type="number"
								value={downPayment}
								onChange={(e) => setDownPayment(Number(e.target.value))}
								className="w-full pl-7 pr-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="0"
							/>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between">
						<label htmlFor="interestRate" className="text-lg font-medium mb-2 sm:mb-0">
							Interest Rate (%)
						</label>
						<div className="relative w-full sm:w-2/3">
							<input
								id="interestRate"
								type="number"
								step="0.01"
								value={interestRate}
								onChange={(e) => setInterestRate(Number(e.target.value))}
								className="w-full pl-4 pr-7 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="0.0"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between">
						<label htmlFor="frontEndRatio" className="text-lg font-medium mb-2 sm:mb-0">
							Front-End Ratio (%)
						</label>
						<div className="relative w-full sm:w-2/3">
							<input
								id="frontEndRatio"
								type="number"
								step="0.01"
								value={frontEndRatio}
								onChange={(e) => setFrontEndRatio(Number(e.target.value))}
								className="w-full pl-4 pr-7 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="0.0"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row items-center justify-between">
						<label htmlFor="loanTerm" className="text-lg font-medium mb-2 sm:mb-0">
							Loan Term (Years)
						</label>
						<div className="relative w-full sm:w-2/3">
							<input
								id="loanTerm"
								type="number"
								value={loanTerm}
								onChange={(e) => setLoanTerm(Number(e.target.value))}
								className="w-full pl-4 pr-7 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
								placeholder="30"
							/>
							<span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">yr</span>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-6 border-t border-slate-700 space-y-4">
					<div className="flex justify-between items-center text-xl font-semibold">
						<span>Max Monthly Payment:</span>
						<span className="text-teal-400">{formatCurrency(affordability.maxMonthlyPayment)}</span>
					</div>
					<div className="flex justify-between items-center text-xl font-semibold">
						<span>Maximum Loan Amount:</span>
						<span className="text-teal-400">{formatCurrency(affordability.maxLoanAmount)}</span>
					</div>
					<div className="flex justify-between items-center text-2xl font-bold mt-6">
						<span>Affordable House Price:</span>
						<span className="text-teal-300">{formatCurrency(affordability.affordableHousePrice)}</span>
					</div>
				</div>

			</div>
			<div className="fixed bottom-4 right-4 text-xs text-gray-500">
				Based on a 28% DTI ratio and current average 30-year fixed rate.
			</div>
		</div>
	);
};

export default App;
