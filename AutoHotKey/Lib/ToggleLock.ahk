;*************************************** Functions *************************************

; Locks/Unlocks keystrokes and mouse clicks.
ToggleLock(cmd)
{
    SetFormat, IntegerFast, Hex
    Count := 0
    If (cmd)
    {
        Loop 0x1FF ; Blocks keystrokes
            Hotkey, sc%A_Index%, DUMMY, On
        Loop 0x7 ; Blocks mouse clicks
            Hotkey, *vk%A_Index%, DUMMY, On
    }
    Else
    {
        Loop 0x1FF ; Unblocks keystrokes
            Hotkey, sc%A_Index%, DUMMY, Off
        Loop 0x7 ; Unblocks mouse clicks
            Hotkey, *vk%A_Index%, DUMMY, Off
    }
}

DUMMY:
Return

;*************************************** End Functions *************************************