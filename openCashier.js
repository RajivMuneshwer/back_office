function openCashierUI() {

  const openHTML = getOpenCashierTemplate().setWidth(450).setHeight(650);
  new ui().ui.showModalDialog(openHTML, 'Open Cashiers');
  
}


function openUsual(){

  const cashierNumsToOpen = [1, 2, 3, 4, 5, 12]
  cashierNumsToOpen.forEach(cashierNum => openCashier(cashierNum))
  
  sortCashiers()

}


function openCashiers(formBlob){

  getCashierNumsFrom(formBlob).forEach(cashierNum => openCashier(cashierNum))

  sortCashiers();

}


function getCashierNumsFrom(formBlob){

  const cashierNumsAsString = formBlob.cashiers;

  if(isFalsy(cashierNumsAsString) || cashierNumsAsString?.length === 0)
  throw new Error('Cashier Number is invalid')

  if(isNot(cashierNumsAsString instanceof Array)) return [parseInt(cashierNumsAsString)]

  return cashierNumsAsString.map(cashierNumAsString => parseInt(cashierNumAsString));

}


function openCashier(cashierNum){

  const newCashierSheet = makeCashierSheet(cashierNum);

  formatCashier(newCashierSheet)

  addInCurrencyFloatNotesAndCoins(newCashierSheet)

}


function makeCashierSheet(cashierNum) {

  const register = new registers()

  if (register.isRegisterOpen(cashierNum)) {throw new Error('Cashier is invalid')}

  register.openRegister(cashierNum)

  return new spreadsheet().createCashier(cashierNum)

}


function formatCashier(cashierSheet){

  cashierSheet.setName();

  cashierSheet.setFloatAndDate();

  getCashierPurchases(cashierSheet)

}


function getCashierPurchases(cashierSheet) {

  const loneCashier = new lonecashier(cashierSheet)

  cashierSheet.copyLoneToCoins(loneCashier)

  cashierSheet.copyLoneToNotes(loneCashier)

}


function addInCurrencyFloatNotesAndCoins(cashierSheet){

  addInCurrencySheet(cashierSheet);
  addInFloatSheet(cashierSheet);
  addInNotesSheet(cashierSheet);
  addInCoinsSheet(cashierSheet);
  //addInDebitSheet(cashierSheet);

}


function addInCurrencySheet(cashierSheet) {

  const currencySheet = new currencysheet()
  currencySheet.insertInCurrency(cashierSheet);
  currencySheet.appendToBreakdown(cashierSheet)

}


function addInFloatSheet(cashierSheet) {

  const floatSheet = new floatsheet()
  floatSheet.insertInCashierFloat(cashierSheet)

}


function addInNotesSheet(cashierSheet){

  const notesSheet = new notessheet()
  notesSheet.insertInCashierNotes(cashierSheet)
  notesSheet.appendToSoldNotes(cashierSheet)

}


function addInCoinsSheet(cashierSheet){

  const coinsSheet = new coinssheet()
  coinsSheet.insertCashierCoins(cashierSheet)
  coinsSheet.appendToSoldCoins(cashierSheet)

}

function addInDebitSheet(cashierSheet){
  const debitSheet = new debitsheet()
  debitSheet.insertCashierDebit(cashierSheet)
}

function sortCashiers(){

  new currencysheet().sort()

  new floatsheet().sort()

  new notessheet().sort()

  new coinssheet().sort()

}


function getRegsiter() {

  return new registers().register

}


include = (filename) => HtmlService.createHtmlOutputFromFile(filename).getContent();


getOpenCashierTemplate = () => HtmlService.createTemplateFromFile('openHTML').evaluate();


function testOpen() {
  Logger.log(new registers().isRegisterOpen(1))
}




