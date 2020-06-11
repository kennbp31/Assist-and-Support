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
    
    Sleep, 5000
    
    Sleep, 500
    
    Send, {Ctrl Down}{Tab}{Ctrl up}
    
    Sleep, 500
    
    Send, {Tab}
    
    Sleep, 500
    
    Send, {Tab}
    
    Sleep, 500
    
    Send, {Tab}
    
    Sleep, 500
    
    Send, {Enter}
    
    Sleep, 500
    
    Send {Esc}
    
    Sleep, 500
    
    Send, {Esc}
    
    WinMaximize, Skype
    
    ToggleLock(0)
    
    ExitApp
}

#Include <ToggleLock>