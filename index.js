var jQuery = require('jquery-deferred');
var fooSchnickens = function() {
    var promise = new jQuery.Deferred();
    
    var op1 = function() {
        var promise = new jQuery.Deferred();
        console.log('running op1');
        setTimeout(function() { 
            console.log('resolving op1');
            promise.resolve();
        }, 3000)
        return promise;
    }
    
    var op2 = function() {
        var promise = new jQuery.Deferred();
        console.log('running op2');
        setTimeout(function() { 
            console.log('resolving op2');
            promise.resolve();
        }, 1000)
        return promise;
    }
    
    var op3 = function() {
        var promise = new jQuery.Deferred();
        console.log('running op3');
        setTimeout(function() { 
            console.log('resolving op3');
            promise.resolve();
        }, 2000)
        return promise;
    }
    
    var op4 = function(data) {
        var promise = new jQuery.Deferred();
        console.log('running op4');
        setTimeout(function() { 
            if(RESOLVE) {
                promise.resolve(data);
            } else {
                promise.reject('Bad news, friends...')
            }
        }, 4000);
        return promise;
    }
    
    var deferreds1 = [op1(), op2(), op3()];
    
    var onlyLogMeOnSuccess = [{name: 'foo'}, {name: 'bar'}, {name: 'baz'}]

    jQuery.when.apply(jQuery, deferreds1).then(
        function(success) {
            return onlyLogMeOnSuccess;
        }
    ).then(
        function(success) {
            return op4(success);
        }
    ).then(
        function(success) {
            if(success) {
                success.forEach(function(x) {
                    console.log(x.name);
                });
            }
            return;
        },
        function(fail) {
            console.log('op4 failed with: ' + fail);
        }
    ).done(
        function() { 
            console.log('done and done...');
        }
    );

    return promise;
}

// Set this to `false` to see the failure condition when a .then() chain member gets rejected
var RESOLVE = false;

module.exports = fooSchnickens();