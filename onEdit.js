function onEdit(e) {
  
  const cashierSheet = new cashiersheet(e.source.getActiveSheet());

  if(!isCashierSheet(cashierSheet.sheet)) return null;

  if(!isInCurrencyRange(e, cashierSheet)) return null;

  setSignAndTime(e, cashierSheet);

}


function isInCurrencyRange(e, cashierSheet) {

  const [row, column] = [e.range.rowStart, e.range.columnStart]

  if(!inRange(cashierSheet.currencyRange, row, column)) return false

  return true

}


function setSignAndTime(e, cashierSheet) {

  const row = e.range.rowStart

  let value = e.value

  setTime(row, value, cashierSheet)

  setSigner(row, value, cashierSheet)

}

function setTime(row, value, cashierSheet) {

  if(isNotNull(value)) value = new Date()

  const dataRangeColumn = cashierSheet.timeRange

  setCellInColumn(dataRangeColumn, row, value)

}

function setSigner(row, value, cashierSheet) {

  if(isNotNull(value)) [value] = dataRangeToArray(cashierSheet.currentSignerRange)

  const dataRangeColumn = cashierSheet.signerRange

  setCellInColumn(dataRangeColumn, row, value)


}




