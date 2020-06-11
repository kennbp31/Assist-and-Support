; Purpose of this script is to always run and modify controls based on which screens are open. 
SendMode Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2 
#SingleInstance, Force
#NoTrayIcon
ToggleLock(1)

WinWaitActive, Skype, , 10
if ErrorLevel
{
    ToggleLock(0)
    return
}

Else
{
    Sleep, 4000
    
    WinMaximize, Skype
    
    Sleep, 1000
    
    Send, {Enter}
    
    Sleep, 1000
    
    Send, {Esc}
    
    ToggleLock(0)
    
    ExitApp
}
#Include <ToggleLock>
