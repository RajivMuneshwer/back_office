class currencysheet {

  constructor(){

    this.spreadSheet = getNewBackOfficeSpreadSheet();

    this.sheet = this.spreadSheet.getSheetByName('Currency');

    this.cashierCurrencyName = 'CashierCurrency';

    this.breakdownName = 'Breakdowns';

    this.submittedBreakdownName = 'SubmittedBreakdown';

    this.submittedCurrencyName = 'SubmittedCurrency';

  }

  get cashierCurrencyRange(){
    return this.spreadSheet.getRangeByName(this.cashierCurrencyName)
  }

  get submittedCurrencyRange(){
    return this.spreadSheet.getRangeByName(this.submittedCurrencyName)
  }

  get breakdownRange(){
    return this.spreadSheet.getRangeByName(this.breakdownName)
  }

  get submittedBreakdownRange(){
    return this.spreadSheet.getRangeByName(this.submittedBreakdownName)
  }

  insertInCurrency(cashierSheet) {

    const cashierCurrencySumFormula = `=${cashierSheet.name}!${cashierSheet.currencySumSpace}`;

    const isFormula = true

    insertInRange(this.cashierCurrencyRange, [`=${cashierSheet.number}`, cashierCurrencySumFormula], isFormula)

  }

  appendToBreakdown(cashierSheet) {

    const breakdownFormula = this.getBreakdownFormulas(cashierSheet)

    const isFormula = true

    appendToRange(this.breakdownRange, breakdownFormula, isFormula)

  }

  getBreakdownFormulas(cashierSheet){

    return Object.values(cashierSheet.breakDownSpaces)
    .map(space =>`+${cashierSheet.name}!${space}`)

  }

  copyCurrencyToSubmit(){

    copyRange(this.cashierCurrencyRange, this.submittedCurrencyRange)

    return this

  }

  copyBreakdownsToSubmit(){

    copyRange(this.breakdownRange, this.submittedBreakdownRange)

    return this

  }

  removeCashier(cashierSheet){

    this.uninsertCashierCurrency(cashierSheet)

    this.unappendToBreakdown(cashierSheet)

    this.sort()

    return this

  }

  uninsertCashierCurrency(cashierSheet){

    const uninsertArray = [`=${cashierSheet.number}`, `=${cashierSheet.name}!${cashierSheet.currencySumSpace}`]  

    const isFormula = true  

    uninsertInRange(this.cashierCurrencyRange, uninsertArray, isFormula)

  }

  unappendToBreakdown(cashierSheet){

    const breakdownFormula = this.getBreakdownFormulas(cashierSheet)

    const isFormula = true

    unappendToRange(this.breakdownRange, breakdownFormula, isFormula)

    this.altUnappendToBreakdown(cashierSheet) //if formula is first then will start with '=' and not a '+'

  }

  altUnappendToBreakdown(cashierSheet){

    const altBreakdownFormula = this.getAltBreakdownFormulas(cashierSheet)

    const isFormula = true

    unappendToRange(this.breakdownRange, altBreakdownFormula, isFormula)

  }


  getAltBreakdownFormulas(cashierSheet) {

    return Object.values(cashierSheet.breakDownSpaces)
    .map(space =>`=${cashierSheet.name}!${space}`)

  }

  clearContents() {

    this.breakdownRange.clearContent()

    this.cashierCurrencyRange.clearContent()

    this.submittedCurrencyRange.clearContent()

    this.submittedBreakdownRange.clearContent()

  }

  sort() {

    sortDataRange(this.cashierCurrencyRange)

  }

}

function testCurrency(){

  const cashierSheet = new spreadsheet().getCashier(5)

  const currencySheet = new currencysheet()

  currencySheet.unappendToBreakdown(cashierSheet)

} 


