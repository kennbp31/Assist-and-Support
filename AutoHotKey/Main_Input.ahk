; Purpose of this script is to always run and modify controls based on which screens are open. 
#SingleInstance, Force
SendMode Input
SetWorkingDir, %A_ScriptDir%
input1 = joy1
input2 = joy2

Hotkey,%input1%,input1, On
Hotkey,%input2%,input2, On

return

; because a variable is needed for various input devices
; I had to use a label rather than a traditional hotkey
; This means there is a separate set of scripts for each mapped input
; This will get complicated of ther user requires more than one input...
input1:
    input1()
return
input2:
    input2() 
return

a::a

#Include <Input1_Functions>
#Include <Input2_Functions> 

