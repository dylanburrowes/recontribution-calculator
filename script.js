function calculate() {
  const balance = parseFloat(document.getElementById('balance').value);
  const taxFree = parseFloat(document.getElementById('taxFree').value);
  const withdrawal = parseFloat(document.getElementById('withdrawal').value);
  const age = parseInt(document.getElementById('age').value);
  const outputDiv = document.getElementById('output');

  if (isNaN(balance) || isNaN(taxFree) || isNaN(withdrawal) || isNaN(age)) {
    outputDiv.innerHTML = "❌ Please fill in all fields with valid numbers.";
    return;
  }

  if (age >= 76) {
    outputDiv.innerHTML = "❌ You are no longer eligible to make a non-concessional contribution.";
    return;
  }

  if (age === 75) {
    outputDiv.innerHTML = "⚠️ You are only eligible to make a non-concessional contribution in the 28 days after the end of the month in which you turn 75 years old.";
    return;
  }

  if (withdrawal > 360000) {
    outputDiv.innerHTML = "❌ The maximum amount to contribute under the bring forward rule is $360,000.";
    return;
  }

  if (withdrawal > balance) {
    outputDiv.innerHTML = "❌ Withdrawal amount cannot exceed the total super balance.";
    return;
  }

  if (balance <= 0) {
    outputDiv.innerHTML = "❌ Super balance must be greater than zero.";
    return;
  }

  const taxable = balance - taxFree;
  const taxFreeRatio = taxFree / balance;
  const taxableRatio = taxable / balance;

  const taxFreeWithdrawn = withdrawal * taxFreeRatio;
  const taxableWithdrawn = withdrawal * taxableRatio;

  const newTaxFree = taxFree - taxFreeWithdrawn + withdrawal;
  const taxableReduction = taxableWithdrawn;
  const taxSavings = 0.17 * taxableReduction;

  outputDiv.innerHTML = `
    ✅ <strong>Calculation Successful</strong><br/><br/>
    <strong>New Tax-Free Component:</strong> $${newTaxFree.toFixed(2)}<br/>
    <strong>Reduction in Taxable Component:</strong> $${taxableReduction.toFixed(2)}<br/>
    <strong>Estimated Future Tax Savings (at 17%):</strong> $${taxSavings.toFixed(2)}
  `;
}
