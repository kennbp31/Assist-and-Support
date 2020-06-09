#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%

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
    ToggleLock(0)
    Return
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
        ToggleLock(0)
        Return
        
    }
    
    
}