/**
 * Created by jongabilondo on 14/08/2017.
 */

ORG.SplitterResize	= function(paneSep, contentPanel, leftPane, rightPane, scene) {

    const kSplitterWidth = paneSep.offsetWidth;

    // The script below constrains the target to move horizontally between a left and a right virtual boundaries.
    // - the left limit is positioned at 10% of the screen width
    // - the right limit is positioned at 90% of the screen width
    const kLeftLimit = 10;
    const kRightLimit = 90;


    paneSep.sdrag( (el, pageX, startX, pageY, startY, fix) => {

        fix.skipX = true;

        if (pageX < window.innerWidth * kLeftLimit / 100) {
            pageX = window.innerWidth * kLeftLimit / 100;
            fix.pageX = pageX;
        }
        if (pageX > window.innerWidth * kRightLimit / 100) {
            pageX = window.innerWidth * kRightLimit / 100;
            fix.pageX = pageX;
        }

        //const xOffset = pageX-startX;

        //var cur = pageX / window.innerWidth * 100;
        //if (cur < 0) {
        //    cur = 0;
        //}
        //if (cur > window.innerWidth) {
        //    cur = window.innerWidth;
        //}

        const contentRect = contentPanel.getBoundingClientRect();
        const leftPanelWidth = pageX + kSplitterWidth/2.0;
        const rightPanelWidth = contentRect.width - leftPanelWidth - 20;
        const sceneWidth = leftPanelWidth - kSplitterWidth/2.0 - 15 - 11;
        leftPane.style.width = leftPanelWidth + 'px';
        rightPane.style.width = rightPanelWidth + 'px';

        scene.resize({width:sceneWidth, height:scene.sceneSize.height});

    }, null, 'horizontal');

}
