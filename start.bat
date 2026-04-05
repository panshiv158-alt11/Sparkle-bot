@echo off
title Sparklebots Website - Quick Start

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        SPARKLEBOTS WEBSITE - QUICK START LAUNCHER          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo.
    echo 📥 To use the server with video support, please install Node.js:
    echo    https://nodejs.org/
    echo.
    echo.
    echo Alternatively, you can open index.html directly in your browser.
    echo Press any key to open index.html...
    pause >nul
    start index.html
) else (
    echo ✓ Node.js found
    echo.
    echo 📹 Checking for video files...
    
    if exist "WhatsApp Video 2026-04-01 at 11.41.18 PM.mp4" (
        echo ✓ Videos found
    ) else (
        echo ⚠ Videos not found in this folder
        echo.
        echo 📂 Copying videos from WhatsApp transfers...
        call copy_videos.bat
    )
    
    echo.
    echo 🚀 Starting Sparklebots Website Server...
    echo.
    echo 📱 The website will open in your browser at: http://localhost:3000
    echo.
    echo Press Ctrl+C in this window to stop the server
    echo.
    pause
    
    start http://localhost:3000
    node server.js
)
