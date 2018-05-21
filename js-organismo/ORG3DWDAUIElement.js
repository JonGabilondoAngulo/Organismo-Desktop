/**
 * Created by jongabilondo on 25/01/2018.
 */


class ORG3DWDAUIElement extends ORG3DUIElement {

    get bounds() {
        return {
            left: this.elementJSON.rect.x,
            top: this.elementJSON.rect.y ,
            bottom: this.elementJSON.rect.y + this.elementJSON.rect.height,
            right: this.elementJSON.rect.x + this.elementJSON.rect.width};
    }

    get hasSize() {
        const bounds = this.bounds;
        return (bounds.right - bounds.left) > 0 && (bounds.bottom - bounds.top) > 0;
    }

}