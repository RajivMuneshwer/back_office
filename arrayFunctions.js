//////////////////////////////////////////////////////////////////////

const deepCopyArray = (array) => array?.slice()


function appendToRange(dataRange, appendArray, isFormula=false){

  const dataArray = dataRangeToArray(dataRange, isFormula)

  const appendedArray = appendToArray(dataArray, appendArray)

  setRange(dataRange, appendedArray, isFormula)

}


function appendMultiArray(...arrays) {

  if (arrays.length === 2) return appendToArray(arrays[0], arrays[1])

  const [array, ...rest] = arrays

  return appendToArray(array, appendMultiArray(...rest))


}


function appendToArray(array, appendArray){

  let copyArray = deepCopyArray(array)

  if (!(appendArray instanceof Array)) throw new TypeError('appendArray needs to be instance of Array')

  if(appendArray.length === 0) return array

  const arrayLength = copyArray?.length;

  let appendIndex = 0;

  for (let arrayIndex = 0; arrayIndex < arrayLength; arrayIndex++){

    if (isNull(copyArray[arrayIndex])){

      copyArray[arrayIndex] = appendArray[appendIndex]

    }
    else{
  
      copyArray[arrayIndex] = `${copyArray[arrayIndex]}${appendArray[appendIndex]}`
    
    }

    appendIndex++

    if (appendIndex >= appendArray.length) break
  
  }

  return copyArray

}


function unappendToRange(dataRange, unappendArray, isFormula=false) {

  const dataArray = dataRangeToArray(dataRange, isFormula)

  const unappendedArray = unappendToArray(dataArray, unappendArray)

  setRange(dataRange, unappendedArray, isFormula)

}


function unappendToArray(array, unappendArray){

  let copyArray = deepCopyArray(array)

  if (!(unappendArray instanceof Array)) throw new TypeError('unappendArray needs to be instance of Array')

  if(unappendArray.length === 0) return array

  const arrayLength = copyArray?.length;

  let unappendIndex = 0;

  for (let arrayIndex = 0; arrayIndex < arrayLength; arrayIndex++){

    if(isNotNull(copyArray[arrayIndex])) {

      copyArray[arrayIndex] = copyArray[arrayIndex].replace(unappendArray[unappendIndex], "")

    }
    
    unappendIndex++

    if (unappendIndex >= unappendArray.length) break

  }

  return copyArray

}


//////////////////////////////////////////////////////////////////////


function insertInRange(dataRange, insertArray, isFormula=false){

  const dataArray = dataRangeToArray(dataRange, isFormula)

  const insertDataArray = insertIntoArrayNulls(dataArray, insertArray)

  setRange(dataRange, insertDataArray, isFormula)

}


function insertIntoArrayNulls(array, insertArray) {

  let copyArray = deepCopyArray(array)

  if (!(insertArray instanceof Array)) throw new TypeError('insertArray needs to be instance of Array')

  if(insertArray.length === 0) return array

  const arrayLength = copyArray?.length;

  let insertIndex = 0;

  for (let arrayIndex =0; arrayIndex < arrayLength; arrayIndex++){

    if (isNull(copyArray[arrayIndex])){

      copyArray[arrayIndex] = insertArray[insertIndex]

      insertIndex++

    }

    if (insertIndex >= insertArray.length) break

  }

  return copyArray

}

function uninsertInRange(dataRange, uninsertArray, isFormula=false){

  const dataArray = dataRangeToArray(dataRange, isFormula)

  const uninsertedArray = uninsertInArray(dataArray, uninsertArray)

  setRange(dataRange, uninsertedArray, isFormula)

}


function uninsertInArray(array, uninsertArray){

  let copyArray = deepCopyArray(array)

  if (!(uninsertArray instanceof Array)) throw new TypeError('insertArray needs to be instance of Array')

  if(uninsertArray.length === 0) return array

  const arrayLength = copyArray?.length;

  let uninsertIndex = 0;

  for (let arrayIndex = 0; arrayIndex < arrayLength; arrayIndex++) {

    if(copyArray[arrayIndex] === uninsertArray[uninsertIndex]){

      copyArray[arrayIndex] = null

      uninsertIndex++

    }

    if (uninsertIndex >= uninsertArray.length) break

  }

  return copyArray

}


//////////////////////////////////////////////////////////////////////


function freezeRangeValues(range) {

  copyRange(range, range)

}


function copyRange(sourceRange, destinationRange, isFormula=false){

  const sourceArray = dataRangeToArray(sourceRange, isFormula)

  setRange(destinationRange, sourceArray, isFormula)

}


//////////////////////////////////////////////////////////////////////


function addToRange(dataRange, addArray) {

  const dataArray = dataRangeToArray(dataRange)

  const addedArray = addToArray(dataArray, addArray)

  setRange(dataRange, addedArray)

}


function addToArray(array, addArray) {

  let copyArray = deepCopyArray(array)

  if (!(addArray instanceof Array)) throw new TypeError('addArray needs to be instance of Array')

  if(addArray.length === 0) return array

  const arrayLength = copyArray?.length;

  let addIndex = 0;

  for (let arrayIndex = 0; arrayIndex < arrayLength; arrayIndex++){

    if(isNotNull(copyArray[arrayIndex])) {

      const addingNum = addArray[addIndex]

      if(isNotNull(addingNum)){
      
        copyArray[arrayIndex] = parseInt(copyArray[arrayIndex]) + parseInt(addArray[addIndex])

      }

    }
    else{

      copyArray[arrayIndex] = addArray[addIndex]

    }
    
    addIndex++

    if (addIndex >= addArray.length) break

  }

  return copyArray

}


//////////////////////////////////////////////////////////////////////


function setRange(dataRange, values, isFormula=false){

  const fitValues = fitArrayInDataRange(values, dataRange)

  if (isFormula) dataRange.setFormulas(fitValues)

  else dataRange.setValues(fitValues)

}


function dataRangeToArray(dataRange, isFormula=false){

  if (isFormula) return dataRange.getFormulas().flat()

  return dataRange.getValues().flat()

}

function dataRangesToArrays(rangesArray, formulasArray=[]) {

  let dataArray = []

  if (isEmpty(formulasArray)) {
    rangesArray.forEach(range => dataArray.push(dataRangeToArray(range)))
    return dataArray
  }

  if(formulasArray.length === rangesArray.length) {
    rangesArray.forEach((range,position) => dataArray.push(dataRangeToArray(range, formulasArray[position])))
    return dataArray
  }

  throw new Error(`formulas array has ${formulasArray.length} values and ranges array has ${rangesArray.length} values`)

}


function fitArrayInDataRange(array, dataRange) {

  const [numOfRows, numOfColumns] = [dataRange.getNumRows(), dataRange.getNumColumns()]

  return fitArrayInDimension(array, numOfRows, numOfColumns)

}


function fitArrayInDimension(array, rows, columns){

  const adjustedArray = adjustArrayLength(array, rows, columns)

  let fittedArray = []

  for (let i = 0; i < adjustedArray.length; i = i + columns){

    fittedArray.push(adjustedArray.slice(i, i + columns))

  }

  return fittedArray

}


function adjustArrayLength(array, rows, columns){

  const numOfSpaces = rows * columns

  if(numOfSpaces === array.length) return array

  if (numOfSpaces < array.length) throw new Error('Array is larger than Range');

  if(numOfSpaces > array.length ) return [...array, ...Array(numOfSpaces-array.length).fill(null)]

}


//////////////////////////////////////////////////////////////////////


function inRange(dataRange, row, column) {
  
  if (row < dataRange.getRow() || row > dataRange.getLastRow()) return false

  if(column < dataRange.getColumn() || column > dataRange.getLastColumn()) return false

  return true

}

function setCellInColumn(dataRangeColumn, row, value, absolute = false) {

  const rowInDataRange = (absolute) ? row : row - dataRangeColumn.getRow() + 1
  
  dataRangeColumn.getCell(rowInDataRange, 1).setValue(value)

}


//////////////////////////////////////////////////////////////////////


function sortDataRange(dataRange, column = 0) {

  const rangeA1 = dataRange.getA1Notation()

  const columnInt = getColumnInt(rangeA1) + column

  dataRange.sort({column: columnInt, ascending: true})

}


function getColumnInt(rangeA1){

    const letterToNum = {
    'A':1,
    'B':2,
    'C':3,
    'D':4,
    'E':5,
    'F':6,
    'G':7,
    'H':8,
    'I':9,
    'J':10,
    'K':11,
    'L':12,
    'M':13,
    'N':14,
    'O':15,
    'P':16,
    'Q':17,
    'R':18,
    'S':19,
    'T':20,
    'U':21,
    'V':22,
    'W':23,
    'X':24,
    'Y':25,
    'Z':26
  }

  return letterToNum[rangeA1.charAt(0)]


}


//////////////////////////////////////////////////////////////////////


function mergeMultiSpaces(firstSpace, lastSpace) {

  const [firstCell] = firstSpace.split(":")

  const [ , lastCell] = lastSpace.split(":")

  return mergeSpaces(firstCell, lastCell)

}


function mergeSpaces(firstCell, lastCell) {

  return `${firstCell}:${lastCell}`  

}


//////////////////////////////////////////////////////////////////////

