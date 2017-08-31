import domready from 'domready'
import ElementExists from '../lib/element-exists'

class Component {
    constructor( ...options ) {
        Object.assign( this, ...options )
        domready( this.test.call( this ) )
    }
    test() {
        const initialize = ElementExists( this.el ) ? true : false,
            element = document.querySelector( this.el )
        if ( initialize ) this.mount()
    }
    bindEvents(){
      let eventSplitter = /\s+/
      if ( this.events && typeof this.events == 'object' ){
        for ( let [ev, cb] of Object.entries( this.events ) ){
          let componentEvent = ev.split( eventSplitter )
          let componentCallback = typeof cb === 'function' ? cb : this[cb]
          document.querySelector( this.el ).addEventListener( componentEvent[0], function(e){
              if (e.target.matches(componentEvent[1])) {
                  componentCallback.bind(e).call()
              }
          })
        }
      }
    }
    mount() {
      this.init()
      this.bindEvents()
    }
}

export default Component
