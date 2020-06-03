#Include <FindText>

ToggleLock(1)
WinActivate, Skype ahk_class Chrome_WidgetWin_1

Sleep, 2000

Send, {Tab}

Send, {Tab}

Send, {Enter}

Send {Esc}

Sleep, 2000

WinMaximize, Skype

ToggleLock(0)

ExitApp

#Include <ToggleLock>