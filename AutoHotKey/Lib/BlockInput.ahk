#SingleInstance Force

OnExit, removeHooks
return

f1::
    blockUserInput(true, "abc") ; spaces and underscores etc work too. Some characters might not - I haven't tried 
    ; input is now blocked. 
    ; type abc to unblock it
return 

removeHooks:
    blockUserInput(false)
    exitapp 
    
    
    blockUserInput(enable := false, password := "abc123")
    {
        static CallBack := RegisterCallback("hookBlock"), kHook, mHook 
        global aPassword
        if kHook
            UnhookWindowsHookEx(kHook)
        if mHook
            UnhookWindowsHookEx(mHook) 
        if enable
        {
            aPassword := StrSplit(password)
            if aPassword.maxIndex() < 1
                return -1 ; invalid password
            kHook := SetWindowsHookEx(13, CallBack) ; WH_KEYBOARD_LL := 13
            ; Uncomment the below line to block mouse input too
            ; I recommend testing the script first without blocking the mouse, in case something goes wrong.
            ;mHook := SetWindowsHookEx(14, CallBack) ; WH_MOUSE_LL := 14
            releaseAllKeys() 
        }
        return 
    }
    
    releaseAllKeys()
    {
        intMode := A_FormatInteger
        SetFormat, IntegerFast, H
        loop, 256
        {
            if GetKeyState("VK" hexCode := SubStr(A_Index-1, 3))
            s .= "{vk" hexCode " up}"
    }
    if s 
        send %s%
    SetFormat, IntegerFast, %intMode%
return s
}

hookBlock(nCode, wParam, lParam)
{
    Critical 100
    global aPassword
    static WM_KEYUP := 0x101, LLKHF_INJECTED := 0x10, pos := 1
    
    If (nCode >= 0 && !(NumGet(lParam+8) & LLKHF_INJECTED)) ; allow injected / synthetic input to release keys via the send command
    {
        if (wParam = WM_KEYUP) 
        {
            if NumGet(lParam+0) = GetKeyVK(aPassword[pos])
            {
                ; ***************
                ; Remove the below line if you don't want an audio cue when you press a correct key.
                soundplay *-1 
                if pos++ >= aPassword.MaxIndex()
                    blockUserInput(false), pos := 1
            }
            else pos := 1 
            }
        return 1 ; blocks the message
    }
    else CallNextHookEx(nCode, wParam, lParam)
    }

SetWindowsHookEx(idHook, pfn)
{
Return DllCall("SetWindowsHookEx", "int", idHook, "Uint", pfn, "Uint", DllCall("GetModuleHandle", "Uint", 0), "Uint", 0)
}

UnhookWindowsHookEx(hHook)
{
Return DllCall("UnhookWindowsHookEx", "Uint", hHook)
}

CallNextHookEx(nCode, wParam, lParam, hHook = 0)
{
Return DllCall("CallNextHookEx", "Uint", hHook, "int", nCode, "Uint", wParam, "Uint", lParam)
}