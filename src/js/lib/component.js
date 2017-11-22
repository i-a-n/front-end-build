import domLoaded from 'dom-loaded'
import attributes from 'data-attributes'
import $dom from 'dom-helpers'
import request from 'superagent'
import PubSub from 'pubsub-js'
import utility from './utility'

class awesomeComponent {
    constructor(node, ...options ) {
      Object.assign( this, ...options )
      domLoaded.then(() => {
        this.element = node
        this.ready.call( this )
      })
    }
    ready() {
      if (!this.element) { this.mount(); return }
      domLoaded.then(() => { this.mount() })
    }
    debug( logtype, log ) {
      console[logtype]( `Debug: ${this.name}\n`, log )
    }
    attrs() {
      return !this.el ? false : attributes(this.element)
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
    init() {
      console.warn(`${this.name} did not provide an init function`)
    }
    bindEvents() {
      let eventSplitter = /\s+/
      if ( !this.element && this.events ) {
        console.warn(`${this.name} requires an element to bind events to`)
        return
      }
      if ( this.events && typeof this.events == 'object' ){
        for ( let [ev, cb] of Object.entries( this.events ) ){
          let componentEvent = ev.split( eventSplitter )
          let componentCallback = typeof cb === 'function' ? cb : this[cb]
          let _self = this
          this.element.addEventListener( componentEvent[0], function(e){
              if ( e.target.matches(componentEvent[1]) ) {
                  componentCallback.bind( _self,e ).call()
              }
          })
        }
      }
    }
    mount() {
      this.bindEvents()
      this.bindSubscriptions()
      this.init()
    }
}

const Component = function(...props){
  const options = props[0]
  const nodes = document.querySelectorAll( options.el )
  nodes.forEach(node => {
    new awesomeComponent(node, options)
  })
}

export { Component, domLoaded, $dom, request, PubSub, utility }
