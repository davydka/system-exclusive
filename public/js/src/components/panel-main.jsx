var React = require('react');
var Dial			= require('../components/dial');
var Panel 			= require('../components/panel');

module.exports = React.createClass({
	render:function(){
		return <div className="panel-main panel-container">

				<Panel
					panelTitle="LFO"
					panelClassName="panel-moog panel-lfo"
					>
					<Dial
						controlTitle="RATE"
						controlId="lfoRate"
						controlClass=""
						/>

					<Dial
						controlTitle="WAVE"
						controlId="lfoWave"
						controlClass=""
						/>

					<hr/>

					<Dial
						controlTitle="FINE TUNE"
						controlId="fineTune"
						controlClass="dial-small"
						/>

					<Dial
						controlTitle="GLIDE RATE"
						controlId="glideRate"
						controlClass="dial-small"
						/>
				</Panel>

				<Panel
					panelTitle="MODULATION BUSSES"
					panelClassName="panel-moog panel-modulation-busses">

					<div className="row">
						<div className="col-sm-6">
							<Dial
								controlTitle="SOURCE"
								controlId="mod1Source"
								controlClass=""
								/>

							<Dial
								controlTitle="DESTINATION"
								controlId="mod1Destination"
								controlClass=""
								/>

							<Dial
								controlTitle="CONTROLLER"
								controlId="mod1Controller"
								controlClass=""
								/>

							<Dial
								controlTitle="AMOUNT"
								controlId="mod1Amount"
								controlClass="dial-small"
								/>
						</div>
						<div className="col-sm-6">
							<Dial
								controlTitle="SOURCE"
								controlId="mod2Source"
								controlClass=""
								/>

							<Dial
								controlTitle="DESTINATION"
								controlId="mod2Destination"
								controlClass=""
								/>

							<Dial
								controlTitle="CONTROLLER"
								controlId="mod2Controller"
								controlClass=""
								/>

							<Dial
								controlTitle="AMOUNT"
								controlId="mod2Amount"
								controlClass="dial-small"
								/>
						</div>
					</div>
				</Panel>

				<div className="hide panel panel-default">
					<img src="images/panel.jpg" alt=""/>
				</div>
			</div>
	}
});