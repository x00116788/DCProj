var should = require('should'),
    request = require('supertest'),
    fs = require('fs'),
    check_obj = {},
    charlatan = require('charlatan'),
    object_test = "customer",
    jsonData = require(global.dirTest + 'integration/test_helper/json/' + object_test + '.json'),
    jsonDatamail = require(global.dirTest + 'integration/test_helper/json/mail.json');

    obj_post = {
        CORRECT: jsonData.post.ok,
        ERROR_empty: jsonData.post.error_empty,
        ERROR_missing: jsonData.post.error_missing,
        ERROR_wrong: jsonData.post.error_wrong
    },
    // obj_patch = {
    //     CORRECT: jsonData.patch.ok,
    //     ERROR_empty: jsonData.patch.error_empty,
    //     ERROR_missing: jsonData.patch.error_missing,
    //     ERROR_wrong: jsonData.patch.error_wrong
    // },
    // obj_change_pass = {
    //     CORRECT: jsonData.change_pass.ok,
    //     ERROR_empty: jsonData.change_pass.error_empty,
    //     ERROR_missing: jsonData.change_pass.error_missing,
    //     ERROR_wrong: jsonData.change_pass.error_wrong
    // },
    
    obj_get = {
        CORRECT: jsonData.get.ok,
        ERROR_empty: jsonData.get.error_empty,
        ERROR_missing: jsonData.get.error_missing,
        ERROR_wrong: jsonData.get.error_wrong
    };


describe('CustomerController', function () {
    describe('POST', function () {
        for (var i in Object.keys(obj_post)) {
            var obj = obj_post[Object.keys(obj_post)[i]];
            var name = Object.keys(obj_post)[i];
            it_post(name, obj, i)
        }
    });
    describe('GET', function () {
        for (var i in Object.keys(obj_get)) {
            var obj = obj_get[Object.keys(obj_get)[i]];
            var name = Object.keys(obj_get)[i];
            it_get(name, obj, i)
        }
    });

});