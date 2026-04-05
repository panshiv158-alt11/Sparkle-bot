@echo off
REM Copy videos from WhatsApp transfers to the Application folder

set SOURCE_DIR=C:\Users\HP\AppData\Local\Packages\5319275A.51895FA4EA97F_cv1g1gvanyjgm\LocalState\sessions\876047C0BA1590B765B961E9EC65BC49337372AE\transfers\2026-14
set DEST_DIR=C:\Users\HP\OneDrive\Desktop\Application

if exist "%SOURCE_DIR%" (
    echo Copying videos...
    copy "%SOURCE_DIR%\WhatsApp Video 2026-04-01 at 11.41.18 PM.mp4" "%DEST_DIR%" /Y
    copy "%SOURCE_DIR%\WhatsApp Video 2026-04-01 at 11.42.57 PM.mp4" "%DEST_DIR%" /Y
    copy "%SOURCE_DIR%\WhatsApp Video 2026-04-01 at 11.43.13 PM.mp4" "%DEST_DIR%" /Y
    echo Videos copied successfully!
) else (
    echo Source directory not found: %SOURCE_DIR%
)

pause
