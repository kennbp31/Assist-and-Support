#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%

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