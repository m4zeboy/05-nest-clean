import { Either, failure, success } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) return success(10)
  return failure('failure')
}

test('success result', () => {
  const successResult = doSomething(true)
  expect(successResult.isSuccess()).toBe(true)
  expect(successResult.isFailure()).toBe(false)
})

test('failure result', () => {
  const failureResult = doSomething(false)
  expect(failureResult.isFailure()).toBe(true)
  expect(failureResult.isSuccess()).toBe(false)
})
