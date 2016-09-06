import _ from "lodash";
import {PanelCtrl} from "app/plugins/sdk";
import './bootstrap-popover.js';
import './css/bootstrap-popover.css!';
import './css/documentation.css!';

const panelDefaults = {
    mode: "text", // 'html', 'text'
    content: "# title"
};

export class DocumentationCtrl extends PanelCtrl {

    constructor($scope, $injector, templateSrv, $sce) {
        super($scope, $injector);

        this.$sce = $sce;
        this.templateSrv = templateSrv;

        _.defaults(this.panel, panelDefaults);

        this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
        this.events.on('refresh', this.onRender.bind(this));
        this.events.on('render', this.onRender.bind(this));
    }

    onInitEditMode() {
        this.addEditorTab('Options', 'public/plugins/documentation-panel/editor.html');
        this.editorTabIndex = 1;
    }

    onRender() {
        if (this.panel.mode === 'html') {
            this.updateContent(this.panel.content);
        } else if (this.panel.mode === 'text') {
            this.renderText(this.panel.content);
        }
        this.renderingCompleted();
    }

    renderText(content) {
        content = content
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/\n/g, '<br/>');
        this.updateContent(content);
    }

    updateContent(html) {
        try {
            this.content =
                this.$sce.trustAsHtml(this.templateSrv.replace(html, this.panel.scopedVars));
        } catch (e) {
            console.log('Text panel error: ', e);
            this.content = this.$sce.trustAsHtml(html);
        }
    }
}

DocumentationCtrl.templateUrl = 'module.html';

export {DocumentationCtrl as PanelCtrl}
