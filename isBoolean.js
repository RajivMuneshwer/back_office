const isFalsy = (element) => !element;

const isNull = (element) => element == null || element == '';

const isNotNull = (element) => !isNull(element)

const isCashierSheet = (sheet) => sheet.getSheetName().substring(0,2) === 'Ca'

const isNot = (element) => isFalsy(element)

const isEmpty = (array) => (array?.length === 0)

const isNumber = (element) => {

  if(isNaN(element)) return false

  if(typeof element === 'number') return true

  return false
  
}




