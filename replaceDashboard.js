function copyDashboardToCashierSheets() {

  const dashboardSheet = getDashboardSheet()

  const cashierNumbers = getCashierNumbers()
  cashierNumbers.forEach(cashierNumber => replaceDashboardForCashier(cashierNumber, dashboardSheet))


}

function replaceDashboardForCashier(cashierNumber, dashboardSheet) {
  const loneCashier = new lonecashier(null, cashierNumber)
  loneCashier.replaceDashboard(dashboardSheet)

}

const getDashboardSheet = () => SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dashboard')

const getCashierNumbers = () => [1, 2, 3, 4, 5, 6 ,7 , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

const getTest = () => [17]