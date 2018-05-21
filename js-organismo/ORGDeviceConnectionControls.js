/**
 * Created by jongabilondo on 20/09/2016.
 */

ORG.UI.connectButton = $('#connect-button');
//ORG.UI.connectDriversMenu = $('#connect-drivers-menu');
ORG.UI.deviceNameLabel = $('#device-name-label');
ORG.UI.deviceSystemVersionLabel = $('#device-system-version-label');
ORG.UI.deviceModelLabel = $('#device-model-label');
ORG.UI.testAppNameLabel = $('#testapp-name-label');
ORG.UI.testAppVersionLabel = $('#testapp-version-label');
ORG.UI.testAppBundleIdLabel = $('#testapp-bundleid-label');
ORG.UI.dropdownDriver = $('#selected'); // the button that holds the text

$(".dropdown-menu a").click(function () {
        $(this).parents(".btn-group").children(":first").text($(this).text())
        $(this).parents(".btn-group").children(":first").val($(this).data("value"))

        switch ($(this).text()) {
            case "WDA": {
                $('#device-port').val('8100')
            } break
            case "Organismo": {
                $('#device-port').val('5567')
            } break
        }
    }
)

ORG.UI.connectButton.click(function() {
    ORGActionsCenter.connect($('#device-url').val(), $('#device-port').val());
});
