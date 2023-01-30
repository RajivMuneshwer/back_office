class spreadsheet{

  constructor(){

    this.spreadSheet = getNewBackOfficeSpreadSheet()

  }
  

  get openedCashiers() {
    return this.spreadSheet.getSheets().filter(sheet => isCashierSheet(sheet))
    .map(sheet => new cashiersheet(sheet))
  }


  get activeSheet() {

    this.spreadSheet.getActiveSheet()

  }


  createCashier(cashierNum){

    const templateSheet = this.spreadSheet.getSheetByName('Template');

    const cashierName = `Cashier${cashierNum}`;

    const newSheet = templateSheet.copyTo(this.spreadSheet).setName(cashierName);

    return new cashiersheet(newSheet)

  }


  getCashier(cashierNum){
    return new cashiersheet(this.spreadSheet.getSheetByName(`Cashier${cashierNum}`))
  }


  deleteCashierSheet(cashierSheet) {

    this.spreadSheet.deleteSheet(cashierSheet.sheet)

  }




}


function testSpreadsheet(){


  const cashierSpreadsheet = new spreadsheet()

  Logger.log(cashierSpreadsheet.spreadSheet.getActiveSheet().getSheetName())




}
