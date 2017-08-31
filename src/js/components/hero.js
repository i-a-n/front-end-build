import Component from '../lib/component';

const Example = new Component( {
    el: '.hero',
    init() {
        this.bindEvents();
    },
    bindEvents() {}
} );

export default Example;
