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
        var newModel = new Backbone.Model({param1: "value1"});
        var StickitView = Backbone.View.extend({
            bindings: {
                '#nameSt': 'name'
            },

            initialize: function () {
                
            },
            
            render: function () {
                this.stickit();
                if (true) {
                    this.addBinding(newModel, '#readOnlyNameSt', 'param1');
                }
                return this;
            }
        });
        var stickitView = new StickitView({
            model: model,
            el: '#view2'
        });
        stickitView.render();

    });

})(jQuery, Backbone);
