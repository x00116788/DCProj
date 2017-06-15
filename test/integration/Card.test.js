var should = require('should'),
    request = require('supertest'),
    fs = require('fs'),
    // charlatan = require('charlatan'),
    jsonData = require(global.dirTest + 'integration/test_helper/json/card.json'),

    obj_post = {
        CORRECT: jsonData.post.ok,
        ERROR_empty: jsonData.post.error_empty,
        ERROR_missing: jsonData.post.error_missing,
        ERROR_wrong: jsonData.post.error_wrong
    },
    obj_get = {
        CORRECT: jsonData.get.ok,
        ERROR_empty: jsonData.get.error_empty,
        ERROR_missing: jsonData.get.error_missing,
        ERROR_wrong: jsonData.get.error_wrong
    };


describe('CardController', function () {
    describe('POST', function () {
        for (var i in Object.keys(obj_post)) {
            var obj = obj_post[Object.keys(obj_post)[i]];
            var name = Object.keys(obj_post)[i];
            it_post(name, obj, i)
        }
    });

    describe('GET ALL', function () {
        for (var i in Object.keys(obj_get)) {
            var obj = obj_get[Object.keys(obj_get)[i]];
            var name = Object.keys(obj_get)[i];
            it_get(name, obj, i)
        }
    });

    describe('GET BALANCE', function () {
        it('GET Card Balance CustomerID', function (done) {
            this.timeout(global.defaultTimeout);
            request('http://localhost:1337')
                .get('/balance/' + sails.config._customer.customer_id + '/refresh')
                .set('auth', 'Jvcdega6729DJS')
                .end(function (err, res) {
                    res.statusCode.should.be.exactly(200).and.be.a.Number;
                    res.body.should.be.an.instanceOf(Object);
                    res.body.should.have.property('expiry_date');
                    done();
                });
        })
    });

});