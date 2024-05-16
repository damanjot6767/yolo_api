"use strict";

const express = require('express');

const routes = require('../../routes');
const routeUtils = require('../../utils/routeUtils');
const COMMON_FUN = require('../../utils/utils');
const cors = require('cors');
const { initializeMongoConnection } = require('../../utils/utils');

// calling database file
require('../db');

module.exports = async function (app) {
    app.use(cors({
        origin: '*'
    }));
    app.use(require("body-parser").json({ limit: '50mb' }));
    app.use(require("body-parser").urlencoded({ limit: '50mb', extended: true }));


    /** middleware for api's logging with deployment mode */
    let apiLooger = (req, res, next) => {
        COMMON_FUN.messageLogs(null, `api hit ${(new Date).toLocaleTimeString()} => ${req.url} ${req.method} ${process.env.NODE_ENV}`);
        next();
    };

    /** Used logger middleware for each api call **/
    app.use(apiLooger);

    // timeout
    app.use(function(req, res, next){
        req.setTimeout(500000, function(){
            // call back function is called when request timed out.
            console.log("Request timed out")
        });
        next();
    });


    /********************************
    ***** For handling CORS Error ***
    *********************************/
    app.all('/*', (request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        response.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, OPTIONS');
        response.header('Access-Control-Max-Age', 1800);
        next();
    });

    // serve static folder.
    app.use('/public', express.static('public'));
    app.use('/uploads', express.static('uploads'));
    app.use('/reports', express.static('reports'));
    app.get('/',(req, res)=>{
        res.redirect("/documentation");
    })

    // initalize routes.
    await routeUtils.route(app, routes);
};
