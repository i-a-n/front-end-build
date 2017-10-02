import Component from '../lib/component'

const Example = new Component( {
    el: '.example',
    name: 'Example Component',
    events: {
      'click .btn': 'somefunk',
      'click .btntwo': 'morefunk'
    },
    init() {
      console.log(this.attrs)
      c
    },
    somefunk(e){
      console.log(this)
      console.log(e)
      console.log('some funk')
    },
    morefunk(){
      console.log('a little more funk')
    }
} );

export default Example
