class notessheet {

  constructor() {

    this.spreadSheet = getNewBackOfficeSpreadSheet()

    this.sheet = this.spreadSheet.getSheetByName('Notes')
    
    this.cashierNotesName = 'CashierNotes';

    this.beginningName = 'BeginningNotes'

    this.receivedName = 'ReceivedNotes'

    this.soldNotesName = 'SoldNotes'

    this.endingName = 'EndingNotes'


  }

  get cashierNotesRange(){
    return this.spreadSheet.getRangeByName(this.cashierNotesName)
  }

  get beginningRange(){
    return this.spreadSheet.getRangeByName(this.beginningName)
  }

  get soldNotesRange(){
    return this.spreadSheet.getRangeByName(this.soldNotesName)
  }

  get receivedRange(){
    return this.spreadSheet.getRangeByName(this.receivedName)
  }

  get endingRange(){
    return this.spreadSheet.getRangeByName(this.endingName)
  }


  insertInCashierNotes(cashierSheet){

    const cashierNotesForumla = `=${cashierSheet.name}!${cashierSheet.notesSumSpace}`;

    const isFormula = true

    insertInRange(this.cashierNotesRange, [`=${cashierSheet.number}`, cashierNotesForumla], isFormula)

  }


  appendToSoldNotes(cashierSheet){

    const soldFormula = this.getSoldFormulas(cashierSheet)

    const isFormula = true

    appendToRange(this.soldNotesRange, soldFormula, isFormula)


  }


  getSoldFormulas(cashierSheet){

    return Object.values(cashierSheet.notesSpaces)
    .map(space => `+${cashierSheet.name}!${space}`)

  }


  copyEndingtoBeginning() {

    copyRange(this.endingRange, this.beginningRange)

  }


  removeCashier(cashierSheet){

    this.uninsertInCashierNotes(cashierSheet)

    this.unappendToSoldNotes(cashierSheet)

    this.sort()

  }


  uninsertInCashierNotes(cashierSheet){

    const cashierNotesForumla = `=${cashierSheet.name}!${cashierSheet.notesSumSpace}`;

    const isFormula = true

    uninsertInRange(this.cashierNotesRange, [`=${cashierSheet.number}`, cashierNotesForumla], isFormula)

  }


  unappendToSoldNotes(cashierSheet){

    const soldFormula = this.getSoldFormulas(cashierSheet)

    const isFormula = true

    unappendToRange(this.soldNotesRange, soldFormula, isFormula)

    this.altUnappendToSoldNotes(cashierSheet) //if formula is first then will start with '=' and not a '+'

  }

  altUnappendToSoldNotes(cashierSheet) {

    const altSoldFormula = this.getAltSoldFormulas(cashierSheet)

    const isFormula = true 

    unappendToRange(this.soldNotesRange, altSoldFormula, isFormula)

  }


  getAltSoldFormulas(cashierSheet) {

    return Object.values(cashierSheet.notesSpaces)
    .map(space => `=${cashierSheet.name}!${space}`)

  }


  clearContents() {
    
    this.soldNotesRange.clearContent()

    this.cashierNotesRange.clearContent()

    this.receivedRange.clearContent()

  }

  sort() {

    sortDataRange(this.cashierNotesRange)

  }

}



function testNotes(){

  const cashierSheet = new spreadsheet().getCashier(1)

  const notesSheet = new notessheet()

  notesSheet.appendToSoldNotes(cashierSheet)

}