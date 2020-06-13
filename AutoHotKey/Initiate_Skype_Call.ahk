; Purpose of this script is to always run and modify controls based on which screens are open. 
SendMode Input
SetWorkingDir, %A_ScriptDir%
DetectHiddenWindows, On
SetTitleMatchMode, 2 
#SingleInstance, Force
#NoTrayIcon
#Include <FindText>

; Maps to specific INI file to set what the user wants to use as their input device/method
IniRead, Delay , %A_ScriptDir%\..\config.ini, Skype, Delay
SleepTime := Delay * 1000
WaitTime := Delay * 2

ToggleLock(1)

WinWaitActive, Skype, , %WaitTime%
if ErrorLevel
{
    ToggleLock(0)
    return
}

Else
{
    
    Sleep, %SleepTime%
    
    ; 150% 
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*172$92.zzzzzzzzzzzzzsMC0SDzzzzDzzzzy62063zzzz3zzzzzVUU1UzzzzkzzzzzsM0SMDzzzwDzzzzy607w0k3U00Ty1k7VU0z0A0M007y080sM83k3C6001z02C6620C3zkUT3zkQzVVUs1Uz08DkzwDy0MMDU8D023wDy3y0663y23UUUz3zUz0VVUDUUsQ8DkzwDksMM1s8C623w7z1k466003000Uz0Tk001VU01k808Dk7y080MM81y3123y1zs72662"
    
    if (ok:=FindText(960-150000, 743-150000, 960+150000, 743+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;125%
    
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*171$76.zzzzzzzzzzzV30QTzzyDzzzy481VzzzkzzzzsE3q7zzz3zzzzV0DU43U03z0kC40y0E600Ds20ME0S7Q833z39lV20sTkUwDsTz24C1Vk27kzVz08Ey2608T3y7s0V3w8MkVwDsT3243UVX27kzkk88E06008T0z000V00w40Vy3z0U248"
    
    if (ok:=FindText(960-150000, 710-150000, 960+150000, 710+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;100%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*170$62.kDzzzzzzz482Dzzlzzzl0AXzzsTzzwE3k8C03w4348Q21U0y10F21Xw8sTXT4Es8s2C7sy14DWA0XVwD4F0sX48sTX14E0802D3s0148720Xkz10F2"
    
    if (ok:=FindText(960-150000, 676-150000, 960+150000, 676+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    sleep, 2000
    
    Send {Esc}
    
    Sleep, 500
    
    Send, {Esc}
    
    WinMaximize, Skype
    
    ToggleLock(0)
    
    ExitApp
}

#Include <ToggleLock>