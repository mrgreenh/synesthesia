define([
    "utils/BaseObject"
    ], function(BaseObject){

        class EditorDispatcher extends BaseObject{

            constructor(){
                super();
                this._callbacks = [];
                this._promises = [];
            }

            register(callback){
                this._callbacks.push(callback);
                return this._callbacks.length-1;
            }

            dispatch(payload){
                //These resolves and rejects stuff will enable for implementing a waitFor utility
                var resolves = [];
                var rejects = [];
                this._promises = this._callbacks.map((_, i) => {
                    var dfd = $.Deferred();
                    resolves[i] = dfd.resolve;
                    rejects[i] = dfd.reject;
                    return dfd.promise();
                });

                this._callbacks.forEach((callback, i) => {
                    var result = callback(payload);
                    if(result.done){
                        result.done(() => {
                            resolved[i](payload);
                        });
                        result.fail(() => {
                            new Error("Oh nooo! The dispatcher just tripped! And I'm too lazy to have this message tell you why!");
                        });
                    }
                });
                this._promises = [];
            }

        }


        return EditorDispatcher;
    });