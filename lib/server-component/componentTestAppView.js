define([
        'backbone.marionette'
    ],
    function(Marionette) {
        'use strict';

        return Marionette.LayoutView.extend({
            initialize: function(options) {
                if (!options.component) {
                    throw "Component is mandatory";
                } else {
                    this.Component = options.component;
                }

                if (!options.stubs) {
                    throw "Stubs are mandatory";
                } else {
                    this.addStubs(options.stubs);
                }
            },
            addStubs: function(stubs) {
                _.each(stubs.tests, _.bind(this.addStub, this));
            },
            addStub: function(stub, index) {
                var container = $('<div class="component-sample-' + index + '"></div>').appendTo(this.$el);
                var component = new this.Component(stub);
                this.addRegion('component-sample-' + index, '.component-sample-' + index);
                this['component-sample-' + index].show(component.view);
            }

        });
    });
