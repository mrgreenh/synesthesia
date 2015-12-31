define([
        "views/visualizer/BaseInputChannel",
        "vendor/signaljs/dist/signal"
    ], function(BaseInputChannel, Signal){

        class InputChannel extends BaseInputChannel{

            constructor(inputData, inputBuffer){
                super();
                this._inputData = _.defaults(inputData, {
                    inputBus: "",
                    inputType: "note",
                    inputChannel: 1
                });
                this._signal = 0;
                inputBuffer.subscribeInput(
                    this,
                    this._inputData.inputBus,
                    this._inputData.inputType,
                    this._inputData.inputChannel,
                    this._inputData.sourceParameter
                );

                this._signalProcessor = new Signal(this._inputData.signalsList);
            }

            getSnapshot(){
                return this._signal;
            }
        }

        return InputChannel;
    });