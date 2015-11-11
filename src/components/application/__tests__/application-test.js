jest.dontMock('../index.js')

const React       = require('react')
const ReactDOM    = require('react-dom/server')
const TestUtils   = require('react-addons-test-utils')
const Application = require('../index.js')

describe('Application', () => {
  it ('displays hello world', () => {
    const app    = TestUtils.renderIntoDocument(<Application />)
        , span = TestUtils.findRenderedDOMComponentWithTag(app, 'span')

    expect(span.textContent).toEqual("Hello, world!")
  })
})
