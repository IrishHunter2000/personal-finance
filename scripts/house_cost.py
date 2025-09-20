# monthly_income = float(input("Enter Monthly Income: "))
# interest_rate = float(input("Enter Current Interest Rate: ")) / 100
# down_payment = float(input("Enter Down Payment: "))

# --- 1. Define your inputs ---
monthly_income = 10000
down_payment = 50000
interest_rate = 0.0627
loan_term_years = 30
front_end_ratios = [
    { 'ratio': 0.25, 'percentage': 25 },
    { 'ratio': 0.28, 'percentage': 28 },
    { 'ratio': 0.31, 'percentage': 31 },
    { 'ratio': 0.34, 'percentage': 34 }
]

for rule in front_end_ratios:
    print("")
    print(f"For ratio of {rule['percentage']}%:")

    # --- 2. Calculate the maximum affordable monthly payment ---
    max_monthly_payment = monthly_income * rule['ratio']
    print(f"Monthly payment: ${max_monthly_payment:.2f}")

    monthly_interest_rate = interest_rate / 12
    total_payments = loan_term_years * 12

    try:
        # --- 3. Calculate the total loan amount (principal) based on the monthly payment ---
        principal_loan_amount = max_monthly_payment * ((1 - (1 + monthly_interest_rate)**(-total_payments)) / monthly_interest_rate)

        # --- 4. Calculate the total affordable house price ---
        affordable_house_price = principal_loan_amount + down_payment

        print(f"Qualifying loan: ${principal_loan_amount:,.2f}")
        print(f"House price: ${affordable_house_price:,.2f}")

    except ZeroDivisionError:
        print("Error: Monthly interest rate cannot be zero.")
        # This handles the unlikely case of a 0% interest rate

print("")
print("This currently does not include property tax, homeowner's insurance, or HOA fees...")
print("")

# This is the tricky part, it's the amortization formula rearranged to solve for Principal
# P = M * [ (1+r)^n - 1 ] / [ r * (1+r)^n ]
# Where:
# P = Principal loan amount
# M = Maximum monthly payment
# r = Monthly interest rate (annual_rate / 12)
# n = Total number of payments (loan_term_years * 12)