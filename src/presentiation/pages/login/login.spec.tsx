import React from 'react'
import Login from './login'
import faker from 'faker'
import { ValidationStub, AuthenticationSpy } from '@/presentiation/test'
import { cleanup, render, RenderResult, fireEvent, waitForElementToBeRemoved } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const simulateValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void =>{
  populateEmailField(sut, email)
  populatePasswordlField(sut, password)
  const submitButton = sut.getByTestId("submit")
  fireEvent.click(submitButton)
}
const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email')
  fireEvent.input( emailInput, { target: { value: email}})
}
const populatePasswordlField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password')
  fireEvent.input( passwordInput, { target: { value: password}})
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`)
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!')
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢') 
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  validationStub.errorMessage = params?.validationError
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Component', () => { 
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    simulateStatusForField(sut, 'email', validationError)
    simulateStatusForField(sut, 'password', validationError)

  })
  
  test('Should show email error if validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateEmailField(sut)
    simulateStatusForField(sut, 'email', validationError)
  }) 

  test('Should show passowrd error if validation fails ', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populatePasswordlField(sut)
    simulateStatusForField(sut, 'password', validationError)
  }) 

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    populatePasswordlField(sut)
    simulateStatusForField(sut, 'password')
  }) 

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    populateEmailField(sut)
    simulateStatusForField(sut, 'email')
  }) 
 
  test('Should enable submit button if form is valid', () =>{
    const { sut } = makeSut()
    populateEmailField(sut)
    populatePasswordlField(sut)
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  }) 

  test('Should show spinner on submit', () => {
    const { sut } = makeSut()
    simulateValidSubmit(sut)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should call Authentication with correct values', () =>{
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  }) 

})