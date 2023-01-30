class cashiersheet {

  constructor(sheet){

    this.sheet = sheet;

    this.name = this.sheet.getSheetName()

    this.number = parseInt(this.name.substring('Cashier'.length));

    this.todaySpace = 'B1';

    this.cashierNameSpace = 'B2'

    this.nameSpace = 'A2';

    this.currentSignerSpace = 'B3'

    this.totalSpace = 'B4'

    this.currencySpace = 'A7:B20';

    this.breakDownSpaces = {
      1000: 'B21',
      2000: 'B22', 
      5000:'B23'
    }

    this.currencySumSpace = 'C21';

    this.timeSpace = 'D7:D20'

    this.signerSpace = 'E7:E20'

    this.chequeSumSpace = 'C26';

    this.chequeSpace = 'A28:D38';

    this.floatQuantitySpace = 'H8:H14';

    this.floatSumSpace = 'I15';

    this.floatSpace = 'I17';

    this.dateSpace = 'I18';

    this.coinsSpaces= {
      5:'L8',
      10:'L9'
    };

    this.notesSpaces = {
      20:'L10', 
      50:'L11', 
      100:'L12', 
      500:'L13', 
      1000:'L14'
    };

    this.coinsSumSpace = 'M15';

    this.notesSumSpace = 'M16';

    this.addPurchasesSpaces = [

      {header:'N7', body:'N8:N14', footer:'N15:N16'},
      {header:'O7', body:'O8:O14', footer:'O15:O16'},
      {header:'P7', body:'P8:P14', footer:'P15:P16'},
      {header:'Q7', body:'Q8:Q14', footer:'Q15:Q16'},
      {header:'R7', body:'R8:R14', footer:'R15:R16'}

    ]

    this.debitRBSpace = 'G28:I38'
    this.debitSumRBSpace = 'I26'

    this.debitGBTISpace = 'L28:N38'
    this.debitSumGBTISpace = 'N26'

  }

  get notesSpace(){
    return mergeSpaces(this.notesSpaces[20], this.notesSpaces[1000])
  }

  get coinsSpace(){
    return mergeSpaces(this.coinsSpaces[5], this.coinsSpaces[10])
  }

  get purchaseSpace(){
    return mergeSpaces(this.coinsSpaces[5], this.notesSpaces[1000])
  }

  get todayRange(){
    return this.sheet.getRange(this.todaySpace)
  }

  get cashierNameRange(){
    return this.sheet.getRange(this.cashierNameSpace)
  }

  get dateRange(){
    return this.sheet.getRange(this.dateSpace)
  }

  get nameRange(){
    return this.sheet.getRange(this.nameSpace)
  }

  get currentSignerRange(){
    return this.sheet.getRange(this.currentSignerSpace)
  }

  get totalRange(){
    return this.sheet.getRange(this.totalSpace)
  }

  get floatRange(){
    return this.sheet.getRange(this.floatSpace)
  }

  get floatSumRange(){
    return this.sheet.getRange(this.floatSumSpace)
  }

  get floatQuantityRange(){
    return this.sheet.getRange(this.floatQuantitySpace)
  }

  get notesRange(){
    return this.sheet.getRange(this.notesSpace)
  }

  get coinsRange(){
    return this.sheet.getRange(this.coinsSpace)
  }

  get purchasesRange(){
    return this.sheet.getRange(this.purchaseSpace)
  }

  get currencyRange(){
    return this.sheet.getRange(this.currencySpace)
  }

  get chequeRange(){
    return this.sheet.getRange(this.chequeSpace)
  }

  get timeRange(){
    return this.sheet.getRange(this.timeSpace)
  }

  get signerRange(){
    return this.sheet.getRange(this.signerSpace)
  }

  get debitRBRange(){
    return this.sheet.getRange(this.debitRBSpace)
  }

  get debitGBTIRange(){
    return this.sheet.getRange(this.debitGBTISpace)
  }

  get firstPurchaseHeader() {
    return this.addPurchasesSpaces[0]['header']
  }

  get blankAddPurchasesRange(){

    for(let {header, body, footer} of this.addPurchasesSpaces) {

      const purchaseRange = this.sheet.getRange(body)

      if(purchaseRange.isBlank()) return {

        mergedheaderRange: this.sheet.getRange(mergeSpaces(this.firstPurchaseHeader, header)),

        bodyRange: purchaseRange,

        footerRange: this.sheet.getRange(footer)
        
      }

    }

  }


  setName() {

    setRange(this.nameRange, [this.name])

  }


  setFloatAndDate() {

    const collectiveFloatSheet = new collectivefloatsheet();
    const [date, float] = dataRangeToArray(collectiveFloatSheet.getDateAndFloatRange(this));
    setRange(this.dateRange, [date])
    setRange(this.floatRange, [float])

  }

  copyCashierName(loneCashier) {
    copyRange(loneCashier.cashierNameRange, this.cashierNameRange)
  }

  copyLoneToFloat(loneCashier){
    copyRange(loneCashier.floatRange, this.floatQuantityRange)
  }

  copyLoneToNotes(loneCashier){
    copyRange(loneCashier.notesRange, this.notesRange)
  }

  copyLoneToCoins(loneCashier){
    copyRange(loneCashier.coinsRange, this.coinsRange)
  }

  copyLoneToDebit(loneCashier){
    copyRange(loneCashier.debitRBRange, this.debitRBRange)
    copyRange(loneCashier.debitGBTIRange, this.debitGBTIRange)
  }

  insertInCurrencyLone(loneCashier){

    const loneCurrencyArray = dataRangeToArray(loneCashier.currencyRange)
    insertInRange(this.currencyRange, loneCurrencyArray)
    const repeat = Math.floor(loneCurrencyArray.filter(value => isNotNull(value)).length /  2)
    this.insertInTime(repeat)
    this.insertInCashierName(repeat)

  }

  insertInTime(repeat = 1) {

    const timesToInsert = Array(repeat).fill(new Date())
    insertInRange(this.timeRange, timesToInsert)

  }

  insertInCashierName(repeat = 1) {

    const namesToInsert = Array(repeat).fill(this.cashierNameRange.getValue())
    insertInRange(this.signerRange, namesToInsert)

  }

  insertInChequeLone(loneCashier){

    const loneChequeArray = dataRangeToArray(loneCashier.chequeRange)
    insertInRange(this.chequeRange, loneChequeArray)

  }

  addToPurchases(currenciesToAdd) {

    const {mergedheaderRange, bodyRange, footerRange} = this.blankAddPurchasesRange
    this.insertPurchases(mergedheaderRange, bodyRange, footerRange, currenciesToAdd)
    this.formatPurchasesBorder(mergedheaderRange, bodyRange, footerRange)

  }

  insertPurchases(mergedheaderRange, bodyRange, footerRange, currenciesToAdd) {

    const purchaseArray = dataRangeToArray(this.purchasesRange)
    insertInRange(bodyRange, purchaseArray)
    insertInRange(footerRange, [this.currentSignerRange.getValue(), new Date()])
    addToRange(this.purchasesRange, currenciesToAdd)
    mergedheaderRange.setValue('Add')

  }



  formatPurchasesBorder(mergedheaderRange, bodyRange, footerRange) {

    bodyRange.setBorder(true, true, true, true, true, null)
    footerRange.setBorder(true, true, true, true, true, true)
    mergedheaderRange.merge().setBorder(true, true, true, true, true, true).
    setHorizontalAlignment('center')

  }


  freezeSigners() {

    freezeRangeValues(this.signerRange)
    freezeRangeValues(this.currentSignerRange)

  }



  isEmpty(){

    return (this.currencyRange.isBlank()
    ? (this.floatQuantityRange.isBlank() 
    ? (this.chequeRange.isBlank()
    ? true : false) : false) : false)

  }

}


function testcashierSheet() {

  const cashierSheet = new spreadsheet().getCashier(17)
  cashierSheet.freezeSigners()

}



