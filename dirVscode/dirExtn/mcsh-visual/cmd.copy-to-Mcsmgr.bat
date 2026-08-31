@echo off
REM ===========================================================================
REM copy to Mcsmgr
REM ===========================================================================
setlocal

set "DSTMGR=..\..\Mcsmgr\dirVscode\dirExtn\mcsh-visual"

if exist "%DSTMGR%" rmdir /s /q "%DSTMGR%"
xcopy "%SRC%*" "%DSTMGR%\" /e /i /y /q
copy ..\..\Mcsmgr\mMcshVisual.js "%DSTMGR%\"


echo.
echo xcopy to %DSTMGR%
pause
