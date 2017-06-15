var should = require('should'),
    request = require('supertest'),
    fs = require('fs'),
    // charlatan = require('charlatan'),
    jsonData = require(global.dirTest + 'integration/test_helper/json/transaction.json'),

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


describe('Transaction Controller', function () {
    describe('TOP UP', function () {
        for (var i in Object.keys(obj_post)) {
            var obj = obj_post[Object.keys(obj_post)[i]];
            var name = Object.keys(obj_post)[i];
            it_post(name, obj, i)
        }
    });
   describe('QUICK TOP UP', function () {
        for (var i in Object.keys(obj_post)) {
            var obj = obj_post[Object.keys(obj_post)[i]];
            var name = Object.keys(obj_post)[i];
            it_post(name, obj, i)
        }
    });describe('SPEND', function () {
        for (var i in Object.keys(obj_post)) {
            var obj = obj_post[Object.keys(obj_post)[i]];
            var name = Object.keys(obj_post)[i];
            it_post(name, obj, i)
        }
    });
    describe('GET ONE', function () {
        for (var i in Object.keys(obj_get)) {
            var obj = obj_get[Object.keys(obj_get)[i]];
            var name = Object.keys(obj_get)[i];
            it_get_one(name, obj, i)
        }
    });
    describe('GET ALL', function () {
        for (var i in Object.keys(obj_get)) {
            var obj = obj_get[Object.keys(obj_get)[i]];
            var name = Object.keys(obj_get)[i];
            it_get(name, obj, i)
        }
    });   
});