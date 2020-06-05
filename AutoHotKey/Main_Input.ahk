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

#IfWinActive, Assist_And_Support
    ; Basic input conversion
    ; Looking into using environmental variables to determine which keys function as users input.
    Z:: send, {tab}
    X:: send, {enter}
    return
#IfWinActive

; Safety check - If skype AND assist and support are both not active, activate assist and support
#IfWinNotActive, Assist_And_Support
    Z::
    X::
        #IfWinExist, Assist_And_Support
            ToggleLock(1)
        WinActivate, Assist_And_Support
        sleep, 1000
        WinMaximize Assist_And_Support
        sleep, 500
        ; Goto home screen
        send, ^h
        sleep, 500
        ; Renable User Input
        ToggleLock(0)
        #IfWinExist
            
        
        #IfWinNotExist
            ;Need to add behavior to open the app, if it is closed (not exist)
        
        #Include <ToggleLock>