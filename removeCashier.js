function removeCashierUI() {

  const removeCashierHTML = getRemoveCashierTemplate().setWidth(450).setHeight(650);

  new ui().ui.showModalDialog(removeCashierHTML, 'Remove Cashiers');
  
}


function removeCashiers(formBlob) {

  getCashierNumsFrom(formBlob).forEach(cashierNum => removeCashier(cashierNum))

}


function removeCashier(cashierNum){

  const [spreadSheet, register] = [new spreadsheet(), new registers()]

  const cashierSheet = spreadSheet.getCashier(cashierNum)

  if(isMoneySubmittedFrom(cashierSheet)) {

    removeFromSheets(cashierSheet)

    register.closeRegister(cashierNum)

    spreadSheet.deleteCashierSheet(cashierSheet)

  }

}


function isMoneySubmittedFrom(cashierSheet) {

  const submittedBoolean = cashierSheet.totalRange.getValue() ? alertCannotClose(cashierSheet) : alertToSendFloatBackFor(cashierSheet)

  return submittedBoolean
}


function alertCannotClose(cashierSheet) {

  new ui().ui.alert(`Cannot Close Cashier${cashierSheet.number} Because Currency Submitted`)

  return false

}


function alertToSendFloatBackFor(cashierSheet) {

  new ui().ui.alert(`Return Cashier${cashierSheet.number} Float`)

  return true
  
}


function removeFromSheets(cashierSheet){

  new currencysheet().removeCashier(cashierSheet)
  new coinssheet().removeCashier(cashierSheet)
  new floatsheet().removeCashier(cashierSheet)
  new notessheet().removeCashier(cashierSheet)
  new debitsheet().removeCashier(cashierSheet)

}



const getRemoveCashierTemplate = () => HtmlService.createTemplateFromFile('removeHTML').evaluate();

