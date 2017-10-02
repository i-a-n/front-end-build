import domready from 'domready'
import ElementExists from '../lib/element-exists'
import attributes from 'data-attributes'
import
class Component {
    constructor( ...options ) {
        Object.assign( this, ...options )
        domready( this.exists.call( this ) )
    }
    exists() {
        const initialize = ElementExists( this.el ) ? true : false;
        const element = document.querySelectorAll( this.el );
        if ( initialize ) this.mount()
    }
    bindEvents(){
      let eventSplitter = /\s+/
      if ( this.events && typeof this.events == 'object' ){
        for ( let [ev, cb] of Object.entries( this.events ) ){
          let componentEvent = ev.split( eventSplitter )
          let componentCallback = typeof cb === 'function' ? cb : this[cb]
          let nodes = document.querySelectorAll( this.el )
          nodes.forEach(node => {
            node.addEventListener( componentEvent[0], function(e){
                if (e.target.matches(componentEvent[1])) {
                    componentCallback.call(this, e)
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
    }
}

export default Component
