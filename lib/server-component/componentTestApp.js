define([
        './componentTestAppView.js',
        'backbone.marionette'
    ],
    function(ComponentTestAppView, Marionette) {
        'use strict';

        return Marionette.Controller.extend({
            initialize: function(options) {
                if (!options.component) {
                    throw "Component is mandatory";
                } else {
                    this.Component = options.component;
                }

                if (!options.stubs) {
                    throw "Stubs is mandatory";
                } else {
                    this.stubs = options.stubs;
                }
                this.getStubs().then(_.bind(this.createView, this));
            },
            getStubs: function() {
                return $.ajax(this.stubs);
            },
            createView: function(stubs) {
                this.view = new ComponentTestAppView({
                    el: $('.demo-container'),
                    component: this.Component,
                    stubs: stubs
                });
            }
        });
    });
