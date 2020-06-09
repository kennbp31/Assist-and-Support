#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%
#NoTrayIcon

input2(input){
    ToggleLock(1)
    ; Purpose of this script is to always run and modify controls based on which screens are open. 
    ; TODO: Learn how to use functions and split this bad boi up.
    
    IfWinActive, Preferences
    {
        send, {%input%}
        ToggleLock(0)
        Return
    } 
    
    ; safety catch for delete confirmation... may not prove stable
    IfWinActive, ahk_class #32770
    {
        send, {enter} 
        ToggleLock(0)
        Return
    }
    
    
    IfWinActive, Skype
    {
        ; End call shortcut
        ; Turn of user input
        
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
    }
    
    ; Basic input conversion
    IfWinActive, Assist_And_Support
    {
        send, {enter}
    }
    
    
    ; Safety check - If skype AND assist and support are both not active, activate assist and support
    IfWinNotActive, Assist_And_Support
    {
        IfWinExist, Assist_And_Support
        {
            WinActivate, Assist_And_Support
            sleep, 1000
            WinMaximize Assist_And_Support
            sleep, 500
            ; Goto home screen
            send, ^h
            sleep, 500
            ; Renable User Input
        }
        
    }
    ;Need to add behavior to open the app, if it is closed (not exist)
    ToggleLock(0)
    return 
}
#Include <ToggleLock>