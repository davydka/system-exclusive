var infiniteGif = window.infiniteGif || {};

infiniteGif.index = 0;

infiniteGif.init = function(){
	document.onkeypress = function(e) {
		e = e || window.event;
		var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
		// space bar
		if (charCode == 32) {
			infiniteGif.midiHandler();
			return false; //prevent space bar from doing default scrolling
		}
	};

	var m = null; // m = MIDIAccess object for you to make calls on
	navigator.requestMIDIAccess().then( this.onsuccesscallback, this.onerrorcallback );
};

infiniteGif.midiHandler= function(event){
	if(typeof event != 'undefined'){
		if(event.data[0] != 144){
			return;
		}
	}
	console.log(event);
	infiniteGif.index++;
	TweenMax.to(window, 0, {scrollTo:{y:$('.list-item').eq(infiniteGif.index).offset().top}, ease:Power2.easeOut});
};

infiniteGif.onerrorcallback= function(err){
	console.log('error!');
	console.log(err);
};

infiniteGif.onsuccesscallback= function( access ) {
	m = access;

	// Things you can do with the MIDIAccess object:
	var inputs = m.inputs; // inputs = MIDIInputMaps, you can retrieve the inputs with iterators
	var outputs = m.outputs; // outputs = MIDIOutputMaps, you can retrieve the outputs with iterators

	var iteratorInputs = inputs.values() // returns an iterator that loops over all inputs
	var input = iteratorInputs.next().value // get the first input

	input.onmidimessage = infiniteGif.midiHandler; // onmidimessage( event ), event.data & event.receivedTime are populated

	var iteratorOutputs = outputs.values() // returns an iterator that loops over all outputs
	var output = iteratorOutputs.next().value; // grab first output device
};

infiniteGif.init();