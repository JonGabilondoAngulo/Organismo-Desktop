/**
 * Created by jongabilondo on 20/09/2016.
 */


ORG.UI.connectButton = $('#connect-button')
ORG.UI.deviceNameLabel = $('#device-name-label')
ORG.UI.deviceSystemVersionLabel = $('#device-system-version-label')
ORG.UI.deviceModelLabel = $('#device-model-label')
ORG.UI.testAppNameLabel = $('#testapp-name-label')
ORG.UI.testAppVersionLabel = $('#testapp-version-label')
ORG.UI.testAppBundleIdLabel = $('#testapp-bundleid-label')
//ORG.UI.dropdownDriver = $('#drivers-menu')
ORG.UI.driverName = $('#driver-name')
ORG.UI.devicePort = $('#device-port')
ORG.UI.deviceURL = $('#device-url')

// Driver Menu
$(".dropdown-menu a").click(function () {
        const selectedDriver = $(this).text()
        ORG.UI.driverName.val(selectedDriver)

        switch (selectedDriver) {
            case "WDA": {
                ORG.UI.devicePort.val('8100')
            }
                break
            case "Organismo": {
                ORG.UI.devicePort.val('5567')
            }
                break
        }
    }
)

// Connect Button
ORG.UI.connectButton.click(function () {
    ORGActionsCenter.connect(ORG.UI.deviceURL.val(), ORG.UI.devicePort.val(), ORG.UI.driverName.val())
})
