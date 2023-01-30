class weekscoinsspreadsheet {

  constructor() {

    this.spreadSheet = getNewCoinsSpreadSheet()

    this.sheets = this.spreadSheet.getSheets()

  }

  get dayOfWeek() {

    const dayInt =  new Date().getDay()

    const dayDic = {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat'
    }
    
    return dayDic[dayInt]

  }

  get currentWeek() {
    return this.sheets[0]
  }

  get numOfWeeks() {
    return this.sheets.length
  }

  getCurrentWeekCoinsSheet() {
    return new weekcoinssheet(this.currentWeek, this.dayOfWeek)
  }


  copyCoinsInfo(coinsSheet) {

    let currentWeekCoinsSheet = this.getCurrentWeekCoinsSheet()

    if (this.dayOfWeek === 'Mon') {

      let previousWeekCoinsSheet = currentWeekCoinsSheet

      currentWeekCoinsSheet = this.makeCurrentWeekCoinsSheetFrom(previousWeekCoinsSheet)

    }

    currentWeekCoinsSheet.copySoldToDayRange(coinsSheet)

    currentWeekCoinsSheet.addToOpenedRange(coinsSheet)

    currentWeekCoinsSheet.addToReceivedRange(coinsSheet)

  }


  makeCurrentWeekCoinsSheetFrom(previousWeekCoinsSheet) {

    const previousWeek = previousWeekCoinsSheet.sheet

    const currentWeek = this.makeCurrentWeekFrom(previousWeek)
    
    const currentWeekCoinsSheet = new weekcoinssheet(currentWeek, this.dayOfWeek)

    return currentWeekCoinsSheet.clearContents().formatFrom(previousWeekCoinsSheet)

  }

  makeCurrentWeekFrom(previousWeek) {

    const currentWeek = previousWeek.copyTo(this.spreadSheet)

    currentWeek.setName(`Week${this.numOfWeeks + 1}`).activate()

    this.spreadSheet.moveActiveSheet(1)

    return currentWeek

  }

}




class weekcoinssheet {

  constructor(sheet, dayOfWeek) {

    this.sheet = sheet

    this.dayOfWeek = dayOfWeek

    this.previousWeekPackageSpace = 'B5:B6'

    this.previousWeekBagSpace = 'C5:C6'

    this.mondaySpace = 'E4'

    this.sundaySpace = 'K4'

    this.daySpaces = {
      'Mon': 'E5:E6',
      'Tue': 'F5:F6',
      'Wed': 'G5:G6',
      'Thu': 'H5:H6',
      'Fri': 'I5:I6',
      'Sat': 'J5:J6',
      'Sun': 'K5:K6'
    }

    this.packageSpaces = {$5: 'B12', $10: 'B13'}

    this.openSpace = 'D12:D13'

    this.remainderBagSpaces = {$5:'E12', $10:'E13'}

    this.receivedSpaces = {$5:'H12', $10:'H13'}

  }

  get name() {
    return this.sheet.getSheetName()
  }

  get daySpace() {
    return this.daySpaces[this.dayOfWeek]
  }

  get weekSpace() {
    return mergeMultiSpaces(this.daySpaces['Mon'], this.daySpaces['Sun'])
  }

  get dayRange() {
    return this.sheet.getRange(this.daySpace)
  }

  get weekRange() {
    return this.sheet.getRange(this.weekSpace)
  }

  get mondayRange() {
    return this.sheet.getRange(this.mondaySpace)
  }

  get openRange() {
    return this.sheet.getRange(this.openSpace)
  }

  get receivedRange() {
    return this.sheet.getRange(mergeSpaces(this.receivedSpaces.$5, this.receivedSpaces.$10))
  }

  get previousWeekPackageRange() {
    return this.sheet.getRange(this.previousWeekPackageSpace)
  }

  get previousWeekBagRange() {
    return this.sheet.getRange(this.previousWeekBagSpace)
  }


  clearContents() {

    this.openRange.clearContent()

    this.receivedRange.clearContent()

    this.weekRange.clearContent()

    return this

  }

  formatFrom(previousWeekCoinsSheet) {

    const previousName = previousWeekCoinsSheet.name

    this.setPreviousWeekPackageFormula(previousName)

    this.setPreviousWeekBagFormula(previousName)

    this.setMondayDateFormula(previousName)

    return this

  }


  setPreviousWeekPackageFormula(previousName) {

    const previousPackagesFormula = this.getPreviousWeekPackageFormula(previousName)

    const isFormula = true

    setRange(this.previousWeekPackageRange, previousPackagesFormula, isFormula)

  }

  getPreviousWeekPackageFormula(previousName) {

    const packageSpacesArray = [this.packageSpaces.$5, this.packageSpaces.$10]

    const previousNameArray = Array(packageSpacesArray.length).fill(`=${previousName}!`)

    return appendToArray(previousNameArray, packageSpacesArray)

  }


  setPreviousWeekBagFormula(previousName) {

    const previousWeekBagFormula = this.getPreviousWeekBagFormula(previousName)

    const isFormula = true

    setRange(this.previousWeekBagRange, previousWeekBagFormula, isFormula)

  }


  getPreviousWeekBagFormula(previousName) {

    const bagSpacesArray = [this.remainderBagSpaces.$5, this.remainderBagSpaces.$10]

    const receivedSpacesArray = [this.receivedSpaces.$5 ,this.receivedSpaces.$10]

    const previousNameArray = Array(bagSpacesArray.length).fill(`=${previousName}!`)

    const plusArray  =  Array(bagSpacesArray.length).fill(' + ')

    return appendMultiArray(previousNameArray, bagSpacesArray, plusArray, receivedSpacesArray)

  }

  setMondayDateFormula(previousName) {

    setRange(this.mondayRange, [`=${previousName}!${this.sundaySpace} + 1`])

  }


  copySoldToDayRange(coinsSheet) {

    copyRange(coinsSheet.soldCoinsRange, this.dayRange)

  }

  addToOpenedRange(coinsSheet) {

    const openedCoinsArray = dataRangeToArray(coinsSheet.openedRange)

    addToRange(this.openRange, openedCoinsArray)

  }

  addToReceivedRange(coinsSheet) {

    const receivedArray = dataRangeToArray(coinsSheet.receivedRange)

    addToRange(this.receivedRange, receivedArray)

  }


}


function testWeeklyCoins() {

  new weekscoinsspreadsheet().copyCoinsInfo()

}


