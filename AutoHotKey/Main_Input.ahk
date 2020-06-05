; Purpose of this script is to always run and modify controls based on which screens are open. 
; TODO: Learn how to use functions and split this bad boi up.
#SingleInstance, Force
#IfWinActive, Skype
    ; End call shortcut
    Z::
    X::
        ; Turn of user input
        ToggleLock(1)
        ; End the call
        send, ^e
        sleep, 1000
        ; Open main app
        winActivate Assist_And_Support
        sleep, 1000
        WinMaximize Assist_And_Support
        sleep, 500
        ; Goto home screen
        send, ^h
        sleep, 500
        ; Renable User Input
        ToggleLock(0)
    return
#IfWinActive

; Basic input conversion
Z:: send, {tab}
X:: send, {enter}

#Include <ToggleLock>