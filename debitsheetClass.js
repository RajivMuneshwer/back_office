class debitsheet{

  constructor(){
    this.spreadSheet = getNewBackOfficeSpreadSheet()
    this.sheet = this.spreadSheet.getSheetByName("Debit")
    this.cashierDebitRBName = "CashierDebitRB"
    this.cashierDebitGBTIName = "CashierDebitGBTI"
  }

  get cashierDebitRBRange(){
    return this.spreadSheet.getRangeByName(this.cashierDebitRBName)
  }

  get cashierDebitGBTIRange(){
    return this.spreadSheet.getRangeByName(this.cashierDebitGBTIName)
  }

  insertCashierDebit(cashierSheet){
    this.insertCashierDebitRB(cashierSheet)
    this.insertCashierDebitGBTI(cashierSheet)
  }

  insertCashierDebitRB(cashierSheet){
    const cashierDebitRBFormula = `=${cashierSheet.name}!${cashierSheet.debitSumRBSpace}`
    const isFormula = true
    insertInRange(this.cashierDebitRBRange, [`=${cashierSheet.number}`, cashierDebitRBFormula], isFormula)
  }

  insertCashierDebitGBTI(cashierSheet){
    const cashierDebitGBTIFormula = `${cashierSheet.name}!${cashierSheet.debitSumGBTISpace}`
    const isFormula = true
    insertInRange(this.cashierDebitGBTIName, [`=${cashierSheet.number}`, cashierDebitGBTIFormula], isFormula)
  }

  removeCashier(cashierSheet){
    this.uninsertCashierDebit(cashierSheet)
    this.sort()
  }

  uninsertCashierDebit(cashierSheet){
    this.uninsertCashierDebitRB(cashierSheet)
    this.uninsertCashierDebitGBTI(cashierSheet)
  }

  uninsertCashierDebitRB(cashierSheet){
    const cashierDebitRBFormula = `=${cashierSheet.name}!${cashierSheet.debitSumRBSpace}`
    const isFormula = true
    uninsertInRange(this.cashierDebitRBRange, [`=${cashierSheet.number}`, cashierDebitRBFormula], isFormula)
  }

  uninsertCashierDebitGBTI(cashierSheet){
    const cashierDebitGBTIFormula = `${cashierSheet.name}!${cashierSheet.debitSumGBTISpace}`
    const isFormula = true
    uninsertInRange(this.cashierDebitGBTIName, [`=${cashierSheet.number}`, cashierDebitGBTIFormula], isFormula)
  }

  sort(){
    sortDataRange(this.cashierDebitRBRange)
    sortDataRange(this.cashierDebitGBTIRange)
  }

  clearContents(){
    this.cashierDebitRBRange.clearContent()
    this.cashierDebitGBTIRange.clearContent()
  }


}
