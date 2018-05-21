/**
 * Created by jongabilondo on 25/01/2018.
 */


class ORG3DORGUIElement extends ORG3DUIElement {

    get bounds() {
        return this.elementJSON.bounds;
    }

    get hasSize() {
        const bounds = this.bounds;
        return (bounds.right - bounds.left) > 0 && (bounds.bottom - bounds.top) > 0;
    }

}