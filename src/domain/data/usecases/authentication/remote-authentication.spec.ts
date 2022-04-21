import { HttpPostClient } from "../../protocols/http/http-post-client"
import { HttpPostClientSpy } from "../../test/mock-http-client"
import { RemoteAuthentication } from "./remote-authentication"

describe('RemoteAuthentication', () => { 
  test("Should call HttPostClient with correct URL", async () => {
 
  const url = "any_url"
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  await sut.auth()
  expect(httpPostClientSpy.url).toBe(url)
  }) 
})