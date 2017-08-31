import Component from '../lib/component'

const Example = new Component( {
    el: '.example',
    events: {
      'click .btn': 'somefunk',
      'click .btntwo': 'morefunk'
    },
    init() {
      console.log('component init')
    },
    somefunk(){
      console.log('some funk')
    },
    morefunk(){
      console.log('a little more funk')
    }
} );

export default Example
