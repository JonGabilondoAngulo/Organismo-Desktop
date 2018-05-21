/**
 * Created by jongabilondo on 14/02/2018.
 */

// Outbound Message types
const ORGMessage = {
    REQUEST : "request",
    UPDATE : "update"
}

// Outbound Request types
const ORGRequest = {
    APP_INFO : "app-info",
    DEVICE_INFO : "device-info",
    SYSTEM_INFO : "system-info",
    SCREENSHOT : "screenshot",
    ELEMENT_TREE : "element-tree",
    CLASS_HIERARCHY : "class-hierarchy",
    ORIENTATION_UPDATES : "device-orientation-feed",
    LOCATION_UPDATES : "core-motion-feed"
}

// Inbound Message types
const ORGInboundMessage = {
    RESPONSE : "response",
    NOTIFICATION : "notification",
    CORE_MOTION_FEED: "core-motion-feed"
}

const ORGActions = {
    PRESS_HOME: "press-jome",
    LOCK_DEVICE: "lock-device",
    UNLOCK_DEVICE: "unlock-device",
    REFRESH_SCREEN: "refresh-screen",
    SET_ORIENTATION: "set-orientation",

    TAP: "tap",
    LONG_PRESS: "long-press",
    SWIPE: "swipe",
    SWIPE_LEFT: "swipe-left",
    SWIPE_RIGHT: "swipe-right",
    SWIPE_UP: "swipe-up",
    SWIPE_DOWN: "swipe-down",

    LOOK_AT: "look-at",
    LOOK_FRONT_AT: "look-front-at",

    RESET_CAMERA_POSITION: "reset-camera-position",
    RESET_DEVICE_POSITION: "reset-device-position",
    SCREEN_CLOSEUP: "device-screen-closeup",
    SHOW_CLASS_HIERARCHY: "show-class-hierarchy",

    LOOK_AT_DEVICE: "look-at-device",
    ROTATE_DEVICE: "rotate-device",
    TRANSLATE_DEVICE: "translate-device"
}