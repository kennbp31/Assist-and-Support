#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir% 

; Purpose of this script is to always run and modify controls based on which screens are open. 
; TODO: Learn how to use functions and split this bad boi up.
input1(){
    ToggleLock(1)
    ; send tab when in assist app
    IfWinActive, Assist_And_Support
    {
        send, {tab}
        
    }
    ; End skype call and return to main app
    IfWinActive, Skype 
    {
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
    ToggleLock(0)
    ;Need to add behavior to open the app, if it is closed (not exist) 
    return
}
#Include <ToggleLock>