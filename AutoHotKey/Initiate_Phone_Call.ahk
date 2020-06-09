; Purpose of this script is to always run and modify controls based on which screens are open. 
SendMode Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2 
#SingleInstance, Force
#NoTrayIcon

WinWaitActive, Skype,, 5000

ToggleLock(1)

Sleep, 2000

WinMaximize, Skype

Sleep, 1000

Send, {Enter}

Sleep, 1000

Send, {Esc}

ToggleLock(0)

ExitApp

#Include <ToggleLock>