function onOpen() {

  const interface = new ui().ui
  
  createOpenMenu(interface)
  createRemoveMenu(interface)
  createCollectCashierInfoMenu(interface)
  createAddToPurchasesMenu(interface)
  createSubmitMenu(interface)
  
}


function createOpenMenu(interface) {

  interface.createMenu('Open Cashiers')
    .addItem('Open Usual Cashiers', 'openUsual')
    .addSeparator()
    .addItem('Open Cashier', 'openCashierUI')
    .addSeparator()
    .addToUi()

}


function createRemoveMenu(interface) {

  interface.createMenu('Remove Cashiers')
    .addItem('Remove Cashier', 'removeCashierUI')
    .addSeparator()
    .addToUi()

}


function createCollectCashierInfoMenu(interface) {

  interface.createMenu('Collect Cashiers Info')
    .addItem('Collect Cashier Info', 'getLoneInfoUI')
    .addSeparator()
    .addToUi()

}


function createAddToPurchasesMenu(interface) {

  interface.createMenu('Add To Purchases')
    .addItem('Add Purchases To Cashier', 'addPurchasesUI')
    .addSeparator()
    .addToUi()

}


function createSubmitMenu(interface) {

  interface.createMenu('Submit')
    .addItem('Submit Currency', 'submitCurrency')
    .addSeparator()
    .addToUi()

}

