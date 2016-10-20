# Dualshock-AR-Controller
A bare bones controller for Parrot AR Drone.

## Setup
1. Connect dualshock controller to computer via bluetooth or usb.
2. Power on Parrot AR drone
3. Join AR drone wifi network
4. Run ``` node controller.js  ```
5. Press (circle) to takeoff and control with right and left joysticks

## Controller definition
|Button    |Action           |
|----------|-----------------|
|circle    |emergency = false|
|square    |fly = false      |
|triangle  |fly = true       |
|R1        |magnitude += 1   |
|L1        |magnitude -= 1   |
|r-joystic |roll, pitch      |
|l-joystic |yaw, throttle    |
