class registers {

  constructor(){
    this.propertiesService = PropertiesService.getScriptProperties()
  }
  
  get register(){
    return JSON.parse(this.propertiesService.getProperty('register'))
  }

  set register(register){
    this.propertiesService.setProperty('register', JSON.stringify(register))
  }

  openRegister(cashierNum){
    const register = this.register
    register[cashierNum] = true
    this.register = register
  }

  closeRegister(cashierNum){
    const register = this.register
    register[cashierNum] = false
    this.register = register
  }

  deleteRegister(){
    this.propertiesService.deleteProperty('register')
  }

  isRegisterOpen(cashierNum) {

    return this.register[cashierNum]

  }

  isAllClosed() {

    const register = this.register
    Logger.log(register)
    return !Object.values(register).includes(true)

  }

  makeNewRegister() {

    const register ={
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
      9: false,
      10: false,
      11: false,
      12: false,
      13: false,
      14: false,
      15: false,
      16: false,
      17: false
    }
    this.propertiesService.setProperty('register', JSON.stringify(register))
  }

}


function testRegister(){

  new registers().closeRegister(1)

}


