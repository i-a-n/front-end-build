import domready from 'domready';
import ElementExists from '../lib/element-exists';

class FqComponent {
    constructor( ...options ) {
        Object.assign( this, ...options );
        domready( this.test.call( this ) );
    }
    test() {
        const initialize = ElementExists( this.el ) ? true : false,
            element = document.querySelector( this.el );
        if ( initialize && !element.hasAttribute( 'component-disabled' ) ) this.init();
    }
}

export default FqComponent;
