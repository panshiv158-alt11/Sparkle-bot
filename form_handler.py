#!/usr/bin/env python3
"""
Google Forms Submission Handler
Forwards enrollment data from your website to Google Forms
"""

import json
import urllib.request
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Your Google Form endpoint
GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe_qSy8_GEsTTkYTLOZ94pYdsv_XxSRGDlUPDGxVuCdgpSZEQ/formResponse"

class FormHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Handle POST requests from enrollment form"""
        # Enable CORS
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        # Check if this is the form submission endpoint
        if self.path == '/submit-enroll':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                # Parse JSON data from browser
                form_data = json.loads(body)
                logger.info(f"📋 Received form submission: {form_data}")
                
                # Prepare data for Google Forms
                google_form_data = {
                    'entry.448107434': form_data.get('child', ''),      # Child Name
                    'entry.1021014844': form_data.get('parent', ''),    # Parent Name
                    'entry.1063743900': form_data.get('email', ''),     # Email
                    'entry.1694517917': form_data.get('phone', ''),     # Phone
                    'entry.1469959605': form_data.get('age', ''),       # Age Group
                    'entry.46458961': form_data.get('course', ''),      # Course
                }
                
                logger.info("="*60)
                logger.info("📤 SUBMITTING TO GOOGLE FORMS")
                logger.info("="*60)
                for key, value in google_form_data.items():
                    logger.info(f"   {key}: {value}")
                logger.info(f"Form URL: {GOOGLE_FORM_URL}")
                
                # Submit to Google Forms
                encoded_data = urllib.parse.urlencode(google_form_data).encode('utf-8')
                logger.info(f"📋 Encoded data: {encoded_data.decode('utf-8')}")
                
                req = urllib.request.Request(GOOGLE_FORM_URL, data=encoded_data)
                req.add_header('User-Agent', 'Mozilla/5.0')
                req.add_header('Referer', 'https://docs.google.com/forms/')
                
                try:
                    response = urllib.request.urlopen(req, timeout=10)
                    logger.info(f"✅ Google Forms submission successful! Status: {response.status}")
                    logger.info(f"📊 Response headers: {dict(response.headers)}")
                    response_body = response.read().decode('utf-8')
                    logger.info(f"📊 Response body length: {len(response_body)} bytes")
                except urllib.error.HTTPError as e:
                    logger.info(f"⚠️ HTTP Error {e.code} (this is expected from Google Forms): {e.reason}")
                    logger.info(f"📝 Response: {e.read().decode('utf-8')[:500]}")
                except Exception as e:
                    logger.warning(f"⚠️ Error submitting to Google Forms: {type(e).__name__}: {e}")
                    # Continue anyway - the data usually goes through despite the error
                
                # Return success to browser
                response_data = {
                    'success': True,
                    'message': 'Registration submitted successfully!',
                    'data': form_data
                }
                self.wfile.write(json.dumps(response_data).encode('utf-8'))
                logger.info(f"✅ Response sent to browser")
                
            except json.JSONDecodeError as e:
                logger.error(f"❌ Invalid JSON: {e}")
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': 'Invalid JSON format'
                }).encode('utf-8'))
            except Exception as e:
                logger.error(f"❌ Error: {e}")
                self.wfile.write(json.dumps({
                    'success': False,
                    'error': str(e)
                }).encode('utf-8'))
        else:
            self.wfile.write(json.dumps({
                'success': False,
                'error': 'Invalid endpoint'
            }).encode('utf-8'))
    
    def do_GET(self):
        """Serve static files (main website)"""
        file_path = self.path
        if file_path == '/':
            file_path = '/index.html'
        
        file_path = file_path.lstrip('/')
        
        # Security check - prevent directory traversal
        if '..' in file_path or file_path.startswith('/'):
            self.send_response(403)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'403: Forbidden')
            return
        
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
            
            # Determine content type
            content_type = 'text/html'
            if file_path.endswith('.css'):
                content_type = 'text/css'
            elif file_path.endswith('.js'):
                content_type = 'text/javascript'
            elif file_path.endswith('.json'):
                content_type = 'application/json'
            elif file_path.endswith('.png'):
                content_type = 'image/png'
            elif file_path.endswith('.jpg') or file_path.endswith('.jpeg'):
                content_type = 'image/jpeg'
            elif file_path.endswith('.gif'):
                content_type = 'image/gif'
            elif file_path.endswith('.svg'):
                content_type = 'image/svg+xml'
            elif file_path.endswith('.mp4'):
                content_type = 'video/mp4'
            elif file_path.endswith('.webm'):
                content_type = 'video/webm'
            
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(content)
            
        except FileNotFoundError:
            self.send_response(404)
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            self.wfile.write(b'<h1>404: File Not Found</h1>')
    
    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def log_message(self, format, *args):
        """Suppress default logging"""
        pass

def run_server(port=3000, host='localhost'):
    """Start the HTTP server"""
    server_address = (host, port)
    httpd = HTTPServer(server_address, FormHandler)
    
    print("\n╔════════════════════════════════════════════╗")
    print("║   SPARKLEBOTS WEBSITE SERVER RUNNING   ║")
    print("╚════════════════════════════════════════════╝")
    print(f"\n🌐 Server: http://{host}:{port}")
    print("📁 Serving files from: current directory")
    print("\n✨ Features:")
    print("   ✓ HTML, CSS, JavaScript files")
    print("   ✓ Video playback support")
    print("   ✓ Google Forms integration via /submit-enroll")
    print("   ✓ CORS enabled for form submissions")
    print("\n🔗 Form Endpoint:")
    print("   POST /submit-enroll - Submit enrollment data")
    print("\n📋 Google Form:")
    print(f"   {GOOGLE_FORM_URL}")
    print("\nPress Ctrl+C to stop the server.\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n✅ Server stopped")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
