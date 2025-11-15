*   [web.dev](https://web.dev/)
*   [Resources](https://web.dev/learn)
*   [PWA](https://web.dev/learn/pwa)

# Capabilities Stay organized with collections Save and categorize content based on your preferences.

Progressive Web Apps can do more than just rendering content on the screen or connecting to web services. PWAs can deal with files from the file system, they can interact with the system's clipboard, they can access hardware that is connected to the device, and much more. Every Web API is available for your PWA, and there are some extra APIs available when your app is installed.

You can use [What Web Can Do Today](https://whatwebcando.today/) to know what's possible on each platform. For individual APIs or capabilities, you can use [Can I Use](https://caniuse.com) or the browser compatibility tables on [MDN](https://developer.mozilla.org/).

## Always check for feature support

The first letter in PWA stands for progressive, and it comes from the idea of [progressive enhancement](https://developer.mozilla.org/docs/Glossary/Progressive_Enhancement) and [feature detection](https://developer.mozilla.org/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection). You should not expect your app to work the same way on every device. The diversity of contexts and abilities on billions of devices in different countries makes PWAs an excellent platform, thanks to their progressiveness.

This means that you need to develop your app in layers that may not be available on every device and to check availability before usage.

You need to check with JavaScript if an API exists before using it or ask an API if a service is available on that particular device.

## Powerful web

The web is super powerful today. For example:

*   You can build a [hyperlocal](https://en.wikipedia.org/wiki/Hyperlocal) video chat app with WebRTC, geolocation, and push messages.
*   You can make an app installable.
*   You can add video effects with WebAssembly.
*   You can even bring it into virtual reality with WebGL and WebXR.

While there are many capabilities on the web, there are still gaps, and that's where the [web capabilities project](https://www.chromium.org/teams/web-capabilities-fugu/) comes in. The project describes a group of APIs to increase what the web is capable of. We discussed this project and how you can participate in it in the [Experimental chapter](/learn/pwa/experimental).

## Empowering your PWA

Let's split the PWA capabilities APIs into four groups:

*   Green: APIs available on every browser on every platform, when technically possible. Most of them have been shipped for many years, they are considered mature, and you can use them with confidence. An example API from this group is the geolocation API.
*   Light green: APIs are available only on some browsers. Considering the lack of support on some platforms, they matured within the supported subgroup of browsers so that you can use the capability confidently on them. An example API from this group is WebUSB.
*   Yellow: experimental APIs. These APIs are not yet mature; they are only available on some browsers, and within tests or trials. We talked some about these capabilities in the [Experimental chapter](/learn/pwa/experimental).
*   Red: the group for APIs that you can't use in a PWA, and where plans to add them are still long term. An example API from this group is geofencing.

**Note:** Some capabilities require user permission: in most cases, the permission dialog appears on first usage. Today, you can request a single permission at a time, but in the future, it may be possible to request many permissions in one dialog on some platforms, using the [Permissions API](https://w3c.github.io/permissions/).

### Green capabilities

Below is a list of the most important capabilities you can use in your PWA.

#### Basics

*   _Caching files locally_ using the Cache API, as seen in the [Caching chapter](/learn/pwa/caching).
*   _Executing tasks in threads_ using web workers, as we saw in the [Complexity management chapter](/learn/pwa/complexity).
*   _Managing network requests_ with different strategies in a service worker, as seen in the [Service workers chapter](/learn/pwa/service-worker).
*   _2D Canvas_ for rendering 2D graphics on the screen using the [Canvas API](https://developer.mozilla.org/docs/Web/API/Canvas_API).
*   _2D and 3D high-performance Canvas_, or [WebGL](https://developer.mozilla.org/docs/Web/API/WebGL_API), for rendering 3D graphics.
*   _WebAssembly_, or [WASM](https://developer.mozilla.org/docs/WebAssembly), for executing low-level compiled code for performance.
*   _Real-Time communication_, using the [WebRTC API](https://developer.mozilla.org/docs/Web/API/WebRTC_API).
*   _Web Performance_ APIs to measure and help provide a better experience. See [the Performance API guide](https://developer.mozilla.org/docs/Web/API/Performance_API) for more information.
*   _Store data locally_ with IndexedDB and storage management to query quota and request persistent storage, as seen in the [Offline data chapter](/learn/pwa/offline-data).
*   _Low-level audio_ thanks to the [Web Audio API](https://developer.mozilla.org/docs/Web/API/Web_Audio_API).
*   _Foreground detection_ using the [Page Visibility API](https://developer.mozilla.org/docs/Web/API/Page_Visibility_API).
*   _Network communication_ using the [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API) and the [WebSocket API](https://developer.mozilla.org/docs/Web/API/WebSockets_API).

#### Hardware and sensors

*   _Geolocation_ obtains the user's location through different providers, such as satellite or Wi-Fi through the [Geolocation API](https://developer.mozilla.org/docs/Web/API/Geolocation_API).
*   _Camera and microphone_ receive media streams from cameras and microphones using the [Media devices](https://developer.mozilla.org/docs/Web/API/MediaDevices) interface.
*   _Sensors_ gather real-time information from the accelerometer, gyroscope, magnetometer, and others using the [Sensors API](https://developer.mozilla.org/docs/Web/API/Sensor_APIs) or older interfaces, such as [DeviceMotionEvent](https://developer.mozilla.org/docs/Web/API/DeviceMotionEvent) and [DeviceOrientationEvent](https://developer.mozilla.org/docs/Web/API/DeviceOrientationEvent). On Safari, you need to use a [non-standard permission dialog request](https://medium.com/flawless-app-stories/how-to-request-device-motion-and-orientation-permission-in-ios-13-74fc9d6cd140) to use them.
*   _Touch and pointer_ access information about all the touches and pointer-based clicks you make with your finger, a mouse, a trackpad, or a pen, thanks to [Pointer events](https://developer.mozilla.org/docs/Web/API/Pointer_events) and [Touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).

**Note:** Safari also supports [Gesture events](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW23), a non-standard API for detecting rotation and pinching gestures, which should be used with care.

*   _Gamepads_ to read information coming from standard gamepads and joysticks connected to the device using the [Gamepad API](https://developer.mozilla.org/docs/Web/API/Gamepad_API/Using_the_Gamepad_API).
*   _Biometric authentication_ (such as face or fingerprint recognition) using [Web Authentication or WebAuthn](https://webauthn.guide/).

#### Operating system integration

*   _Speech synthesis and voice recognition_ use the platform's installed voices to speak to the user and to recognize what the user is saying, thanks to the [Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API).
*   _Share content_ from your PWA to other apps and places on the device, thanks to the [Web Share API](https://developer.mozilla.org/docs/Web/API/Web_Share_API), as we'll see in the [OS integration chapter](/learn/pwa/os-integration).
*   _Access the clipboard_ to save and retrieve content from the clipboard in different formats, thanks to the [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API), as I showed in the [OS integration chapter](/learn/pwa/os-integration).
*   _Manage user's credentials and passwords_ using the [Credential Management API](https://developer.mozilla.org/docs/Web/API/Credential_Management_API).
*   _Enable picture-in-picture_ video playing within the OS using the [picture-in-picture API](https://developer.mozilla.org/docs/Web/API/Picture-in-Picture_API).
*   _Render content in fullscreen_ thanks to the [Fullscreen API](https://developer.mozilla.org/docs/Web/API/Fullscreen_API), as I showed in the [Windows chapter](/learn/pwa/windows).

**Note:** You can integrate your PWA with many platform-specific apps using URI schemes and universal URLs, as I showed in the [OS Integration chapter](/learn/pwa/os-integration).

### Light-green capabilities

Here is a list of the most important capabilities you can use in your PWA, with the caveat that they may not be available on every browser.

#### The basics

*   _WebGL 2.0_, the [new version of the WebGL spec](https://developer.mozilla.org/docs/Web/API/WebGL2RenderingContext) to match OpenGL 3.0.
*   _Codecs_, low-level access to the individual frames of a video stream and chunks of audio; useful for web applications that require full control over the way media is processed through [the Web Codecs API](https://developer.mozilla.org/docs/Web/API/WebCodecs_API).

#### Hardware and sensors

*   _Advanced camera controls_ to access [pan, tilt, and zoom controls](/articles/camera-pan-tilt-zoom), in addition to the Media APIs.
*   _Bluetooth LE_ to communicate with Bluetooth low-energy devices near the user using the [Web Bluetooth API](https://developer.mozilla.org/docs/Web/API/Web_Bluetooth_API). Check out [communicating with Bluetooth devices over JavaScript](/bluetooth) for more information.
*   _Near-field communication_ to exchange data over NFC via light-weight NFC data exchange format (NDEF) messages, such as an NFC tag or card using the [WebNFC API](https://developer.mozilla.org/docs/Web/API/Web_NFC_API). You can also read [Interact with NFC devices on Chrome for Android](/articles/nfc) for more details.
*   _Serial peripheral_ for low-level access to devices connected to the device using a serial port, USB, or serial over Bluetooth using the [Web Serial WPI](https://developer.mozilla.org/docs/Web/API/Web_Serial_API). In the following link you can learn how to [read from and write to a serial port](/articles/serial).
    
*   _USB device_ access to communicate with devices connected via USB [WebUSB API](https://developer.mozilla.org/docs/Web/API/WebUSB_API). Check out [access to USB devices on the web](/usb) for more information.
    
*   _Human interface devices_ let your PWA interact with any kind of device prepared for human interaction that is [uncommon](/hid), using the [WebHID API](https://developer.mozilla.org/docs/Web/API/WebHID_API). Check out this guide on [connecting to uncommon HID devices](/articles/hid).
    

**Note:** [Accessing hardware devices on the web](/articles/devices-introduction) offers a comprehensive guide to understanding how different hardware APIs interact with each other.

*   _Ambient Light_ reads the current light level or illuminance of the ambient light around the device, in addition to the [Sensors API](https://developer.mozilla.org/docs/Web/API/AmbientLightSensor).
*   _Vibration_ gives the user haptic feedback when something happens, if the device supports it, through the [Vibration API](https://developer.mozilla.org/docs/Web/API/Vibration_API).
*   _Recording media_ captures the data generated by a MediaStream or HTMLMediaElement object (such as a `<video>` tag) for analysis, processing, or saving to disk, thanks to the [MediaRecorder API](https://developer.mozilla.org/docs/Web/API/MediaRecorder).
*   _Applying a wake Lock to the screen_ prevents the device from dimming, or locking the screen, when your PWA needs to keep running, using the [Screen Wake Lock API](https://developer.mozilla.org/docs/Web/API/Screen_Wake_Lock_API).
*   _Virtual reality_ enables you to use a headset and other devices in your PWA, thanks to the [WebXR Device API](https://developer.mozilla.org/docs/Web/API/WebXR_Device_API).
*   _Augmented reality_ can be achieved in your PWA in many ways, such as using the [WebXR Device API](https://developer.mozilla.org/docs/Web/API/WebXR_Device_API) or the [Safari Quick Look app for AR content](https://webkit.org/blog/8421/viewing-augmented-reality-assets-in-safari-for-ios/).
*   _Detect inactive users_ with the [Idle Detection API](/idle-detection).
*   _Orientation lock_ locks the orientation to portrait or landscape while the PWA is on the screen, thanks to the [Screen Orientation API](https://developer.mozilla.org/docs/Web/API/Screen_Orientation_API), or the `orientation` property of the [Web App Manifest](/learn/pwa/web-app-manifest) for installed apps.
*   _Present content_ on projectors and secondary displays, thanks to the [Presentation API](https://developer.mozilla.org/docs/Web/API/Presentation_API).
*   _Lock a pointer_ to receive delta movement information from pointers (mice, trackpads, and pointers) instead of position values—useful for some games—thanks to the [Pointer Lock API](https://developer.mozilla.org/docs/Web/API/Pointer_Lock_API).

#### Operating system integration

*   _Read and write files_ on the device, thanks to the [File System Access API](https://developer.mozilla.org/docs/Web/API/File_System_Access_API), as you saw in the [OS Integration](/learn/pwa/os-integration) chapter.
*   _Get content from other apps_ thanks to [Web Share Target](/web-share-target), as I showed in the [OS integration](/learn/pwa/os-integration) chapter.
*   _Get contact data_ using the [Contact Picker API](https://developer.mozilla.org/docs/Web/API/Contact_Picker_API), as shown in the [OS integration](/learn/pwa/os-integration) chapter.
*   _Sync in the background_ while the PWA is not used, thanks to the [Background Synchronization API](https://developer.mozilla.org/docs/Web/API/Background_Synchronization_API).
*   _Task scheduling_ while the PWA is not in use, thanks to the [Web Periodic Background Synchronization API](https://developer.mozilla.org/docs/Web/API/Web_Periodic_Background_Synchronization_API).
*   _Send notifications_ using [Web Push](https://developer.mozilla.org/docs/Web/API/Push_API) and [Web Notifications APIs](https://developer.mozilla.org/docs/Web/API/Notifications_API).
*   _Transfer files in the background_ while the user is not using your PWA, thanks to the [Background Fetch API](https://developer.mozilla.org/docs/Web/API/Background_Fetch_API).
*   _Integrate your media playing_ with the operating system using the [Media Session API](https://developer.mozilla.org/docs/Web/API/Media_Session_API).
*   _Manage payments in your PWA_, thanks to the [Payment Request API](https://developer.mozilla.org/docs/Web/API/Payment_Request_API). Apple also offers an [Apple Pay JS library](https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api) on top of the Payment Request API.
*   _Query network status_, such as connection type (4G, WiFi) and a Save Data flag using the [Network Information API](https://developer.mozilla.org/docs/Web/API/Network_Information_API).
*   _Capture the user's screen_ for screencast or screen sharing using the [Screen Capture API](https://developer.mozilla.org/docs/Web/API/Screen_Capture_API/Using_Screen_Capture).
*   _Detect shapes_ using on-device hardware-accelerated detectors, including barcodes (human faces and text OCR are still in development) using the [Shape Detection API](/shape-detection).
*   _Query a device's memory_ using the [Device Memory interface](https://developer.mozilla.org/docs/Web/API/Device_Memory_API).
*   _One-time passwords over SMS_ let you automatically receive a code via SMS sent from your server using the [WebOTP API](https://developer.mozilla.org/docs/Web/API/WebOTP_API). Safari implements a solution subset based on the `<input>` element. Read more about it in [WebKit's blog](https://developer.apple.com/news/?id=z0i801mg).
*   _Manage the virtual keyboard_ that appears on mobile devices screens using the [Virtual Keyboard API](/virtualkeyboard).

**Note:** If you publish a PWA to some app catalogs and stores, you may access additional APIs. For example, if you publish a PWA to Google Play using a [Trusted Web Activity](https://developer.chrome.com/docs/android/trusted-web-activity), you can use the [Digital Goods API](https://github.com/WICG/digital-goods/blob/main/explainer.md) to charge your users for subscriptions and premium content.

If you have a legitimate use case that cannot be realized with the present set of APIs, you can submit a request to analyze the use case for a possible future web API, as we'll see in the [Experimental chapter](/learn/pwa/experimental).

## Resources

*   [Project Fugu API Showcase](https://developer.chrome.com/docs/capabilities/fugu-showcase)
*   [Project Fugu](https://developer.chrome.com/docs/capabilities)
*   [MDN: Web APIs](https://developer.mozilla.org/docs/Web/API)
*   [What Web Can Do Today](https://whatwebcando.today/)
*   [What PWA Can Do Today](https://whatpwacando.today/)
*   [Can I Use](https://caniuse.com/)
*   [iOS/iPadOS Approximate location](https://firt.dev/ios-14/#geolocation-changes)
*   [Meet Face ID and Touch ID for the Web](https://webkit.org/blog/11312/meet-face-id-and-touch-id-for-the-web/)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2022-04-20 UTC.