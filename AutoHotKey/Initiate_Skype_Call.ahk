DetectHiddenWindows On ; Allows a script's hidden main window to be detected.
SetTitleMatchMode 2 ; Avoids the need to specify the full path of the file below.
PostMessage, 0x111, 65305,,, Main_Input.ahk - AutoHotKey; Suspend.
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