SendMode Input
DetectHiddenWindows, On
SetTitleMatchMode, 2 
SetWorkingDir, %A_ScriptDir% 
#SingleInstance, Force
#NoTrayIcon

; Purpose of this script is to always run and modify controls based on which screens are open. 
; TODO: Learn how to use functions and split this bad boi up.
input1(input){
    ToggleLock(1)
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
        send, {tab} 
        ToggleLock(0)
        Return
    }
    
    ; Basic Input mapping
    IfWinActive, Assist_And_Support
    {
        send, {tab} 
        ToggleLock(0)
        Return
    }
    
    #Include <Duplicate_Actions>
    
    ToggleLock(0)
    ;Need to add behavior to open the app, if it is closed (not exist) 
    return
}
#Include <ToggleLock>