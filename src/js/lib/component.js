import domready from 'domready'
import ElementExists from '../lib/element-exists'
import attributes from 'data-attributes'
import $dom from 'dom-helpers'
import request from 'superagent'
import PubSub from 'pubsub-js'

class Component {
    constructor( ...options ) {
        Object.assign( this, ...options )
        domready( this.exists.call( this ) )
    }
    exists() {
        const initialize = ElementExists( this.el ) ? true : false
        const element = document.querySelectorAll( this.el )
        if ( initialize ) this.mount()
    }
    debug(logtype, log) {
      console[logtype](`Debug: ${this.name}\n`, log)
    }
    bindSubscriptions() {
      if ( this.subscriptions && typeof this.subscriptions == 'object' ){
        for ( let [sub, cb] of Object.entries( this.subscriptions ) ){
          let _self = this
          let componentCallback = typeof cb === 'function' ? cb : this[cb]
          PubSub.subscribe( sub, componentCallback.bind(_self) )
        }
      }
    }
    bindEvents() {
      let eventSplitter = /\s+/
      if ( this.events && typeof this.events == 'object' ){
        for ( let [ev, cb] of Object.entries( this.events ) ){
          let componentEvent = ev.split( eventSplitter )
          let componentCallback = typeof cb === 'function' ? cb : this[cb]
          let nodes = document.querySelectorAll( this.el )
          let _self = this
          nodes.forEach(node => {
            node.addEventListener( componentEvent[0], function(e){
                if (e.target.matches(componentEvent[1])) {
                    componentCallback.bind(_self,e).call()
                }
            })
          })
        }
      }
    }
    mount() {
      this.attrs = attributes(document.querySelector( this.el ))
      this.init()
      this.bindEvents()
      this.bindSubscriptions()
    }
}


export { Component, domready, $dom, request, PubSub }
