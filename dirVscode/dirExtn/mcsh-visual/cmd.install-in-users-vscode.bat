@echo off
REM ===========================================================================
REM cmd.install-in-users-vscode.bat
REM Reinstall the Mcsh-Visual extension into THIS user's VS Code.
REM Removes any existing copy, then copies this folder into the extensions dir.
REM Native Windows commands only (rmdir / xcopy) - no Git Bash required.
REM After it finishes, reload VS Code: Ctrl+Shift+P -> Developer: Reload Window.
REM ===========================================================================
setlocal

REM Source = the folder this .bat lives in; Dest = user's VS Code extensions dir.
set "SRC=%~dp0"
set "DST=%USERPROFILE%\.vscode\extensions\synagonism.mcsh-visual-0.1.0"

if exist "%DST%" rmdir /s /q "%DST%"
xcopy "%SRC%*" "%DST%\" /e /i /y /q

REM Drop items not wanted in the installed extension (this .bat + dev .vscode).
del /q "%DST%\cmd.copy-to-Mcsmgr.bat" 2>nul
del /q "%DST%\cmd.install-in-users-vscode.bat" 2>nul
if exist "%DST%\.vscode" rmdir /s /q "%DST%\.vscode"

echo.
echo Installed to %DST%
echo Done. Now reload VS Code (Developer: Reload Window).
pause
