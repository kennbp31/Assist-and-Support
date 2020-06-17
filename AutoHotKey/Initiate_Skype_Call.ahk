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
    t1:=A_TickCount, X:=Y:=""
    ; Desktop v8 - 175%
    Text:="|<>*174$101.zzzzzzzzzzzzzzzUk0Dzzzzzzzzzzzzz1U0T7zzzzyDzzzzzy300sDzzzzsTzzzzzw61tkTzzzzkzzzzzzsA7zUzzzzzVzzzzzzkMDw0C0y200TzUD0DUkDs0M0Q000zy0A0D1U7k0k0s001zs0M0C303sDbUkDsTzUQnkQ601kTy1Uzkzz1zz0sAE3Uz031zVzw7zU1kMw31s063z3zsDy03Ulw63ksA7y7zkTsC71XsA71kMDwDzkTkwC37UMC30kTsDzUQUkQ601k201Uzk7zU100sA07k4031zUDz0201kM0TkA463zUTzUC13Ul"
    
    if (ok:=FindText(961-150000, 778-150000, 961+150000, 778+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    ; Desktop v8 - 150% 
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*172$92.zzzzzzzzzzzzzsMC0SDzzzzDzzzzy62063zzzz3zzzzzVUU1UzzzzkzzzzzsM0SMDzzzwDzzzzy607w0k3U00Ty1k7VU0z0A0M007y080sM83k3C6001z02C6620C3zkUT3zkQzVVUs1Uz08DkzwDy0MMDU8D023wDy3y0663y23UUUz3zUz0VVUDUUsQ8DkzwDksMM1s8C623w7z1k466003000Uz0Tk001VU01k808Dk7y080MM81y3123y1zs72662"
    
    if (ok:=FindText(960-150000, 743-150000, 960+150000, 743+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;Desktop v8 - 125%
    
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*171$76.zzzzzzzzzzzV30QTzzyDzzzy481VzzzkzzzzsE3q7zzz3zzzzV0DU43U03z0kC40y0E600Ds20ME0S7Q833z39lV20sTkUwDsTz24C1Vk27kzVz08Ey2608T3y7s0V3w8MkVwDsT3243UVX27kzkk88E06008T0z000V00w40Vy3z0U248"
    
    if (ok:=FindText(960-150000, 710-150000, 960+150000, 710+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;Desktop v8 - 100%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*170$62.kDzzzzzzz482Dzzlzzzl0AXzzsTzzwE3k8C03w4348Q21U0y10F21Xw8sTXT4Es8s2C7sy14DWA0XVwD4F0sX48sTX14E0802D3s0148720Xkz10F2"
    
    if (ok:=FindText(960-150000, 676-150000, 960+150000, 676+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;App - Windows Store - 100%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*182$60.UTzzzzzzyA0NzzyTzzyA7FzzyTzzyA7UEQ07wA6A3UEA07s82AUlzASTljWAsFkASTnw2AwFVASTnsWAQFWASTldWA0E0AS7k82A0sFAS7wA2AU"
    
    if (ok:=FindText(960-150000, 679-150000, 960+150000, 679+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;App - Windows Store - 125%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*181$71.zzzzzzzzzzkk7DzzznzzzzVUATzzy7zzzz37MzzzwDzzzy6D0Q7WE7y1UQAS0k70UDs20MMT7j61VzVoskkCDyAD3z7zlVUAS0My7yDs130Ms0lwDwTU268lllXsTsz64A1VX37kzkuA8M3106DkTk40EkT32ATkzkA0VW"
    
    if (ok:=FindText(962-150000, 715-150000, 962+150000, 715+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    
    ;App - Windows Store - 150%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*182$71.zzzzzzzzzzzV7zzzzbzzzzz0DzzzwDzzzzy0TzzzsTzzzzw0zzzzkzzzzzs0M3sE0Dz0s3k0k1k00Tw1U3U1b3U00zk3D30Dz71wDz1ry60TUC7sTy7z0A0w0QDkzwDs0M1kMsTVzsTkkk3Xlkz3zkz3VU733Vy7zUu6302073w1zU406040C7w3z0A0A8A4QDw7zUQ8ME"
    
    if (ok:=FindText(963-150000, 749-150000, 963+150000, 749+150000, 0, 0, Text))
    {
        CoordMode, Mouse
        X:=ok.1.x, Y:=ok.1.y, Comment:=ok.1.id
        Click, %X%, %Y%
    }
    
    ;App - Windows Store - 175%
    t1:=A_TickCount, X:=Y:=""
    
    Text:="|<>*182$71.TzzzzwTzzzzyzzzzzUzzzzzxzzzzz1zzzzzvzzzzy3zzzzzkw1y4E0zz0S01k1w0U1zw0s03U1s103zk1k0zD3kTUzz0vbVzw7Vz1zy7zz3w0D3y3zsDz07k0S7w7zkTw0DVkwDsDzUzkwS7VsTkTz1zVsQ63kzkzz0v3U807VzUDy0600M0D3z0Ty0A00s8S7z0zz0Q2E"
    
    if (ok:=FindText(961-150000, 780-150000, 961+150000, 780+150000, 0, 0, Text))
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