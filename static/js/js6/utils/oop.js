class BaseObject{
    constructor(){
        this.observers = {};
    }

    observe(observed, eventName){
        observed.addObserver(this, eventName);
    }

    addObserver(observer, eventName){
        if(!this.observers[eventName])
            this.observers[eventName] = [];
        this.observers[eventName].push(observer);
    }

    trigger(eventName){
        for(var observer of this.observers[eventName]){
            _.bind(observer.events(), observer);
        }
    }

    $(selector){
        if(this.$el)
            return this.$el.find(selector);
    }

    events(){
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