;*************************************** Functions *************************************
#SingleInstance, Force
#NoTrayIcon
; Locks/Unlocks keystrokes and mouse clicks.
ToggleLock(cmd)
{
    
    SetFormat, IntegerFast, Hex
    Count := 0
    If (cmd)
    {
        ;Suspends the main input process
        DetectHiddenWindows, On
        SetTitleMatchMode, 2 
        PostMessage, 0x111, 65305,,, Main_Input.exe
        Loop 0x1FF ; Blocks keystrokes
            Hotkey, sc%A_Index%, DUMMY, On
        Loop 0x7 ; Blocks mouse clicks
            Hotkey, *vk%A_Index%, DUMMY, On
    }
    Else
    {
        DetectHiddenWindows, On
        SetTitleMatchMode, 2 
        PostMessage, 0x111, 65305,,, Main_Input.exe
        Loop 0x1FF ; Unblocks keystrokes
            Hotkey, sc%A_Index%, DUMMY, Off
        Loop 0x7 ; Unblocks mouse clicks
            Hotkey, *vk%A_Index%, DUMMY, Off
        
        
        
    }
}

DUMMY:
Return

;*************************************** End Functions *************************************