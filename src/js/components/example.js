import {Component, domready, $dom, request, PubSub, utility } from '../lib/component'

const Example = new Component( {
    el: '.example',
    name: 'Example Component',
    events: {
      'click .btn': 'somefunk',
      'click .btntwo': 'morefunk'
    },
    subscriptions: {
      'locationUpdate': 'subhandler'
    },
    init() {
      this.debug('error', this.attrs)
    },
    somefunk(event){
      this.debug('warn', this.attrs)
      this.debug('info', this)
      this.debug('info', event)
      this.debug('info', 'some funk')
    },
    morefunk(event){
      this.debug('info', this.attrs)
      this.debug('info', 'a little more funk')
    },
    subhandler(data, msg){
      this.debug('info', {data, msg})
    }
} );

export default Example
