define(function(){
    class BaseObject{
        constructor(){
            this.observers = {};
        }

        setProp(dict, path, value){
            var steps = path.split(".");
            if(steps.length>1){
                if(_.isUndefined(dict[_.first(steps)]))
                    dict[_.first(steps)] = {}
                this.setProp(dict[steps.shift()], steps.join("."), value)
            }else{
                dict[_.first(steps)] = value;
            }
        }

        observe(observed, eventName){
            observed.addObserver(this, eventName);
        }

        unobserve(observed){
            observed.removeObserver(this);
        }

        removeObserver(observer){
            _.keys(this.observers).forEach((key) => {
                this.observers[key] = _.without(this.observers[key], observer);
            });
        }

        addObserver(observer, eventName){
            if(!this.observers[eventName])
                this.observers[eventName] = [];
            this.observers[eventName].push(observer);
        }

        triggerEvent(eventName){
            if(!this.observers[eventName]) return;
            this.observers[eventName].forEach((observer) => {
                observer.events.apply(observer, arguments);
            });
        }

        $(selector){
            if(this.$el)
                return this.$el.find(selector);
        }

        events(eventName){
            //To be subclassed
        }

        /*
            1) I don't like callbacks
            2) You end up binding events all in the same spot of the code for readability anyway
            3) Not saying this is better, but let's see how far it can get
        */
        onEvent(eventName){
            //To be overridden in the subclass
            console.log(eventName);
        }
    }

    return BaseObject;
});