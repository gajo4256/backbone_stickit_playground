// made global for easier testing purpose...
var model = new Backbone.Model({name: 'Tommy', lastName: 'Gavin'});

(function($, Backbone) {

    Backbone.Stickit.addHandler({
        selector: '.special_js',
        initialize: function ($el, model, options) {
            $el.select2({allowClear: true});
        }
    });

    $(function () {
        // The DOM is ready;

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
        var newCollection = new Backbone.Collection([
            {id: 1, data: {state: 'Croatia', capital: 'Zagreb'}},
            {id: 2, data: {state: 'Serbia', capital: 'Beograd'}},
            {id: 3, data: {state: 'BiH', capital: 'Sarajevo'}}
        ]);

        var StickitView = Backbone.View.extend({
            bindings: {
                '#nameSt': {
                    observe: 'name',
                    visible: 'isVisible'
                },
                '#selectId': {
                    observe: 'multipleValue',
                    selectOptions: {
                        collection: function () {
                            return ['One', 'Two', 'Three', 'Four'];
                        },
                        defaultOption: {
                            label: '-- Select one --',
                            value: null
                        }
                    }
                },
                '#stickitTI': {
                    attributes: [{
                        name: 'class',
                        observe: 'lastName',
                        onGet: 'verify'
                    }]
                },
                '#textInput': {
                    observe: 'lastName'
                }
            },

            events: {
                'click #showNameSt2': function (e) {
                    this.$el.find('label[for=nameSt], input#nameSt').show();
                    $(e.currentTarget).hide();
                }
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
                    onGet: 'formatDate',
                    onSet: function (value) {
                        var values = value.split('.');
                        return this.simpleDateFormat(values, '/');
                    },
                    updateModel: function (val, event, options) {
                        return val.startsWith('02');
                    }
                }
            },

            formatDate: function (value, options) {
                //console.log(options.selector);
                var values = value.split('/');
                return this.simpleDateFormat(values, '.');
            },

            simpleDateFormat: function (values, separator) {
                return values[0] + separator + values[1] + separator + values[2];
            },

            isVisible: function (val, options) {
                //console.log('aa ' + val + ' ' + options);
                if (val.length === 6) {
                    var selector = options.selector.substr(1);
                    options.view.$el.find('label[for=' + selector + ']').hide();
                    this.renderShowBtnFor(options.selector);
                    return false;
                } else {
                    return true;
                }
            },

            renderShowBtnFor: function (selector) {
                var $nameSt = this.$el.find(selector).val();
                var $btnShow = this.$el.find('#showNameSt2');
                if ($nameSt.length !== 6) {
                    $btnShow.hide()
                } else {
                    $btnShow.show();
                }
            },

            verify: function (val) {
                if (val) {
                    return 'has-success';
                } else {
                    return 'has-error';
                }
            }

        });
        var stickitView = new StickitView({
            model: model,
            collection: newCollection,
            el: '#view2'
        });
        stickitView.render();

    });

})(jQuery, Backbone);
