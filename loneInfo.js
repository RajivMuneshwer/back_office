function getLoneInfoUI() {

  const getLoneInfoHTML = getLoneInfoTemplate().setWidth(450).setHeight(650);

  new ui().ui.showModalDialog(getLoneInfoHTML, "Collect Cashier's Info");
  
}


function getLonesInfo(formBlob) {

  getCashierNumsFrom(formBlob).forEach(cashierNum => getLoneInfo(cashierNum))

}


function getLoneInfo(cashierNum) {

  const cashierSheet = new spreadsheet().getCashier(cashierNum)

  const loneCashier = new lonecashier(cashierSheet)
  cashierSheet.copyCashierName(loneCashier)
  cashierSheet.insertInChequeLone(loneCashier)
  cashierSheet.insertInCurrencyLone(loneCashier)
  cashierSheet.copyLoneToFloat(loneCashier)
  cashierSheet.copyLoneToDebit(loneCashier)

}

const getLoneInfoTemplate = () => HtmlService.createTemplateFromFile('loneInfoHTML').evaluate();
