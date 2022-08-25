@echo off
setlocal

set /p str=set today like XXXX-XX-XX:


node main.js %str%

pause