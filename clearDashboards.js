function clearDashboards() {
  const cashierNumbers = getCashierNumbers()
  cashierNumbers.forEach(cashierNumber => new lonecashier(null,cashierNumber).clearDashboard())
}
