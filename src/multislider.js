/* 
 * Copyright Armin Junge
 */


$.widget('vertumnus.multislider', {
   options: {
      min: 0,
      max: 100,
      step: 1,
      showValue: true
   },
   _create: function(){
      let ctrMin = this.element.attr('min')
      let ctrMax = this.element.attr('max')
      let ctrStep = this.element.attr('step')
      let ctrShowValue = this.element.attr('data-show-value')
      if(ctrMin !== undefined)
         this.options.min = parseInt(ctrMin)
      if(ctrMax !== undefined)
         this.options.max = parseInt(ctrMax)
      if(ctrStep !== undefined)
         this.options.step = parseInt(ctrStep)
      if(ctrShowValue !== undefined)
         this.options.showValue = ctrShowValue === 'true'
      
      this.element.addClass('ui-rangeslider')
      this._label = this.element.find('label').first().insertBefore(this.element)
      this._sliderContainer = $('<div class="ui-rangeslider-sliders" />').prependTo(this.element)
      
      this._sliders = []
      let my = this
      this.element.find('input').each(function(index){
         my._newSlider($(this), index)
      }).change({ widget:this }, this._change).parent().hide()
      this._initSliders()
   },
   _setOption: function(key, value){
      switch(key){
         case 'showValue':
            if(typeof value !== 'boolean')
               return false
            this._showValue(value)
            break;
      }
      this._super(key, value)
   },
   _change: function(event){
      my = event.data.widget
      let current = $(event.target)
      let currentIndex = parseInt(current.attr('pos'))
      let prevVal = parseInt((currentIndex > 0) ? my._sliders[currentIndex-1].slider.val() : my.options.min)
      let nextVal = parseInt((currentIndex < my._sliders.length-1) ? my._sliders[currentIndex+1].slider.val() : my.options.max+1)
      let currentVal = parseInt(current.val())
      if(currentVal <= prevVal)
         current.val(prevVal+my.options.step).slider('refresh')
      if(currentVal >= nextVal)
         current.val(nextVal-my.options.step).slider('refresh')
      
      if(my.options.showValue)
         my._sliderContainer.find(`a[pos=${currentIndex}]`).html(current.val())
   },
   _newSlider: function(elem, index){
      let slider = elem.attr({ 
         min:this.options.min, 
         max:this.options.max, 
         step:this.options.step,
         "data-show-value":this.options.showValue,
         pos:index
      }).slider()
      let widget = $.data(slider[0], 'mobile-slider')
      widget.slider.appendTo(this._sliderContainer)
      widget.handle.attr({ pos:index })
      this._sliders.push({slider:slider, handle:widget.handle})
      return slider
   },
   _initSliders: function(){
      let diff = this.options.max - this.options.min
      let def = diff / (this._sliders.length + 1)
      let start = parseInt(this.options.min)
      this._sliders.forEach(function(elem){
         elem.slider.val(Math.round(start+=def)).slider('refresh')
         if(this.options.showValue)
            elem.handle.html(elem.slider.val())
      }, this)
   },
   _showValue: function(value){
      this._sliders.forEach(function(elem){
         elem.handle.html(value?elem.slider.val():'')
      })
   },
   values: function(){
      return this._sliders.map(elem => parseInt(elem.slider.val()))
   },
   value: function(index, value){
      if(index < 0 || index >= this._sliders.length)
         return null
      if(value === undefined)
         return parseInt(this._sliders[index].slider.val())
      this._sliders[index].slider.val(value).change()
      return this
   },
   count: function(){
      return this._sliders.length
   },
   increase: function(){
      this._newSlider($('<input type="range" />').appendTo(this.element), this._sliders.length)
              .change({ widget:this }, this._change).parent().hide()
      this._initSliders()
   },
   decrease: function(){
      this._sliders.pop()
      this.element.find('.ui-slider-track:last').remove()
      let input = this.element.find('input:last')
      input.slider('destroy').remove()
      this._initSliders()
   }
})