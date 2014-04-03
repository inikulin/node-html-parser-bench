'@fixture Client-Side Functionality';
'@page ./ClientSideAPI.aspx';

'@require :dx';


'@test'['Test client side API'] = {
    '1. Choose panel via "Choose panel" combo box': function () {
        var text = $.trim(getDockPanel("panel4").getHeader().text());
        act.click(getComboBox("cbDockPanels").getItemClickSelector(text));
    },

    '2. Make panel4 invisible': function () {
        act.click(getCheckBoxSelector("cbPanelVisibility").$el);
    },

    '3. Check panel4 invisible state and make panel4 visible': function () {
        notOk(getDockPanel("panel4").$el.is(":visible"));
        act.click(getCheckBoxSelector("cbPanelVisibility").$el);
    },

    '4. Check panel4 visible state and change panel4 docking via "Dock to" combo box': function () {
        ok(getDockPanel("panel4").$el.is(":visible"));
        var zone = getDockPanel("panel4").getOwnerZone();
        this.dockZoneId = zone.$el.attr("id");
        act.click(getComboBox("cbDockZones").getItemClickSelector("None"));
    },

    '5. Check changing panel4 docking and dock panel4 to left zone': function () {
        notOk(getDockZone(this.dockZoneId).containsPanel(getDockPanel("panel4")));
        act.click(getComboBox("cbDockZones").getItemClickSelector("Left zone"));
    },

    '6. Check docking panel4 to left zone and choose other panel via "Choose panel" combo box': function () {
        ok(getDockZone("dockZone1").containsPanel(getDockPanel("panel4")));
        var text = $.trim(getDockPanel("panel3").getHeader().text());
        act.click(getComboBox("cbDockPanels").getItemClickSelector(text));
    },

    '7. Make panel3 invisible': function () {
        act.click(getCheckBoxSelector("cbPanelVisibility").$el);
    },

    '9. Check panel3 invisible state and make panel3 visible': function () {
        notOk(getDockPanel("panel3").$el.is(":visible"));
        act.click(getCheckBoxSelector("cbPanelVisibility").$el);
    },

    '10. Check panel3 visible state and change panel3 docking via "Dock to" combo box': function () {
        ok(getDockPanel("panel3").$el.is(":visible"));
        var zone = getDockPanel("panel3").getOwnerZone();
        this.dockZoneId = zone.$el.attr("id");
        act.click(getComboBox("cbDockZones").getItemClickSelector("None"));
    },

    '11. Check changing panel3 docking': function () {
        notOk(getDockZone(this.dockZoneId).containsPanel(getDockPanel("panel3")));
        act.click(getComboBox("cbDockZones").getItemClickSelector("Left zone"));
    },

    '12. Check docking panel3 to left zone and choose panel4 via "Choose panel" combo box': function () {
        ok(getDockZone("dockZone1").containsPanel(getDockPanel("panel3")));
        var text = $.trim(getDockPanel("panel4").getHeader().text());
        act.click(getComboBox("cbDockPanels").getItemClickSelector(text));
    },

    '13. "Visible index" spin edit click': function () {
        act.click(getSpinEdit("seVisibleIndex").getInputElement());
    },

    '14. Press "Ctrl + A" short cut': function () {
        act.press("ctrl+a");
    },

    '15. Select visible index = 0 for panel4': function () {
        act.type(getSpinEdit("seVisibleIndex").$el, "0");
    },

    '16. Save SpinEdit value': function () {
        act.press("enter");
    },

    '17. Check panel4 visible index': function () {
        var index = getDockZone("dockZone1").getPanelIndexById(getDockPanel("panel4").$el.attr("id"));
        ok(index != -1);
        eq(0, index);
    }
};

//Helpers
var getDockPanel = function (id) {
    return dx.dockPanel(id)
};
var getDockZone = function (id) {
    return dx.dockZone(id);
};
var getComboBox = function (id) {
    return dx.comboBox(id);
};
var getCheckBoxSelector = function () {
    return dx.checkBox("cbPanelVisibility");
};
var getSpinEdit = function () {
    return dx.spinEdit("seVisibleIndex");
};