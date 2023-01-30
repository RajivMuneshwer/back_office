class coinssheet{

  constructor(){

   this.spreadSheet = getNewBackOfficeSpreadSheet()

   this.sheet = this.spreadSheet.getSheetByName('Coins')

   this.cashierCoinsName = 'CashierCoins'

   this.beginningName = 'BeginningCoins'

   this.openedName = 'OpenedCoins'

   this.soldCoinsName = 'SoldCoins'

   this.endingName = 'EndingCoins'

   this.receivedName = 'ReceivedCoins'

  }

  get cashierCoinsRange(){
    return this.spreadSheet.getRangeByName(this.cashierCoinsName)
  }

  get beginningRange(){
    return this.spreadSheet.getRangeByName(this.beginningName)
  }

  get openedRange(){
    return this.spreadSheet.getRangeByName(this.openedName)
  }

  get soldCoinsRange(){
    return this.spreadSheet.getRangeByName(this.soldCoinsName)
  }

  get endingRange(){
    return this.spreadSheet.getRangeByName(this.endingName)
  }

  get receivedRange(){
    return this.spreadSheet.getRangeByName(this.receivedName)
  }
  

  insertCashierCoins(cashierSheet){

    const cashierCoinsFormula = `=${cashierSheet.name}!${cashierSheet.coinsSumSpace}`

    const isFormula = true

    insertInRange(this.cashierCoinsRange, [`=${cashierSheet.number}`, cashierCoinsFormula], isFormula)

  }


  appendToSoldCoins(cashierSheet){

    const soldFormula = this.getSoldFormulas(cashierSheet)

    const isFormula = true

    appendToRange(this.soldCoinsRange, soldFormula, isFormula)

  }

  getSoldFormulas(cashierSheet){

    return Object.values(cashierSheet.coinsSpaces)
    .map(space => `+${cashierSheet.name}!${space}`)
    
  }

  copyEndingToBeginning(){

    copyRange(this.endingRange, this.beginningRange)

  }

  removeCashier(cashierSheet){

    this.uninsertCashierCoins(cashierSheet)

    this.unappendToSoldCoins(cashierSheet)

    this.sort()

  }


  uninsertCashierCoins(cashierSheet){

    const cashierCoinsFormula = `=${cashierSheet.name}!${cashierSheet.coinsSumSpace}`

    const isFormula = true

    uninsertInRange(this.cashierCoinsRange, [`=${cashierSheet.number}`, cashierCoinsFormula], isFormula)

  }


  unappendToSoldCoins(cashierSheet){

    const soldFormula = this.getSoldFormulas(cashierSheet)

    const isFormula = true

    unappendToRange(this.soldCoinsRange, soldFormula, isFormula)

    this.altUnappendToSoldCoins(cashierSheet)

  }

  altUnappendToSoldCoins(cashierSheet) {

    const altSoldFormula = this.getAltSoldFormulas(cashierSheet)

    const isFormula = true

    unappendToRange(this.soldCoinsRange, altSoldFormula, isFormula)

  }

  getAltSoldFormulas(cashierSheet) {

    return Object.values(cashierSheet.coinsSpaces)
    .map(space => `=${cashierSheet.name}!${space}`)  


  }

  clearContents(){

    this.soldCoinsRange.clearContent()
    
    this.cashierCoinsRange.clearContent()

    this.receivedRange.clearContent()

    this.openedRange.clearContent()

  }

  sort() {

    sortDataRange(this.cashierCoinsRange)

  }

}

