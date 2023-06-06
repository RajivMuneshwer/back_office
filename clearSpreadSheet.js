function clearSpreadSheet() {

  copyNotesAndCoinsToBeginning()

  clearSpreadsheet()

  processCashiers()

  renewRegister()

}


function copyNotesAndCoinsToBeginning() {

  new notessheet().copyEndingtoBeginning()

  new coinssheet().copyEndingToBeginning()

}


function clearSpreadsheet() {
  
  new currencysheet().clearContents()
  new coinssheet().clearContents()
  new notessheet().clearContents()
  new floatsheet().clearContents()
  new debitsheet().clearContents()

}


function processCashiers() {

  const spreadSheet = new spreadsheet()

  const openedCashierSheets = spreadSheet.openedCashiers

  setFloatsInCollectiveFrom(openedCashierSheets)

  copyToLoneSpreadSheets(openedCashierSheets)

  deleteCashierSheets(openedCashierSheets, spreadSheet)

}


function setFloatsInCollectiveFrom(openedCashierSheets) {

  const collectiveFloat = new collectivefloatsheet()

  openedCashierSheets.forEach(cashierSheet => collectiveFloat.setCashierFloat(cashierSheet))

}


function copyToLoneSpreadSheets(openedCashierSheets) {

  openedCashierSheets.forEach(cashierSheet => new lonecashier(cashierSheet).copyCashierSheet())

}


function deleteCashierSheets(cashierSheets, spreadSheet) {

  cashierSheets.forEach(cashierSheet => spreadSheet.deleteCashierSheet(cashierSheet))

}


const renewRegister = () =>  new registers().makeNewRegister()


function testClear() {

  const cashierSheet = new cashiersheet(getNewBackOfficeSpreadSheet().getSheetByName('Cashier17'))

  copyDateAndFloat(cashierSheet)

}

function testCashier2() {
  const sp2 = new cashiersheet(new spreadsheet().spreadSheet.getSheetByName('Cashier2'))
  copyToLoneSpreadSheets([sp2])
}


