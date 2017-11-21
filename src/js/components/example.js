import { Component, domLoaded, $dom, request, PubSub, utility } from '../lib/component'

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
      console.log('example init')
    },
    keyHandler(e) {
      console.log(e);
    },
    somefunk(event){
      this.debug('warn', this.attrs())
    },
    morefunk(event){
      this.debug('info', this.attrs())
    },
    subhandler(data, msg){
      this.debug('info', {data, msg})
    }
} )

export default Example
