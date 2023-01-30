class collectivefloatsheet {

  constructor (){

    this.spreadSheet = getNewFloatSpreadSheet()

    this.rowStart = 1

    this.dateColumn = `B`

    this.floatColumn = `C`

  }



  getCashierDateAndFloatSpace(cashierNum) {

    const cashierPosition = cashierNum + this.rowStart

    return `${this.dateColumn}${cashierPosition}:${this.floatColumn}${cashierPosition}`

  }


  getDateAndFloatRange(cashierSheet) {

    const cashierDateAndFloatSpace = this.getCashierDateAndFloatSpace(cashierSheet.number)

    return this.spreadSheet.getRange(cashierDateAndFloatSpace)
    
  }


  setCashierFloat(cashierSheet) {

    const dateAndFloatRange = this.getDateAndFloatRange(cashierSheet)

    const cashierFloatSumArray = dataRangeToArray(cashierSheet.floatSumRange)

    setRange(dateAndFloatRange, [new Date(), ...cashierFloatSumArray])

  }

}


function testcollectiveFloatSheet() {

  const collectiveFloatSheet = new collectivefloatsheet()

  const cashierSheet = new cashiersheet(getNewBackOfficeSpreadSheet().getSheetByName('Cashier17'))

  collectiveFloatSheet.setCashierDateAndFloat(cashierSheet)
}
