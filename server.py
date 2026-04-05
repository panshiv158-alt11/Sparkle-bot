#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Sparklebots Website - Python Server
Simple HTTP server for serving the website with video support
"""

import http.server
import socketserver
import os
import sys
import webbrowser
from pathlib import Path

PORT = 8000
HOSTNAME = 'localhost'

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP request handler with MIME type support"""
    
    extensions_map = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.json': 'application/json',
        '.mp4': 'video/mp4',
        '.webm': 'video/webm',
        '.mov': 'video/quicktime',
        '.avi': 'video/x-msvideo',
        '.mkv': 'video/x-matroska',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
    }

    def end_headers(self):
        """Add headers to disable caching"""
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def guess_type(self, path):
        """Guess the MIME type"""
        mimetype = super().guess_type(path)
        ext = os.path.splitext(path)[1].lower()
        
        if ext in self.extensions_map:
            return self.extensions_map[ext], None
        return mimetype

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print('\n' + '='*50)
    print('  SPARKLEBOTS WEBSITE - PYTHON SERVER')
    print('='*50 + '\n')
    
    print(f'📁 Serving files from: {os.getcwd()}')
    print(f'🚀 Server running at: http://{HOSTNAME}:{PORT}')
    print(f'📝 Press Ctrl+C to stop the server\n')
    
    # Check for videos
    video_files = [
        'WhatsApp Video 2026-04-01 at 11.41.18 PM.mp4',
        'WhatsApp Video 2026-04-01 at 11.42.57 PM.mp4',
        'WhatsApp Video 2026-04-01 at 11.43.13 PM.mp4'
    ]
    
    found_videos = []
    for video in video_files:
        if os.path.exists(video):
            found_videos.append(video)
    
    if found_videos:
        print(f'✓ Found {len(found_videos)} video file(s)')
    else:
        print('⚠ No video files found in this directory')
        print('  Run copy_videos.bat to copy them automatically')
    
    print()
    
    # Try to open browser
    try:
        webbrowser.open(f'http://{HOSTNAME}:{PORT}')
        print('📱 Opening website in your default browser...\n')
    except:
        print('📱 Open your browser and visit: http://localhost:8000\n')
    
    # Start server
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print('='*50)
            print('Server is running. Press Ctrl+C to stop.')
            print('='*50 + '\n')
            httpd.serve_forever()
    except KeyboardInterrupt:
        print('\n\n✓ Server stopped.')
    except OSError as e:
        print(f'\n❌ Error: {e}')
        print(f'Port {PORT} might be in use. Try a different port.')
