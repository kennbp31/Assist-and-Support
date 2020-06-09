
SendMode Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2 
#NoTrayIcon
#SingleInstance, Force

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
    
    IfWinActive, Add/Edit_Contact
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
    
    ; Basic input conversion
    IfWinActive, Assist_And_Support
    {
        send, {enter}
        ToggleLock(0)
        Return
    }
    
    #Include <Duplicate_Actions>
    
    ;Need to add behavior to open the app, if it is closed (not exist)
    ToggleLock(0)
    return 
}
#Include <ToggleLock>