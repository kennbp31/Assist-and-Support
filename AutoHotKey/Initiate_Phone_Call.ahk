; Purpose of this script is to always run and modify controls based on which screens are open. 
SendMode Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2 
#SingleInstance, Force
#NoTrayIcon
ToggleLock(1)

; Maps to specific INI file to set what the user wants to use as their input device/method
IniRead, Delay , %A_ScriptDir%\..\config.ini, Skype, Delay
SleepTime := Delay * 1000
WaitTime := Delay * 2

WinWaitActive, Skype, , %WaitTime%
if ErrorLevel
{
    ToggleLock(0)
    return
}

Else
{
    Sleep, %SleepTime%
    
    WinMaximize, Skype
    
    Sleep, 1000
    
    Send, {Enter}
    
    Sleep, 1000
    
    Send, {Esc}
    
    ToggleLock(0)
    
    ExitApp
}
#Include <ToggleLock>
