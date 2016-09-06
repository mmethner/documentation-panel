"use strict";

System.register(["lodash", "app/plugins/sdk", "./bootstrap-popover.js", "./css/bootstrap-popover.css!", "./css/documentation.css!"], function (_export, _context) {
    "use strict";

    var _, PanelCtrl, _createClass, panelDefaults, DocumentationCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_lodash) {
            _ = _lodash.default;
        }, function (_appPluginsSdk) {
            PanelCtrl = _appPluginsSdk.PanelCtrl;
        }, function (_bootstrapPopoverJs) {}, function (_cssBootstrapPopoverCss) {}, function (_cssDocumentationCss) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            panelDefaults = {
                mode: "text", // 'html', 'text'
                content: "# title"
            };

            _export("PanelCtrl", _export("DocumentationCtrl", DocumentationCtrl = function (_PanelCtrl) {
                _inherits(DocumentationCtrl, _PanelCtrl);

                function DocumentationCtrl($scope, $injector, templateSrv, $sce) {
                    _classCallCheck(this, DocumentationCtrl);

                    var _this = _possibleConstructorReturn(this, (DocumentationCtrl.__proto__ || Object.getPrototypeOf(DocumentationCtrl)).call(this, $scope, $injector));

                    _this.$sce = $sce;
                    _this.templateSrv = templateSrv;

                    _.defaults(_this.panel, panelDefaults);

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('refresh', _this.onRender.bind(_this));
                    _this.events.on('render', _this.onRender.bind(_this));
                    return _this;
                }

                _createClass(DocumentationCtrl, [{
                    key: "onInitEditMode",
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/documentation-panel/editor.html');
                        this.editorTabIndex = 1;
                    }
                }, {
                    key: "onRender",
                    value: function onRender() {
                        if (this.panel.mode === 'html') {
                            this.updateContent(this.panel.content);
                        } else if (this.panel.mode === 'text') {
                            this.renderText(this.panel.content);
                        }
                        this.renderingCompleted();
                    }
                }, {
                    key: "renderText",
                    value: function renderText(content) {
                        content = content.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/\n/g, '<br/>');
                        this.updateContent(content);
                    }
                }, {
                    key: "updateContent",
                    value: function updateContent(html) {
                        try {
                            this.content = this.$sce.trustAsHtml(this.templateSrv.replace(html, this.panel.scopedVars));
                        } catch (e) {
                            console.log('Text panel error: ', e);
                            this.content = this.$sce.trustAsHtml(html);
                        }
                    }
                }]);

                return DocumentationCtrl;
            }(PanelCtrl)));

            _export("DocumentationCtrl", DocumentationCtrl);

            DocumentationCtrl.templateUrl = 'module.html';

            _export("PanelCtrl", DocumentationCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
