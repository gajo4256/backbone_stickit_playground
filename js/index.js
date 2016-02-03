// made global for easier testing purpose...
var model = new Backbone.Model({name: 'Tommy', lastName: 'Gavin'});

(function($, Backbone) {

    $(function () {
        // The DOM is ready;
        var h1 = $('#h1');
        h1.text('From jquery');
        h1.append(' ' + model.get('name'));


        var SimpleView = Backbone.View.extend({
            events: {
                'blur  #name': 'nameChanged'
            },

            initialize: function () {
                this.listenTo(this.model, 'change:name change:lastName', this.render);
            },

            render: function () {
                this.$el.find('#readOnlyName').val(model.get('name'));
                this.$el.find('#readOnlyLastName').val(model.get('lastName'));
                return this;
            },

            nameChanged: function (e) {
                console.log(e.currentTarget.value);
                //console.log(this.$el.find('#name').val());
            }
        });

        var simpleView = new SimpleView({
            model: model,
            el: '#view1'
        });
        simpleView.render();
        
        
        //******** STICKIT ************//
        var newModel = new Backbone.Model({param1: "02/02/2016"});
        var StickitView = Backbone.View.extend({
            bindings: {
                '#nameSt': 'name'
            },

            initialize: function () {
                
            },

            render: function () {
                this.stickit();
                if (true) {
                    this.addBinding(newModel, '#nameSt2', this.customBindings());
                    this.addBinding(newModel, '#readOnlyLastNameSt', 'param1');
                }
                return this;
            },

            customBindings: function () {
                return {
                    observe: 'param1',
                    onGet: function (value) {
                        var values = value.split('/');
                        return this.simpleDateFormat(values, '.');
                    },
                    onSet: function (value) {
                        var values = value.split('.');
                        return this.simpleDateFormat(values, '/');
                    }
                }
            },

            simpleDateFormat: function (values, separator) {
                return values[0] + separator + values[1] + separator + values[2];
            }
        });
        var stickitView = new StickitView({
            model: model,
            el: '#view2'
        });
        stickitView.render();

    });

})(jQuery, Backbone);
