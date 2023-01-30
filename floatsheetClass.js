class floatsheet {

  constructor() {

    this.spreadSheet = getNewBackOfficeSpreadSheet()

    this.sheet = this.spreadSheet.getSheetByName('Float')

    this.cashierFloatName = 'CashierFloat'

  }

  get cashierFloatRange(){
    return this.spreadSheet.getRangeByName(this.cashierFloatName)
  }
  

  insertInCashierFloat(cashierSheet){

    const cashierFloatFormula = `=${cashierSheet.name}!${cashierSheet.floatSpace}`;

    const isFormula = true;

    insertInRange(this.cashierFloatRange, [`=${cashierSheet.number}`, cashierFloatFormula], isFormula)

  }


  removeCashier(cashierSheet){

    this.uninsertInCashierFloat(cashierSheet)

    this.sort()

  }


  uninsertInCashierFloat(cashierSheet){

    const cashierFloatFormula = `=${cashierSheet.name}!${cashierSheet.floatSpace}`

    const isFormula = true

    uninsertInRange(this.cashierFloatRange, [`=${cashierSheet.number}`, cashierFloatFormula], isFormula)

  }


  clearContents(){

    this.cashierFloatRange.clearContent()

  }


  sort() {

    sortDataRange(this.cashierFloatRange)

  }


}


function testFloatSheet() {

  const floatSheet = new floatsheet();

  const cashierSheet = new spreadsheet().getCashier(2)

  floatSheet.removeCashier(cashierSheet)


}




