import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/usecases'


export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params: AuthenticationParams

  auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}