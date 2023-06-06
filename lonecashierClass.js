class lonecashier {


  constructor(cashierSheet = null, cashierNum = null){

    this.cashierSheet = cashierSheet
    this.number = cashierSheet?.number ?? cashierNum
    this.spreadSheet = getLoneCashierID(this.number)
    this.cashierNumberSpace = 'A3'
    this.cashierNameSpace = 'B2'
    this.notesSpace = 'B9:B13';
    this.coinsSpace = 'B7:B8'
    this.floatSpace = 'F7:F13';
    this.prevousFloatSpace = 'G16'
    this.prevousFloatDateSpace = 'E16'
    this.currencySpace = 'A21:B35';
    this.chequeSpace = 'E21:H35'
    this.debitRBSpace = 'K4:N19'
    this.debitGBTISpace = 'K23:N38'

    ////////////////////////////////////////////////
    //For changes in dashboard these are previous space arrangements

    this.oldNotesSpace = 'B9:B13'
    this.oldCoinsSpace = 'B7:B8'
    this.oldFloatSpace = 'F7:F13'
    this.oldPreviousFloatSpace = 'G16'
    this.oldPreviousFloatDateSpace = 'E16'

  }

  get dashboard() {
    return this.spreadSheet.getSheetByName('Dashboard')
  }
  get cashierNumberRange() {
    return this.dashboard.getRange(this.cashierNumberSpace)
  }
  get cashierNameRange() {
    return this.dashboard.getRange(this.cashierNameSpace)
  }
  get notesRange() {
    return this.dashboard.getRange(this.notesSpace)
  }
  get coinsRange() {
    return this.dashboard.getRange(this.coinsSpace)
  }
  get floatRange() {
    return this.dashboard.getRange(this.floatSpace)
  }
  get debitRBRange() {
    return this.dashboard.getRange(this.debitRBSpace)
  }
  get debitGBTIRange(){
    return this.dashboard.getRange(this.debitGBTISpace)
  }
  get prevousFloatRange() {
    return this.dashboard.getRange(this.prevousFloatSpace)
  }
  get prevousFloatDateRange() {
    return this.dashboard.getRange(this.prevousFloatDateSpace)
  }
  get currencyRange() {
    return this.dashboard.getRange(this.currencySpace)
  }
  get chequeRange() {
    return this.dashboard.getRange(this.chequeSpace)
  }
  get oldNotesRange() {
    return this.dashboard.getRange(this.oldNotesSpace)
  }
  get oldCoinsRange() {
    return this.dashboard.getRange(this.oldCoinsSpace)
  }
  get oldFloatRange() {
    return this.dashboard.getRange(this.oldFloatSpace)
  }
  get oldPreviousFloatRange() {
    return this.dashboard.getRange(this.oldPreviousFloatSpace)
  }
  get oldPreviousFloatDateRange() {
    return this.dashboard.getRange(this.oldPreviousFloatDateSpace)
  }

  copyCashierSheet() {

    this.cashierSheet.freezeSigners()
    const copiedSheet = this.cashierSheet.sheet.copyTo(this.spreadSheet)
    this.formatCopiedSheet(copiedSheet)
    this.copyFloatAndDate()

  }

  formatCopiedSheet(copiedSheet) {

    this.renameCashierSheet(copiedSheet)
    this.lockSheet(copiedSheet)
    this.copyOnlyValue(copiedSheet)
    this.moveSheet(copiedSheet)

  }

  renameCashierSheet(sheet) {
    const date = new Date()
    const dateFormated = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    sheet.setName(dateFormated)
  }

  lockSheet(sheet) {
    const protectSheet = sheet.protect()
    protectSheet.addEditor(Session.getEffectiveUser())
    protectSheet.removeEditors(protectSheet.getEditors())
  }

  moveSheet(sheet) {
    sheet.activate()
    this.spreadSheet.moveActiveSheet(2)
  }

  copyOnlyValue(sheet) {
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).activate()
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns())
    .copyTo(this.spreadSheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_VALUES, false)
  }

  copyFloatAndDate() {
    copyRange(this.cashierSheet.floatSumRange, this.prevousFloatRange)
    copyRange(this.cashierSheet.todayRange, this.prevousFloatDateRange)
  }

  
  replaceDashboard(newDashboard) {
    const preservedDashboardValues = this.getPreservedDashboardValues()

    this.spreadSheet.deleteSheet(this.dashboard)
    this.formatNewDashboard(newDashboard)
    this.setPreservedValuesInNewDashboard(preservedDashboardValues)
  }

  getPreservedDashboardValues() {
    return dataRangesToArrays([
      this.oldNotesRange, 
      this.oldCoinsRange, 
      this.oldFloatRange, 
      this.oldPreviousFloatRange, 
      this.oldPreviousFloatDateRange
    ])
  }

  formatNewDashboard(newDashboard) {
    newDashboard.copyTo(this.spreadSheet).setName('Dashboard').activate()
    this.spreadSheet.moveActiveSheet(1)
  }

  setPreservedValuesInNewDashboard([notes, coins, float, previousFloat, previousFloatDate]) {
    setRange(this.notesRange, notes)
    setRange(this.coinsRange, coins)
    setRange(this.floatRange, float)
    setRange(this.prevousFloatRange, previousFloat)
    setRange(this.prevousFloatDateRange, previousFloatDate)
    setRange(this.cashierNumberRange, [`Cashier #${this.number}`])
  }

  clearDashboard() {
    this.floatRange.setValue(null)
    this.currencyRange.setValue(null)
    this.cashierNameRange.setValue(null)
    this.chequeRange.setValue(null)
    this.debitRBRange.setValue(null)
    this.debitGBTIRange.setValue(null)
  }

  cleanSpreadsheet() {
    const sheets = this.spreadSheet.getSheets()
    if (sheets.length > 50){
      for (let i = 100; i < sheets.length ; i++){
        try{
          this.spreadSheet.deleteSheet(sheets[i])
        } catch (error){
          Logger.log(error)
        }
      }
      return
    }
  }
}

function testLone() {
  new lonecashier(null, 1).clearDashboard()
}


