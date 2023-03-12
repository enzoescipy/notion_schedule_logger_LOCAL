@echo off
setlocal

set /p str=set today like XXXX-XX-XX:


node main_undo.js %str%

pause