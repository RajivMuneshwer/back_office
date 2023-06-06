function cleanLoneSpreadsheets() {
  const cashierNums = getCashierNumbers()
  cashierNums.forEach(cashierNum => {
    new lonecashier(null, cashierNum).cleanSpreadsheet()
  })
}

function cleanLoneSpreadsheet(cashierNum){
  const loneCashier = new lonecashier(null, cashierNum)
  //Logger.log(loneCashier.spreadSheet.getSheets().length)
  loneCashier.cleanSpreadsheet()
}

const testClean = () => cleanLoneSpreadsheet(12)