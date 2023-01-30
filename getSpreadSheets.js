const getNewBackOfficeSpreadSheet = () => SpreadsheetApp.openById('142J7sVstVcZDPwfKbqcK5wAF2HYpZ-D1NREn70QlKt8');

const getNewFloatSpreadSheet = () => SpreadsheetApp.openById('1u5BN8yDWClvMgW6nGH2abn93ram6qbh-GnA8TuVrA3w');

const getNewCoinsSpreadSheet = () => SpreadsheetApp.openById('1YApLvt7o4ny8C5KAZNqz0XshnncsBdv34iNn_4h--ys');

const getLoneCashierID = (cashierNum) => SpreadsheetApp.openById(getLoneCashierIDFrom(cashierNum))

const getLoneCashierIDFrom = (cashierNum) => {

  Logger.log(cashierNum)

  const loneCashierID = {
    1: '1xkDhboPL1FWQi99xEWAoEAr9sNJcCAwJm6rmNCPUEDM',
    2 :'1NjMcbau-2mFiKXR7Q_qwDoDv7y92Uo3Y41iDy24dCpY',
    3 :'1W0KXtxfQRpxcIPkb_reui1ssFmWT40Joes8eRxrOiwE',
    4 :'1yvOsuZAKvzQ1hnfQu8ub6y0RlRDy8zekgXXNAKBhwso',
    5 :'1WEZfDjFqwfl8hbgwO4FeEDESMV5DqPkkbdZyNvY8JJU',
    6 :'1_ZuT1yaDie8H24eyLskUSRs663mDfUGf2Oz78yEKzwc',
    7 :'1nYbicDEzVnoClNGcpKp5F4OD4gEl4FmBVNg4hvqJWYw',
    8 :'1lxe9QAkJtPNZMd2DXtxNazjRoeRQC1hBAdIsNDnPd98',
    9 :'13rM1amkQVy3bQ0xb4h6cF2jPTaU7dCUqxZbDFVaAYGo',
    10 :'1iefcqrHXs0P-LS6a1xtbbAQjkeEXlIVccon75flEQJ4',
    11 :'1ET5MVuG8o_MEKZ1AXihWKKCAkDIUhUl3G1Lk6216PjA',
    12 :'1XlpvlaLJTSA6cACKWI7oq0b8S3nkx6C1KmK5YD1G_h4',
    13 :'14hjG99qU4K174XlnIBmHP2eBtXacwUV-X4AI83vce24',
    14 :'1l96zhcxFTlD9cqTlMIJ0N-ezxQZPmqDlGcEwBWxbrZ8',
    15 :'1gOtDAPKod_KJARuLKpMmipwILcrnpbjdFhnUeU2cx18',
    16 :'1sOJwBi2qztLddxyojCJHNDRP7hR5lEV-T5VqEHgQgzA',
    17 :'1buWZzSrrZsgOvohfKvDYQMGxS9-9W45BpSB8B4_xUyQ' 
  }

  const cashierID = loneCashierID[cashierNum]

  if(isNull(cashierID)) throw new Error('Invalid Cashier Number')

  return cashierID

}