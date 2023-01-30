function addPurchasesUI() {

  const activeSheet = SpreadsheetApp.getActiveSheet()

  if(isCashierSheet(activeSheet)) {

    const html = getAddPurchasesTemplate().setWidth(450).setHeight(750);

    new ui().ui.showModalDialog(html, 'Adding To Purchased')

  }

  else alertGoToCashierSheet()
  
}

function addToPurchases(formObject) {

  const currenciesToAdd = formObject.currencies

  const activeSheet = SpreadsheetApp.getActiveSheet()

  new cashiersheet(activeSheet).addToPurchases(currenciesToAdd)
  
}


function alertGoToCashierSheet() {

  new ui().ui.alert('Go to a cashier sheet first. Then, use macro.')

}

getAddPurchasesTemplate = () => HtmlService.createTemplateFromFile('addPurchasesHTML').evaluate();

