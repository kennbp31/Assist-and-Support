#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%

ToggleLock(1)

Sleep, 2000

WinMaximize, Skype

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

ToggleLock(0)

ExitApp

#Include <ToggleLock>