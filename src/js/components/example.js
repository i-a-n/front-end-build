import $ from 'jquery';
import Component from '../lib/component';

const Example = new Component( {
    el: '.example',
    init() {
        this.bindEvents();
        $(this.el).css('color', 'red');
    },
    bindEvents() {}
} );

export default Example;
