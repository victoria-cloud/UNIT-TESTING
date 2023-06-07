const expect = require('chai').expect
const UserDataHandler = require('../src/data_handlers/user_data_handler')

const userDataHandler = new UserDataHandler()

const USER = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
}

const PARAMS={
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz'
}

const USER_EXTERNAL={
  id: 164,
  name: 'Curt Smith',
  username: 'Curt',
  email: 'Sincere@april.biz'
}

describe('Test UserDataHandler class methods:', () =>{

  it('<loadUsersasync> method should load users', async () => {
    await userDataHandler.loadUsersasync()
    let result=userDataHandler.users
    expect(result.length).to.equal(10)
    expect(result[0]).to.have.property('name').equals('Leanne Graham')
  })

  it('<loadUsersasync> method should throw an error <Failed to load users data>',async () => {
    await userDataHandler.loadUsersasync().catch((error) => {expect(error.message).to.equal('Failed to load users data: Error: connect ECONNREFUSED 127.0.0.1:3000');});
  })

  it('<getUserEmailsList> method should create a string containing al user emails', () => {
    const emailsList = userDataHandler.getUserEmailsList()
    expect(emailsList).to.be.a('string')
    expect(emailsList).to.contain('Sincere@april.biz')
  })

  it('<getUserEmailsList> method should throw an error if no users loaded', () => {
    expect(() => { userDataHandler.getUserEmailsList() }).to.throw('No users loaded!')
  })

  it('<getNumberOfUsers> method should retrieve number of current users', () => {
    const numberOfUsers = userDataHandler.getNumberOfUsers()
    expect(numberOfUsers).to.be.a('number')
    expect(numberOfUsers).to.equal(10)
  })
   
  it('<isMatchingAllSearchParams> method should returns true if user object matches all provided search parameters', () => {
    const isMatching = userDataHandler.isMatchingAllSearchParams(USER,PARAMS)
    expect(isMatching).to.equal(true)
  })

  it('<findUsers> should throw an error <No search parameters provoded!> if no arguments are provided', () => {
    expect(() => { userDataHandler.findUsers() }).to.throw('No search parameters provoded!')
  })

  it('<findUsers> should return an array of matches', () => {
    const matches=userDataHandler.findUsers(PARAMS)
    expect(matches).to.have.lengthOf(1)  
  })

  it('<findUsers> should throw an error <No matching users found!> if no match found', () => {
    expect(() => { userDataHandler.findUsers(USER_EXTERNAL) }).to.throw('No matching users found!')
  })

  it('<findUsers> should throw an error <No users loaded!> if users list is empty', () => {
    userDataHandler.users = []
    expect(() => { userDataHandler.findUsers(USER) }).to.throw('No users loaded!')
  })
 
})





