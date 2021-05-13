import assert from 'assert'
import { JSDOM } from 'jsdom'

import { perform } from '../cable_ready'

describe('operations', () => {
  context('innerHtml', () => {
    it('should replace innerHtml of element', () => {
      const dom = new JSDOM('<div id="inner_html">Pre-Operation</div>')
      global.document = dom.window.document

      const element = document.querySelector('#inner_html')
      const operations = {
        innerHtml: [
          { selector: '#inner_html', html: '<i>CableReady rocks</i>' }
        ]
      }

      perform(operations)

      assert.equal(element.innerHTML, '<i>CableReady rocks</i>')
    })

    it('should replace innerHtml of element with surrounding tag', () => {
      const dom = new JSDOM('<div id="inner_html">Pre-Operation</div>')
      global.document = dom.window.document

      const element = document.querySelector('#inner_html')
      const operations = {
        innerHtml: [
          {
            selector: '#inner_html',
            html: '<div id="inner_html"><i>Post-Operation</i></div>'
          }
        ]
      }

      perform(operations)

      assert.equal(
        element.innerHTML,
        '<div id="inner_html"><i>Post-Operation</i></div>'
      )
    })

    it('should replace innerHtml of multiple elements', () => {
      const dom = new JSDOM(
        `
      <div class="inner_html">Pre-Operation</div>
      <div class="inner_html">Pre-Operation</div>
      <div class="inner_html">Pre-Operation</div>
      `
      )
      global.document = dom.window.document

      const operations = {
        innerHtml: [
          {
            selector: '.inner_html',
            html: '<i>CableReady rocks</i>',
            selectAll: true
          }
        ]
      }
      const elements = document.querySelectorAll('.inner_html')

      assert.equal(elements.length, 3)

      perform(operations)

      elements.forEach(element => {
        assert(element)
        assert.equal(element.innerHTML, '<i>CableReady rocks</i>')
      })
    })

    it('should replace innerHtml of XPath element', () => {
      const dom = new JSDOM(
        `
      <div>
        <div></div>
        <div>
          <div>
            <div></div>
            <div>
              <span></span>
              <span>Pre-Operation</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      `
      )
      global.document = dom.window.document

      const element = document.querySelectorAll('span')[1]
      const operations = {
        innerHtml: [
          {
            selector: '/html/body/div/div[2]/div[1]/div[2]/span[2]',
            html: '<i>Post-Operation</i>',
            xpath: true
          }
        ]
      }

      perform(operations)

      assert.equal(element.innerHTML, '<i>Post-Operation</i>')
    })

    it('should execute multiple innerHtml operations in sequence', () => {
      const dom = new JSDOM(
        `
      <div class="inner_html" id="inner_html-1">Pre-Operation</div>
      <div class="inner_html" id="inner_html-2">Pre-Operation</div>
      <div class="inner_html" id="inner_html-3">Pre-Operation</div>
      `
      )
      global.document = dom.window.document

      const operations = {
        innerHtml: [
          { selector: '#inner_html-1', html: 'Post-Operation 1' },
          { selector: '#inner_html-2', html: 'Post-Operation 2' },
          { selector: '#inner_html-3', html: 'Post-Operation 3' }
        ]
      }

      let beforeCount = 0
      let afterCount = 0

      const elements = document.querySelectorAll('.inner_html')

      elements.forEach(element => {
        element.addEventListener('cable-ready:before-inner-html', event => {
          assert.equal(event.detail.element, element)
          assert.equal(event.detail.html.slice(-1), element.id.slice(-1))

          beforeCount += 1
        })

        element.addEventListener('cable-ready:after-inner-html', event => {
          assert.equal(event.detail.element, element)
          assert.equal(event.detail.html.slice(-1), element.id.slice(-1))

          afterCount += 1
        })
      })

      assert.equal(beforeCount, 0)
      assert.equal(afterCount, 0)

      perform(operations)

      assert.equal(beforeCount, 3)
      assert.equal(afterCount, 3)

      assert.equal(
        document.querySelector('#inner_html-1').innerHTML,
        'Post-Operation 1'
      )
      assert.equal(
        document.querySelector('#inner_html-2').innerHTML,
        'Post-Operation 2'
      )
      assert.equal(
        document.querySelector('#inner_html-3').innerHTML,
        'Post-Operation 3'
      )
    })
  })
})
