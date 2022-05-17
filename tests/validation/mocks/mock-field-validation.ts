import { FieldValidation } from '@/validation/protocols'

export class FieldvalidationStub implements FieldValidation {
  error: Error = null

  constructor (readonly field: string) {}

  validate (input: object): Error {
    return this.error
  }
}
