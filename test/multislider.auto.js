/* 
 * Copyright Armin Junge
 */

function assert(expression, message){
   if(!expression)
      throw new Error(message || 'failed')
}

if(window.__html__)
   $('body').html(window.__html__['test/fixture.auto.html'])

/*
 * assumption:
 * the multi slider has per default three handlers
 * values are not shown on handlers
 * min value is 0 and max value is 100
 */

describe('Widget created', function(){
   let slider
   before(function(){
      slider = $('#slider')
   })
   context('#Classes of multislider element', function(){
      it('should have class ui-rangeslider', function(){
         assert(slider.hasClass('ui-rangeslider'), 'Missing class ui-rangeslider')
      })
   })
   context('#Contained elements', function(){
      it('has a div with class ui-rangeslider-sliders', function(){
         assert(slider.children('div.ui-rangeslider-sliders'), 'No <div> with class ui-rangeslider-sliders found')
      })
      it('has divs with class ui-slider which are not displayed', function(){
         let sliders = slider.children('div.ui-slider')
         assert(sliders.length > 0, 'No <div> with class ui-slider found')
         sliders.each(function(index){
            assert($(this).css('display') === 'none', `${index+1}. div.ui-slider child is not hidden`)
         })
      })
      it('has handlers without shown values', function(){
         let handlers = slider.find('a.ui-slider-handle')
         assert(handlers.length === 3, 'There are not three handlers')
         handlers.each(function(index){
            assert($(this).html() === '', `${index+1}. handler has a value`)
         })
      })
   })
})

describe('Usage', function(){
   let slider
   before(function(){
      slider = $('#slider')
   })
   context('#Options', function(){
      it('shows (numeric) values on handlers', function(){
         slider.multislider('option', 'showValue', true)
         let handlers = slider.find('a.ui-slider-handle')
         handlers.each(function(index){
            assert($.isNumeric($(this).html()), `${index+1}. handler has no (numeric) value`)
         })
         slider.multislider('option', 'showValue', false)
      })
      it('does not accept wrong value for showValue', function(){
         slider.multislider('option', 'showValue', 'true')
         assert(slider.multislider('option', 'showValue') === false, 'option showValue was wrongly set')
      })
   })
   context('#Getter functionality', function(){
      it('returns correct values', function(){
         let vals = slider.multislider('values')
         assert(vals.length === 3, 'Unexpected number of values')
         assert(vals[0] === 25, `first value is not 25 but ${vals[0]}`)
         assert(vals[1] === 50, `second value is not 50 but ${vals[1]}`)
         assert(vals[2] === 75, `third value is not 75 but ${vals[2]}`)
      })
      it('returns one correct value', function(){
         assert(slider.multislider('value', 0) === 25, `first value is not 25 but ${slider.multislider('value', 0)}`)
         assert(slider.multislider('value', 1) === 50, `second value is not 50 but ${slider.multislider('value', 1)}`)
         assert(slider.multislider('value', 2) === 75, `third value is not 75 but ${slider.multislider('value', 2)}`)
      })
      it('returns undefined value for wrong index', function(){
         assert(slider.multislider('value', -1) === null, `value is not undefined for negative index but ${slider.multislider('value', -1)}`)
         assert(slider.multislider('value', 5) === null, `value is not undefined for too high index but ${slider.multislider('value', 5)}`)
      })
      it('has three handlers', function(){
         assert(slider.multislider('count') === 3, 'wrong number of handlers')
      })
   })
   context('#Changing functionality', function(){
      it('changes middle value in correct ranges', function(){
         assert(slider.multislider('value', 1, 60).multislider('value', 1) === 60, `middle value was not changed correctly: ${slider.multislider('value', 1)}`)
      })
      it('changes middle value considering next value', function(){
         assert(slider.multislider('value', 1, 80).multislider('value', 1) === 74, `middle value was not changed correctly: ${slider.multislider('value', 1)}`)
      })
      it('changes middle value considering previous value', function(){
         assert(slider.multislider('value', 1, 20).multislider('value', 1) === 26, `middle value was not changed correctly: ${slider.multislider('value', 1)}`)
      })
      it('changes lowest value considering minimum value', function(){
         assert(slider.multislider('value', 0, 0).multislider('value', 0) === 1, 'minimum not considered')
      })
      it('changes highest value considering maximum value', function(){
         assert(slider.multislider('value', 2, 110).multislider('value', 2) === 100, 'maximum not considered')
      })
      it('shows changed value on handler', function(){
         slider.multislider('option', 'showValue', true)
         assert(slider.multislider('value', 1, 50).multislider('value', 1) === 50, `value was not changed correctly: ${slider.multislider('value', 1)}`)
         assert(parseInt(slider.find('a[pos=1]').html()) === 50, `handler shows wrong value: ${slider.find('a[pos=1]').html()}`)
         slider.multislider('option', 'showValue', false)
      })
   })
   context('#Addition and Removal of sliders/handlers', function(){
      it('adds a slider/handler', function(){
         slider.multislider('option', 'showValue', true)
         slider.multislider('increase')
         assert(slider.multislider('count') === 4, 'sliders not increased')
         let values = slider.multislider('values')
         assert(values[0] === 20, 'first handler has wrong value')
         assert(values[1] === 40, 'second handler has wrong value')
         assert(values[2] === 60, 'third handler has wrong value')
         assert(values[3] === 80, 'fourth handler has wrong value')
         assert(slider.children('div.ui-slider:last').css('display') === 'none', 'slider <div> is not hidden')
         slider.multislider('decrease')
         slider.multislider('option', 'showValue', false)
      })
      it('removes a slider/handler', function(){
         slider.multislider('decrease')
         assert(slider.multislider('count') === 2, 'sliders not decreased')
         let values = slider.multislider('values')
         assert(values[0] === 33, 'first handler has wrong value')
         assert(values[1] === 67, 'second handler has wrong value')
         slider.multislider('increase')
      })
   })
})